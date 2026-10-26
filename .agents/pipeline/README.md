# Pipeline Claude ↔ Antigravity

Đây là bản tự động hóa cho luồng 3 bên trong `AGENTS.md`:
- **Claude** (reviewer) viết đặc tả và review.
- **Antigravity** (agent) sửa code.
- **Tech lead** chỉ duyệt ở 2 cổng (`assign` và `merge`).

## Trạng thái

```
PLANNED ─(tech lead: assign)→ ASSIGNED ─(dispatch)→ IN_PROGRESS ─(có report DONE → verify)→ REVIEW
                                                       │                                      │
                                                       ├─(verify lỗi build/outOfScope/dirty)──┼→ REWORK
                                                       │                                      │
REVIEW ─(Claude: APPROVED)→ APPROVED ─(tech lead: merge)→ MERGED                              │
       └─(Claude: REWORK)─────────────────────────────────────────────────────────────────────┘
                               (quá max_attempts / agent báo BLOCKED / lỗi gửi → BLOCKED)
```

## Bảng việc `.agents/tasks/<ID>/`

Thư mục này chỉ nằm ở repo chính và không commit.

| File | Ai ghi | Nội dung |
|---|---|---|
| `task.json` | pipeline | Trạng thái, nhánh, phạm vi file, số lượt, `verified_commit`, `blocked_reason`, `review_failed_at`, lịch sử |
| `spec.md` | Claude | Việc cần làm + tiêu chí nghiệm thu |
| `prompt-N.md` | pipeline | Prompt hoàn chỉnh gửi Antigravity ở lượt N |
| `report-N.md` | Antigravity | Báo cáo 7 mục, dòng cuối là `STATUS: DONE` hoặc `STATUS: BLOCKED - <lý do>` |
| `verify-N.md` | pipeline | Bằng chứng tự kiểm: log commit, `git status`, file ngoài phạm vi (`--no-renames`), build, diff |
| `review.md` | pipeline / Claude | Nhận xét (từ `verify()` tự động hoặc từ Claude). Nếu REWORK thì được gửi kèm ở lượt sau |

## Lệnh

```bash
npm run agents -- status                        # xem bảng việc (chỉ đọc)
npm run agents -- assign T-A                    # tech lead duyệt đặc tả (chỉ khi đang PLANNED)
npm run agents -- tick                          # chạy 1 vòng: dispatch → verify → review
npm run agents -- watch                         # lặp mỗi 60s (đổi bằng WATCH_MS)
npm run agents -- verdict T-A approved|rework   # ghi kết luận review (chỉ nhận đúng approved|rework)
npm run agents -- retry-review T-A              # xoá review_failed_at để cho phép chạy lại review tự động
npm run agents -- reopen T-E                    # mở lại việc BLOCKED (chỉ khi blocked_reason là agent, no_worktree, dispatch_failed)
npm run agents -- extend T-E [số_lượt_thêm]     # tăng max_attempts cho việc BLOCKED và chuyển sang REWORK để sinh prompt mới kèm review.md
npm run agents -- merge T-A                     # tech lead: kiểm verified_commit, merge --no-ff --no-commit vào stage, build, commit, dọn worktree
npm run test:agents                             # chạy bộ unit test (node:test) trên repo tạm
```

## Lý do dừng (`blocked_reason`) & cách mở lại

Khi một task chuyển sang `BLOCKED`, pipeline lưu trường `blocked_reason` trong `task.json`:
- `agent`: Agent chủ động dừng và báo `STATUS: BLOCKED - <lý do>` ở dòng cuối báo cáo. Mở lại bằng `reopen <id>`.
- `no_worktree`: Đã có file báo cáo nhưng không tìm thấy thư mục worktree. Mở lại bằng `reopen <id>`.
- `dispatch_failed`: Lệnh gửi việc sang Antigravity thất bại (mã thoát khác 0 hoặc JSON trả về có trường `error`). Mở lại bằng `reopen <id>`.
- `max_attempts`: Đã dùng hết số lượt `max_attempts`. Lệnh `reopen` sẽ từ chối và hướng dẫn tech lead dùng `extend <id>` để tăng `max_attempts` và chuyển trạng thái về `REWORK` (nhờ đó lần `dispatch` kế tiếp sẽ tạo `prompt-N.md` mới có đính kèm `review.md`).

## Cơ chế khoá (`.lock`) và ghi nguyên tử (Atomic Save)

- **Khoá tiến trình (`.agents/tasks/.lock`):** Mọi lệnh có thay đổi trạng thái (`tick`, `assign`, `dispatch`, `verify`, `verdict`, `retry-review`, `reopen`, `extend`, `merge`) đều tạo file khoá `.agents/tasks/.lock` bằng cờ độc quyền `fs.openSync(..., 'wx')`, ghi `pid` và thời điểm tạo, rồi xoá khoá trong khối `finally`. Nếu phát hiện khoá cũ quá **30 phút**, pipeline coi đó là khoá chết, in cảnh báo và tự gỡ để tiếp tục. Lệnh `status` chỉ đọc nên không tạo khoá.
- **Ghi nguyên tử (`save`):** Khi cập nhật `task.json`, pipeline luôn ghi vào `task.json.tmp` trước rồi đổi tên bằng `fs.renameSync` sang `task.json` để tránh hỏng file nếu tiến trình bị ngắt giữa chừng.

## Quy tắc an toàn Junction `node_modules` & chống chèn lệnh

- **Gỡ junction trước khi xoá worktree (`removeWorktree`):** Trên Windows, `git worktree remove` có thể đi xuyên qua directory junction `node_modules` và xoá sạch `node_modules` của repo chính. Hàm `removeWorktree(wt)` luôn kiểm tra `<wt>/node_modules` bằng `fs.lstatSync`:
  - Nếu là symlink/junction (`isSymbolicLink()`): gỡ liên kết bằng `fs.unlinkSync` (hoặc fallback `cmd /c rmdir` không có `/s`) **trước** khi gọi `git worktree remove`.
  - Nếu là thư mục thật (`isDirectory()`): từ chối xoá và ném lỗi rõ ràng để bảo vệ dữ liệu.
- **Chống chèn lệnh (Command Injection):** Mọi lệnh `git` đều gọi qua `execFileSync('git', [...args])` không qua shell; `validateTask()` kiểm tra chặt `id`, `branch` và `files` ngay trong `load()`.

## Kênh gửi việc sang Antigravity

Pipeline thử lần lượt theo thứ tự:
1. `EXECUTOR_CMD`: lệnh tự cấu hình. Có thể dùng `{prompt}` hoặc `{promptFile}` trong lệnh.
2. `agy` (Antigravity CLI headless), nếu đã cài.
3. `agentapi new-conversation`: chỉ chạy được trong **terminal tích hợp của Antigravity**, vì ở đó có biến `ANTIGRAVITY_LS_ADDRESS`.
4. Thủ công: in ra một câu để dán vào khung Agent của Antigravity.

Review tự động cần lệnh `claude` (Claude Code CLI) có trong PATH (`--allowedTools Read,Grep,Glob`, timeout mặc định `600000` ms hoặc `REVIEW_TIMEOUT_MS`). Nếu không có verdict hợp lệ ở dòng cuối, pipeline gán `review_failed_at` và dừng gọi lặp lại cho tới khi chạy `retry-review <id>`.
