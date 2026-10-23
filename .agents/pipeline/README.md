# Pipeline Claude ↔ Antigravity

Đây là bản tự động hóa cho luồng 3 bên trong `AGENTS.md`:
- **Claude** (reviewer) viết đặc tả và review.
- **Antigravity** (agent) sửa code.
- **Tech lead** chỉ duyệt ở 2 cổng.

## Trạng thái

```
PLANNED ─(tech lead: assign)→ ASSIGNED ─(dispatch)→ IN_PROGRESS ─(có report → tự build)→ REVIEW
REVIEW ─(Claude)→ APPROVED ─(tech lead: merge)→ MERGED
       └→ REWORK ─(dispatch kèm review.md)→ IN_PROGRESS …   quá max_attempts → BLOCKED
```

## Bảng việc `.agents/tasks/<ID>/`

Thư mục này chỉ nằm ở repo chính và không commit.

| File | Ai ghi | Nội dung |
|---|---|---|
| `task.json` | pipeline | Trạng thái, nhánh, phạm vi file, số lượt, lịch sử |
| `spec.md` | Claude | Việc cần làm + tiêu chí nghiệm thu |
| `prompt-N.md` | pipeline | Prompt hoàn chỉnh gửi Antigravity ở lượt N |
| `report-N.md` | Antigravity | Báo cáo 7 mục, dòng cuối là `STATUS: DONE` |
| `verify-N.md` | pipeline | Bằng chứng tự kiểm: log commit, file ngoài phạm vi, build, diff |
| `review.md` | Claude | Nhận xét. Nếu REWORK thì được gửi kèm ở lượt sau |

## Lệnh

```bash
npm run agents -- status            # xem bảng việc
npm run agents -- assign T-A        # tech lead duyệt đặc tả, cho phép giao việc
npm run agents -- tick              # chạy 1 vòng: giao việc → tự build → review
npm run agents -- watch             # lặp mỗi 60s (đổi bằng WATCH_MS)
npm run agents -- verdict T-A approved|rework   # Claude ghi kết luận (khi không có claude CLI)
npm run agents -- merge T-A         # tech lead: merge --no-ff vào stage, build, dọn worktree (không push)
```

## Kênh gửi việc sang Antigravity

Pipeline thử lần lượt theo thứ tự:
1. `EXECUTOR_CMD`: lệnh tự cấu hình. Có thể dùng `{prompt}` hoặc `{promptFile}` trong lệnh.
2. `agy` (Antigravity CLI headless), nếu đã cài.
3. `agentapi new-conversation`: chỉ chạy được trong **terminal tích hợp của Antigravity**, vì ở đó có biến `ANTIGRAVITY_LS_ADDRESS`.
4. Thủ công: in ra một câu để dán vào khung Agent của Antigravity.

Review tự động cần lệnh `claude` (Claude Code CLI) có trong PATH. Nếu không có, phiên Claude Code sẽ đọc `verify-N.md` và gọi `verdict`.
