#!/usr/bin/env node
// Bộ điều phối Claude (reviewer) ↔ Antigravity (agent) cho cv_quang.
// Luồng: PLANNED → ASSIGNED → IN_PROGRESS → VERIFY → REVIEW → APPROVED → MERGED
//                       ↑                                  └→ REWORK ─┘ (quá max_attempts → BLOCKED)
// Chạy: node .agents/pipeline/pipeline.mjs <lệnh> [id]
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const getRepo = () => (process.env.REPO ? path.resolve(process.env.REPO) : DEFAULT_REPO);
export const getBoard = () => (process.env.BOARD ? path.resolve(process.env.BOARD) : path.join(getRepo(), '.agents', 'tasks'));
const BASE_BRANCH = 'stage';
const BUILD_CMD = 'npm run build';

export const git = (args, cwd = getRepo()) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const taskDir = (id) => path.join(getBoard(), id);
const now = () => new Date().toISOString();

export function removeWorktree(wt, repo = getRepo()) {
  const nm = path.join(wt, 'node_modules');
  let stat = null;
  try {
    stat = fs.lstatSync(nm);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  if (stat) {
    if (stat.isSymbolicLink()) {
      try {
        fs.unlinkSync(nm);
      } catch {
        const r = spawnSync('cmd', ['/c', 'rmdir', nm], { encoding: 'utf8' });
        if (r.status !== 0 && fs.existsSync(nm)) {
          throw new Error(`Không gỡ được junction node_modules tại ${nm}: ${r.stderr || r.stdout}`);
        }
      }
    } else if (stat.isDirectory()) {
      throw new Error(`Từ chối xoá worktree ${wt}: node_modules là thư mục thật, không tự xoá`);
    }
  }
  git(['worktree', 'remove', wt], repo);
}

export function validateTask(task, dirName, { allowMissingBranch = false } = {}) {
  if (!task || typeof task !== 'object') throw new Error('Task không hợp lệ');
  if (typeof task.id !== 'string' || !/^[A-Z]+-[A-Z0-9]+$/.test(task.id)) {
    throw new Error(`Task id không hợp lệ: "${task.id}"`);
  }
  if (dirName !== undefined && task.id !== dirName) {
    throw new Error(`Task id "${task.id}" không trùng tên thư mục "${dirName}"`);
  }
  if (!(allowMissingBranch && (task.branch === undefined || task.branch === null || task.branch === ''))) {
    if (typeof task.branch !== 'string' || !/^(feat|fix|hotfix|chore)\/[a-z0-9.-]+$/.test(task.branch)) {
      throw new Error(`Nhánh không hợp lệ: "${task.branch}"`);
    }
  }
  if (
    !Array.isArray(task.files) ||
    !task.files.every(
      (f) =>
        typeof f === 'string' &&
        f.length > 0 &&
        !f.includes('..') &&
        !/^[\\/]/.test(f) &&
        !/^[a-zA-Z]:/.test(f)
    )
  ) {
    throw new Error(`Danh sách files không hợp lệ ở task ${task.id}`);
  }
  return task;
}

export function load(id, opts = {}) {
  if (typeof id !== 'string' || !/^[A-Z]+-[A-Z0-9]+$/.test(id)) {
    throw new Error(`Task id không hợp lệ: "${id}"`);
  }
  const file = path.join(taskDir(id), 'task.json');
  if (!fs.existsSync(file)) throw new Error(`Không có task ${id}`);
  const task = JSON.parse(fs.readFileSync(file, 'utf8'));
  return validateTask(task, id, opts);
}

function save(task, note) {
  task.updated_at = now();
  if (note) (task.history ??= []).push({ at: task.updated_at, status: task.status, note });
  fs.writeFileSync(path.join(taskDir(task.id), 'task.json'), JSON.stringify(task, null, 2) + '\n');
}

function listTasks() {
  const board = getBoard();
  if (!fs.existsSync(board)) return [];
  return fs.readdirSync(board).filter((d) => fs.existsSync(path.join(board, d, 'task.json'))).sort().map((d) => load(d));
}

const worktreeOf = (task) => `${getRepo()}_worktree_${task.id.toLowerCase()}`;

function ensureWorktree(task) {
  const repo = getRepo();
  const wt = worktreeOf(task);
  if (!fs.existsSync(wt)) {
    const branchExists = spawnSync('git', ['rev-parse', '--verify', '--quiet', task.branch], { cwd: repo }).status === 0;
    git(branchExists ? ['worktree', 'add', wt, task.branch] : ['worktree', 'add', '-b', task.branch, wt, BASE_BRANCH], repo);
  }
  return wt;
}

// Prompt cho agent: đọc từ file để không phải truyền văn bản nhiều dòng qua dòng lệnh Windows.
function writeAgentPrompt(task, wt) {
  const dir = taskDir(task.id);
  const reviewFile = path.join(dir, 'review.md');
  const rework = task.attempts > 1 && fs.existsSync(reviewFile);
  const prompt = `# Việc ${task.id}: ${task.title} (lượt ${task.attempts})

Bạn là **Agent** trong luồng 3 bên của dự án cv_quang. Bắt buộc đọc và tuân thủ \`${path.join(wt, 'AGENTS.md')}\`.

- Làm việc DUY NHẤT trong worktree: \`${wt}\` (nhánh \`${task.branch}\`, tạo từ \`${BASE_BRANCH}\`). Không đụng repo chính \`${getRepo()}\`.
- Chỉ sửa các file trong phạm vi: ${task.files.map((f) => `\`${f}\``).join(', ')}.
- Commit nhỏ theo từng mục, đúng chuẩn commit trong AGENTS.md mục 9. KHÔNG merge, push, deploy.

## Đặc tả từ reviewer
${fs.readFileSync(path.join(dir, 'spec.md'), 'utf8')}
${rework ? `\n## Phản hồi review lượt trước (phải xử lý hết)\n${fs.readFileSync(reviewFile, 'utf8')}\n` : ''}
## Kết thúc
1. Chạy \`${BUILD_CMD}\` trong worktree, ghi lệnh + mã thoát.
2. Ghi báo cáo đủ 7 mục theo AGENTS.md mục 7 vào file: \`${path.join(dir, `report-${task.attempts}.md`)}\`
3. Dòng cuối cùng của báo cáo phải là: \`STATUS: DONE\` (hoặc \`STATUS: BLOCKED - <lý do>\` nếu gặp lựa chọn nghiệp vụ). Sau đó DỪNG.
`;
  const file = path.join(dir, `prompt-${task.attempts}.md`);
  fs.writeFileSync(file, prompt);
  return file;
}

// Gửi việc sang Antigravity. Ưu tiên: lệnh tự cấu hình → agy CLI → agentapi (chạy trong terminal Antigravity) → thủ công.
function sendToAntigravity(task, promptFile) {
  const short = `Đọc và làm đúng toàn bộ yêu cầu trong file ${promptFile}`;
  const has = (bin) => spawnSync(process.platform === 'win32' ? 'where' : 'which', [bin]).status === 0;
  let cmd;
  if (process.env.EXECUTOR_CMD) cmd = process.env.EXECUTOR_CMD.replace('{prompt}', short).replace('{promptFile}', promptFile);
  else if (has('agy')) cmd = `agy -p "${short}"`;
  else if (process.env.ANTIGRAVITY_LS_ADDRESS && has('agentapi')) cmd = `agentapi new-conversation --model=pro --title="${task.id}" "${short}"`;

  if (!cmd) {
    console.log(`\n[THỦ CÔNG] Chưa có kênh tự động tới Antigravity. Dán câu sau vào Antigravity Agent:\n  ${short}\n`);
    return 'manual';
  }
  console.log(`[GỬI] ${cmd}`);
  const out = spawnSync(cmd, { shell: true, cwd: worktreeOf(task), encoding: 'utf8' });
  fs.appendFileSync(path.join(taskDir(task.id), 'executor.log'), `\n### ${now()} ${cmd}\n${out.stdout}${out.stderr}`);
  if (out.status !== 0 || /"error"/.test(out.stdout)) throw new Error(`Gửi việc thất bại: ${(out.stdout + out.stderr).slice(0, 300)}`);
  return 'sent';
}

function dispatch(task) {
  if (!['ASSIGNED', 'REWORK'].includes(task.status)) return;
  if (task.attempts >= task.max_attempts) {
    task.status = 'BLOCKED';
    return save(task, `Quá ${task.max_attempts} lượt, cần tech lead xử lý`);
  }
  task.attempts += 1;
  const wt = ensureWorktree(task);
  const promptFile = writeAgentPrompt(task, wt);
  const mode = sendToAntigravity(task, promptFile);
  task.status = 'IN_PROGRESS';
  save(task, `Giao Antigravity lượt ${task.attempts} (${mode})`);
}

// Không tin báo cáo của agent: tự build lại trong worktree và gom bằng chứng cho reviewer.
export function verify(task) {
  const dir = taskDir(task.id);
  const report = path.join(dir, `report-${task.attempts}.md`);
  if (task.status !== 'IN_PROGRESS' || !fs.existsSync(report)) return;
  const lines = fs
    .readFileSync(report, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const agentStatus = lines[lines.length - 1] ?? '';
  if (/^STATUS:\s*BLOCKED/.test(agentStatus)) {
    task.status = 'BLOCKED';
    return save(task, `Agent dừng: ${agentStatus.replace(/^STATUS:\s*BLOCKED\s*-?\s*/, '')}`);
  }
  if (!/^STATUS:\s*DONE$/.test(agentStatus)) return;
  const wt = worktreeOf(task);
  if (!fs.existsSync(wt)) {
    task.status = 'BLOCKED';
    return save(task, `Có báo cáo nhưng không thấy worktree ${wt}`);
  }
  const repoNm = path.join(getRepo(), 'node_modules');
  const wtNm = path.join(wt, 'node_modules');
  if (!fs.existsSync(wtNm)) {
    if (fs.existsSync(repoNm)) {
      try {
        fs.symlinkSync(repoNm, wtNm, 'junction');
      } catch {
        spawnSync('cmd', ['/c', 'mklink', '/J', wtNm, repoNm], { encoding: 'utf8' });
      }
    } else {
      spawnSync('npm ci --no-audit --no-fund', { shell: true, cwd: wt, encoding: 'utf8' });
    }
  }
  const buildCm = process.env.BUILD_CMD ?? BUILD_CMD;
  const build = spawnSync(buildCm, { shell: true, cwd: wt, encoding: 'utf8' });
  const statusShort = git(['status', '--short'], wt);
  const outside = outOfScope(task, wt);
  const fullDiff = git(['diff', `${BASE_BRANCH}...HEAD`], wt);
  const MAX_DIFF = 60000;
  const diffOut =
    fullDiff.length > MAX_DIFF
      ? `${fullDiff.slice(0, MAX_DIFF)}\n(diff đã cắt, xem toàn văn bằng git diff)`
      : fullDiff;
  task.verified_commit = git(['rev-parse', 'HEAD'], wt);
  const evidence = [
    `# Bằng chứng tự kiểm ${task.id} lượt ${task.attempts} (${now()})`,
    `## git log ${BASE_BRANCH}..HEAD\n\`\`\`\n${git(['log', `${BASE_BRANCH}..HEAD`, '--oneline'], wt)}\n\`\`\``,
    `## git status (phải sạch)\n\`\`\`\n${statusShort || '(sạch)'}\n\`\`\``,
    `## Ngoài phạm vi\n${outside.map((f) => `- ${f}`).join('\n') || '(không có)'}`,
    `## ${buildCm} → exit ${build.status}\n\`\`\`\n${((build.stdout ?? '') + (build.stderr ?? '')).slice(-3000)}\n\`\`\``,
    `## Diff\n\`\`\`diff\n${diffOut}\n\`\`\``,
  ].join('\n\n');
  fs.writeFileSync(path.join(dir, `verify-${task.attempts}.md`), evidence);
  const reasons = [];
  if (build.status !== 0) {
    reasons.push(
      `- Lệnh build thất bại (exit ${build.status}):\n\`\`\`\n${((build.stdout ?? '') + (build.stderr ?? '')).slice(-1500)}\n\`\`\``
    );
  }
  if (outside.length > 0) {
    reasons.push(`- Sửa file ngoài phạm vi cho phép (${task.files.join(', ')}):\n${outside.map((f) => `  - \`${f}\``).join('\n')}`);
  }
  if (statusShort) {
    reasons.push(`- Worktree không sạch (\`git status --short\`):\n\`\`\`\n${statusShort}\n\`\`\``);
  }
  if (reasons.length > 0) {
    const autoReview = `# Tự kiểm (verify) không đạt — ${task.id} lượt ${task.attempts}\n\n${reasons.join('\n\n')}\n\nVERDICT: REWORK\n`;
    fs.writeFileSync(path.join(dir, 'review.md'), autoReview, 'utf8');
    task.status = 'REWORK';
    return save(
      task,
      `Tự kiểm không đạt (build=${build.status}, outOfScope=${outside.length}, dirty=${Boolean(statusShort)}), chuyển thẳng REWORK`
    );
  }
  task.status = 'REVIEW';
  save(task, `Build exit ${build.status}, chờ Claude review`);
}

function outOfScope(task, wt) {
  const changed = git(['diff', '--name-only', `${BASE_BRANCH}...HEAD`], wt).split('\n').filter(Boolean);
  return changed.filter((f) => !task.files.some((allowed) => f === allowed || f.startsWith(allowed.replace(/\/?$/, '/'))));
}

export function parseVerdict(stdout) {
  if (typeof stdout !== 'string') return null;
  const lines = stdout
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return null;
  const last = lines[lines.length - 1];
  const m = /^VERDICT: (APPROVED|REWORK)$/.exec(last);
  return m ? m[1] : null;
}

// Claude review: tự động nếu có `claude` CLI, nếu không thì để phiên Claude Code đọc verify-*.md và gọi `verdict`.
export function review(task) {
  if (task.status !== 'REVIEW' || task.review_failed_at) return;
  const whereOut = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['claude'], { encoding: 'utf8' });
  if (whereOut.status !== 0) {
    return console.log(`[REVIEW] ${task.id}: chờ Claude review (${path.join(taskDir(task.id), `verify-${task.attempts}.md`)})`);
  }
  const dir = taskDir(task.id);
  const wt = worktreeOf(task);
  const attemptsNum = Number(task.attempts) || 1;
  const prompt =
    `Bạn là Reviewer dự án cv_quang. Đọc ${path.join(dir, 'spec.md')}, ${path.join(dir, `report-${attemptsNum}.md`)}, ${path.join(dir, `verify-${attemptsNum}.md`)} và code trong ${wt}. ` +
    `Đối chiếu từng tiêu chí nghiệm thu. In toàn bộ nhận xét ra stdout (nếu chưa đạt: liệt kê lỗi + cách sửa cụ thể). ` +
    `Dòng cuối câu trả lời phải là đúng một trong: VERDICT: APPROVED | VERDICT: REWORK`;
  const bins = (whereOut.stdout ?? '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  const exeBin = process.platform === 'win32' ? bins.find((b) => /\.exe$/i.test(b)) : bins[0];
  const cmdShim = process.platform === 'win32' && !exeBin && bins.some((b) => /\.cmd$/i.test(b));
  const timeout = Number(process.env.REVIEW_TIMEOUT_MS ?? 600000);
  const out = spawnSync(exeBin || 'claude', ['-p', prompt, '--allowedTools', 'Read,Grep,Glob'], {
    cwd: wt,
    encoding: 'utf8',
    shell: cmdShim,
    timeout,
  });
  const v = out.status === 0 && !out.error ? parseVerdict(out.stdout ?? '') : null;
  if (v) {
    fs.writeFileSync(path.join(dir, 'review.md'), (out.stdout ?? '').trim() + '\n', 'utf8');
    delete task.review_failed_at;
    setVerdict(task, v);
  } else {
    task.review_failed_at = now();
    save(task, `Review tự động không có verdict hợp lệ (exit=${out.status ?? 'null'}), chạy retry-review ${task.id} để thử lại`);
  }
}

export function retryReview(task) {
  if (task.status !== 'REVIEW') throw new Error(`${task.id} đang ${task.status}, không ở REVIEW`);
  delete task.review_failed_at;
  save(task, 'Xoá review_failed_at để cho phép chạy lại review');
}

function setVerdict(task, verdict) {
  if (task.status !== 'REVIEW') throw new Error(`${task.id} đang ${task.status}, không ở REVIEW`);
  delete task.review_failed_at;
  task.status = verdict;
  save(task, verdict === 'APPROVED' ? 'Claude duyệt, chờ tech lead merge' : 'Claude yêu cầu sửa lại');
}

// Merge chỉ khi tech lead tự chạy lệnh này (AGENTS.md mục 1: merge cần duyệt rõ ràng).
export function merge(task) {
  const repo = getRepo();
  if (task.status !== 'APPROVED') throw new Error(`${task.id} chưa APPROVED`);
  const curBranch = git(['branch', '--show-current'], repo);
  if (curBranch !== BASE_BRANCH) {
    throw new Error(`Repo chính đang ở nhánh "${curBranch}", phải ở nhánh "${BASE_BRANCH}" mới được merge`);
  }
  if (git(['status', '--porcelain'], repo)) throw new Error('Repo chính không sạch, dừng');
  const branchHead = git(['rev-parse', task.branch], repo);
  if (!task.verified_commit || branchHead !== task.verified_commit) {
    throw new Error(
      `Từ chối merge ${task.id}: commit hiện tại của ${task.branch} (${branchHead}) khác verified_commit (${task.verified_commit ?? 'chưa có'})`
    );
  }
  try {
    git(['merge', '--no-ff', '--no-commit', task.branch], repo);
  } catch (e) {
    spawnSync('git', ['merge', '--abort'], { cwd: repo, encoding: 'utf8' });
    throw new Error(`Merge bị conflict cho ${task.id}, đã abort: ${e.message}`);
  }
  const buildCm = process.env.BUILD_CMD ?? BUILD_CMD;
  const build = spawnSync(buildCm, { shell: true, cwd: repo, encoding: 'utf8' });
  if (build.status !== 0) {
    spawnSync('git', ['merge', '--abort'], { cwd: repo, encoding: 'utf8' });
    throw new Error('Build sau merge lỗi, đã abort merge');
  }
  git(['commit', '-m', `merge(${task.id}): ${task.title}`], repo);
  task.status = 'MERGED';
  save(task, `Đã merge vào ${BASE_BRANCH} (chưa push)`);
  try {
    const wt = worktreeOf(task);
    if (fs.existsSync(wt)) removeWorktree(wt, repo);
    git(['branch', '-d', task.branch], repo);
  } catch (e) {
    save(task, `Cảnh báo dọn dẹp sau merge: ${e.message}`);
  }
}

function tick() {
  for (const t of listTasks()) {
    try {
      dispatch(t);
      verify(t);
      review(t);
    } catch (e) {
      console.error(`[LỖI] ${t.id}: ${e.message}`);
    }
  }
}

function status() {
  const rows = listTasks();
  if (!rows.length) return console.log('Bảng việc trống.');
  for (const t of rows) console.log(`${t.id.padEnd(8)} ${t.status.padEnd(12)} lượt ${t.attempts}/${t.max_attempts}  ${t.branch.padEnd(28)} ${t.title}`);
}

const [cmd, id, arg] = process.argv.slice(2);
const one = (fn) => fn(load(id));
const commands = {
  status,
  tick,
  watch: () => { tick(); setInterval(tick, Number(process.env.WATCH_MS ?? 60000)); },
  assign: () => one((t) => { t.status = 'ASSIGNED'; save(t, 'Tech lead duyệt đặc tả'); }),
  dispatch: () => one(dispatch),
  verify: () => one(verify),
  verdict: () => one((t) => setVerdict(t, arg?.toUpperCase())),
  'retry-review': () => one(retryReview),
  // Mở lại việc BLOCKED vì lý do bên ngoài (không tính thêm lượt); báo cáo cũ được lưu lại để tra cứu.
  reopen: () => one((t) => {
    if (t.status !== 'BLOCKED') throw new Error(`${t.id} đang ${t.status}, không phải BLOCKED`);
    const report = path.join(taskDir(t.id), `report-${t.attempts}.md`);
    if (fs.existsSync(report)) fs.renameSync(report, report.replace(/\.md$/, `.blocked-${Date.now()}.md`));
    t.status = 'IN_PROGRESS';
    save(t, `Mở lại lượt ${t.attempts}, dán lại prompt-${t.attempts}.md cho Antigravity`);
  }),
  merge: () => one(merge),
};
if (!commands[cmd]) {
  console.log('Lệnh: status | tick | watch | assign <id> | dispatch <id> | verify <id> | verdict <id> approved|rework | retry-review <id> | reopen <id> | merge <id>');
  process.exit(1);
}
commands[cmd]();
