// Bộ kiểm thử tự động cho pipeline.mjs (chạy trên repo git tạm bằng fs.mkdtempSync, không đụng repo thật).
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  ExecutorUncertainError,
  acquireLock,
  assign,
  buildCmdLine,
  buildReviewPrompt,
  extend,
  hasJsonError,
  load,
  merge,
  outOfScope,
  parseVerdict,
  removeWorktree,
  reopen,
  safeTick,
  save,
  selectExecutor,
  sendToAntigravity,
  setVerdict,
  status,
  validateTask,
  verify,
  withLock,
} from './pipeline.mjs';

function initTempGitRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cv_quang_pipeline_test_'));
  const repo = path.join(root, 'repo');
  const board = path.join(repo, '.agents', 'tasks');
  fs.mkdirSync(board, { recursive: true });
  execFileSync('git', ['init', '-b', 'stage'], { cwd: repo, stdio: 'ignore' });
  execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: repo, stdio: 'ignore' });
  execFileSync('git', ['config', 'user.name', 'Test User'], { cwd: repo, stdio: 'ignore' });
  fs.writeFileSync(path.join(repo, 'vercel.json'), '{"rewrites":[]}\n', 'utf8');
  fs.mkdirSync(path.join(repo, 'src'), { recursive: true });
  fs.writeFileSync(path.join(repo, 'src', 'app.txt'), 'init\n', 'utf8');
  fs.writeFileSync(path.join(repo, '.gitignore'), 'node_modules\n.agents/tasks\n', 'utf8');
  execFileSync('git', ['add', '.'], { cwd: repo, stdio: 'ignore' });
  execFileSync('git', ['commit', '-m', 'chore: init stage'], { cwd: repo, stdio: 'ignore' });
  return { root, repo, board };
}

function cleanupTempRoot(root) {
  try {
    fs.rmSync(root, { recursive: true, force: true });
  } catch {}
}

test('removeWorktree: gỡ junction node_modules trước khi xóa worktree, bảo toàn repo/node_modules/pkg/keep.txt', () => {
  const { root, repo } = initTempGitRepo();
  try {
    const keepFile = path.join(repo, 'node_modules', 'pkg', 'keep.txt');
    fs.mkdirSync(path.dirname(keepFile), { recursive: true });
    fs.writeFileSync(keepFile, 'must-keep-safe\n', 'utf8');

    const wt = `${repo}_worktree_t-1`;
    execFileSync('git', ['worktree', 'add', '-b', 'feat/t-1', wt, 'stage'], { cwd: repo, stdio: 'ignore' });

    const wtNm = path.join(wt, 'node_modules');
    const repoNm = path.join(repo, 'node_modules');
    if (process.platform === 'win32') {
      const mk = spawnSync('cmd', ['/c', 'mklink', '/J', wtNm, repoNm], { encoding: 'utf8' });
      assert.equal(mk.status, 0, `mklink /J lỗi: ${mk.stderr || mk.stdout}`);
    } else {
      fs.symlinkSync(repoNm, wtNm, 'dir');
    }

    assert.equal(fs.lstatSync(wtNm).isSymbolicLink(), true);
    removeWorktree(wt, repo);

    assert.equal(fs.existsSync(wt), false, 'Worktree phải được xóa');
    assert.equal(fs.existsSync(keepFile), true, 'keep.txt trong repo chính phải còn nguyên');
    assert.equal(fs.readFileSync(keepFile, 'utf8'), 'must-keep-safe\n');
  } finally {
    cleanupTempRoot(root);
  }
});

test('removeWorktree: từ chối xóa nếu node_modules trong worktree là thư mục thật', () => {
  const { root, repo } = initTempGitRepo();
  try {
    const wt = `${repo}_worktree_t-2`;
    execFileSync('git', ['worktree', 'add', '-b', 'feat/t-2', wt, 'stage'], { cwd: repo, stdio: 'ignore' });
    fs.mkdirSync(path.join(wt, 'node_modules', 'real-pkg'), { recursive: true });

    assert.throws(
      () => removeWorktree(wt, repo),
      /node_modules là thư mục thật/,
      'Phải ném lỗi khi node_modules là thư mục thật'
    );
    fs.rmSync(path.join(wt, 'node_modules'), { recursive: true, force: true });
    removeWorktree(wt, repo);
  } finally {
    cleanupTempRoot(root);
  }
});

test('validateTask: từ chối branch chứa ký tự chèn lệnh, id khác tên thư mục, files chứa .. hoặc đường dẫn tuyệt đối', () => {
  const valid = {
    id: 'T-A',
    title: 'Test valid',
    status: 'PLANNED',
    branch: 'feat/valid-branch',
    files: ['src/app/App.tsx', 'package.json'],
  };
  assert.doesNotThrow(() => validateTask(valid, 'T-A'));

  // Từ chối branch: "feat/x&calc"
  assert.throws(
    () => validateTask({ ...valid, branch: 'feat/x&calc' }, 'T-A'),
    /Nhánh không hợp lệ/
  );

  // Từ chối id khác tên thư mục
  assert.throws(
    () => validateTask({ ...valid, id: 'T-B' }, 'T-A'),
    /không trùng tên thư mục/
  );

  // Từ chối id sai định dạng
  assert.throws(
    () => validateTask({ ...valid, id: 't-a' }, 't-a'),
    /Task id không hợp lệ/
  );

  // Từ chối files chứa ..
  assert.throws(
    () => validateTask({ ...valid, files: ['src/../secret.txt'] }, 'T-A'),
    /Danh sách files không hợp lệ/
  );

  // Từ chối files bắt đầu bằng / hoặc ổ đĩa
  assert.throws(
    () => validateTask({ ...valid, files: ['/etc/passwd'] }, 'T-A'),
    /Danh sách files không hợp lệ/
  );
  assert.throws(
    () => validateTask({ ...valid, files: ['C:\\Windows\\win.ini'] }, 'T-A'),
    /Danh sách files không hợp lệ/
  );
});

test('outOfScope: phát hiện git mv vercel.json src/x.json khi phạm vi chỉ là src', () => {
  const { root, repo } = initTempGitRepo();
  const prevRepo = process.env.REPO;
  process.env.REPO = repo;
  try {
    const wt = `${repo}_worktree_t-mv`;
    execFileSync('git', ['worktree', 'add', '-b', 'fix/test-mv', wt, 'stage'], { cwd: repo, stdio: 'ignore' });
    execFileSync('git', ['mv', 'vercel.json', 'src/x.json'], { cwd: wt, stdio: 'ignore' });
    execFileSync('git', ['commit', '-m', 'fix: move file'], { cwd: wt, stdio: 'ignore' });

    const task = {
      id: 'T-MV',
      title: 'Test mv',
      branch: 'fix/test-mv',
      files: ['src\\'],
    };
    const outside = outOfScope(task, wt);
    assert.deepEqual(outside, ['vercel.json']);
    removeWorktree(wt, repo);
  } finally {
    if (prevRepo === undefined) delete process.env.REPO;
    else process.env.REPO = prevRepo;
    cleanupTempRoot(root);
  }
});

test('parseVerdict: chỉ đọc dòng cuối không rỗng và khớp đúng mẫu VERDICT', () => {
  assert.equal(
    parseVerdict('... VERDICT: APPROVED | VERDICT: REWORK\nVERDICT: REWORK'),
    'REWORK'
  );
  assert.equal(
    parseVerdict('... VERDICT: APPROVED | VERDICT: REWORK\nVERDICT: APPROVED\n\n'),
    'APPROVED'
  );
  assert.equal(
    parseVerdict('chưa thể VERDICT: APPROVED\nCần sửa thêm mục 2.'),
    null
  );
  assert.equal(
    parseVerdict('chưa thể VERDICT: APPROVED'),
    null
  );
});

test('buildCmdLine & buildReviewPrompt: quote đúng đường dẫn có dấu cách, chặn &, |, % và chấp nhận prompt thật của review()', () => {
  const cmdLine = buildCmdLine('C:\\Program Files\\nodejs\\claude.cmd', ['-p', 'hello world', '--allowedTools', 'Read,Grep,Glob']);
  assert.equal(
    cmdLine,
    '"C:\\Program Files\\nodejs\\claude.cmd" "-p" "hello world" "--allowedTools" "Read,Grep,Glob"'
  );

  // Tham số chứa &, | hoặc % bị từ chối
  assert.throws(() => buildCmdLine('claude.cmd', ['foo & calc']), /không an toàn/);
  assert.throws(() => buildCmdLine('claude.cmd', ['VERDICT: APPROVED | VERDICT: REWORK']), /không an toàn/);
  assert.throws(() => buildCmdLine('claude.cmd', ['%PATH%']), /không an toàn/);
  assert.throws(() => buildCmdLine('claude.cmd', ['has "quote"']), /không an toàn/);
  assert.throws(() => buildCmdLine('claude.cmd', ['line1\nline2']), /không an toàn/);

  // Prompt thật của review() đi qua buildCmdLine mà không bị ném lỗi
  const realPrompt = buildReviewPrompt({ id: 'P-1', attempts: 1 });
  assert.ok(
    realPrompt.endsWith('Dòng cuối cùng phải là đúng một trong hai dòng: VERDICT: APPROVED hoặc VERDICT: REWORK')
  );
  assert.doesNotThrow(() =>
    buildCmdLine('C:\\Users\\Admin\\AppData\\Roaming\\npm\\claude.cmd', ['-p', realPrompt, '--allowedTools', 'Read,Grep,Glob'])
  );
});

test('setVerdict & CLI state transitions: từ chối verdict approve (gõ sai), kiểm tra assign, reopen và extend', () => {
  const { root, repo, board } = initTempGitRepo();
  const prevRepo = process.env.REPO;
  const prevBoard = process.env.BOARD;
  process.env.REPO = repo;
  process.env.BOARD = board;
  try {
    const dir = path.join(board, 'T-1');
    fs.mkdirSync(dir, { recursive: true });
    const task = {
      id: 'T-1',
      title: 'Test state',
      status: 'REVIEW',
      branch: 'fix/state-test',
      files: ['src'],
      attempts: 3,
      max_attempts: 3,
    };
    save(task);

    // Gõ sai "approve" phải bị từ chối
    assert.throws(
      () => setVerdict(load('T-1'), 'approve'),
      /Verdict không hợp lệ/
    );

    // assign chỉ chạy được khi PLANNED
    assert.throws(
      () => assign(load('T-1')),
      /chỉ có thể assign khi đang PLANNED/
    );

    // Chuyển sang BLOCKED do max_attempts -> reopen bị từ chối, hướng dẫn dùng extend
    const blockedTask = load('T-1');
    blockedTask.status = 'BLOCKED';
    blockedTask.blocked_reason = 'max_attempts';
    save(blockedTask);

    assert.throws(
      () => reopen(load('T-1')),
      /extend T-1/
    );

    // extend tăng max_attempts và đặt status REWORK
    extend(load('T-1'));
    const afterExtend = load('T-1');
    assert.equal(afterExtend.status, 'REWORK');
    assert.equal(afterExtend.max_attempts, 4);
    assert.equal(afterExtend.blocked_reason, undefined);

    // reopen cho phép khi blocked_reason là agent
    afterExtend.status = 'BLOCKED';
    afterExtend.blocked_reason = 'agent';
    save(afterExtend);
    reopen(load('T-1'));
    assert.equal(load('T-1').status, 'IN_PROGRESS');
  } finally {
    if (prevRepo === undefined) delete process.env.REPO;
    else process.env.REPO = prevRepo;
    if (prevBoard === undefined) delete process.env.BOARD;
    else process.env.BOARD = prevBoard;
    cleanupTempRoot(root);
  }
});

test('verify, merge, lock và status: luồng tự kiểm lưu verified_commit, merge an toàn và khoá .lock', () => {
  const { root, repo, board } = initTempGitRepo();
  const prevRepo = process.env.REPO;
  const prevBoard = process.env.BOARD;
  const prevBuild = process.env.BUILD_CMD;
  process.env.REPO = repo;
  process.env.BOARD = board;
  process.env.BUILD_CMD = 'node -e "process.exit(0)"';
  try {
    const dir = path.join(board, 'T-2');
    fs.mkdirSync(dir, { recursive: true });
    const wt = `${repo}_worktree_t-2`;
    execFileSync('git', ['worktree', 'add', '-b', 'feat/t-2', wt, 'stage'], { cwd: repo, stdio: 'ignore' });
    fs.writeFileSync(path.join(wt, 'src', 'app.txt'), 'updated\n', 'utf8');
    execFileSync('git', ['add', 'src/app.txt'], { cwd: wt, stdio: 'ignore' });
    execFileSync('git', ['commit', '-m', 'feat: update app'], { cwd: wt, stdio: 'ignore' });

    const task = {
      id: 'T-2',
      title: 'Test verify and merge',
      status: 'IN_PROGRESS',
      branch: 'feat/t-2',
      files: ['src'],
      attempts: 1,
      max_attempts: 3,
    };
    save(task);
    fs.writeFileSync(path.join(dir, 'report-1.md'), 'Báo cáo xong\nSTATUS: DONE\n', 'utf8');

    verify(load('T-2'));
    const verified = load('T-2');
    assert.equal(verified.status, 'REVIEW');
    assert.ok(verified.verified_commit, 'Phải lưu verified_commit');
    assert.equal(fs.existsSync(path.join(dir, 'diff-1.patch')), true, 'Phải lưu diff-1.patch đầy đủ');
    const verifyMd = fs.readFileSync(path.join(dir, 'verify-1.md'), 'utf8');
    assert.match(verifyMd, /## git diff --stat/);
    assert.ok(verifyMd.includes('diff-1.patch'), 'verify-1.md phải ghi đường dẫn file .patch');

    setVerdict(verified, 'approved');
    assert.equal(load('T-2').status, 'APPROVED');

    // Merge thành công vào stage
    merge(load('T-2'));
    assert.equal(load('T-2').status, 'MERGED');
    assert.equal(fs.existsSync(wt), false);

    // Kiểm tra hasJsonError
    assert.equal(hasJsonError('0 error: none'), false);
    assert.equal(hasJsonError('{"error":null}'), false);
    assert.equal(hasJsonError('{"error":""}'), false);
    assert.equal(hasJsonError('{"error":"ANTIGRAVITY_LS_ADDRESS is not set"}'), true);

    // Kiểm tra khoá .lock chặn truy cập đồng thời và gỡ khoá cũ
    const release = acquireLock(board);
    assert.throws(() => acquireLock(board), /đang bị khoá/);

    // Kiểm tra vòng bọc safeTick() của watch không làm sập tiến trình khi bảng việc đang bị khoá .lock
    const warnings = [];
    const origWarn = console.warn;
    console.warn = (...args) => warnings.push(args.join(' '));
    try {
      assert.doesNotThrow(() => safeTick());
    } finally {
      console.warn = origWarn;
    }
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /^\[BỎ QUA VÒNG\] Bảng việc đang bị khoá/);

    release();

    // Kiểm tra merge() báo rõ "đã merge rồi" nếu nhánh đã là tổ tiên của stage
    execFileSync('git', ['branch', 'feat/t-2-merged', 'HEAD'], { cwd: repo, stdio: 'ignore' });
    const headCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim();
    const mergedTask = {
      id: 'T-2',
      title: 'Already merged task',
      status: 'APPROVED',
      branch: 'feat/t-2-merged',
      files: ['src'],
      attempts: 1,
      max_attempts: 3,
      verified_commit: headCommit,
    };
    save(mergedTask);
    assert.throws(() => merge(load('T-2')), /đã merge rồi/);

    // Kiểm tra status() không lỗi khi task thiếu branch
    const dirNoBranch = path.join(board, 'R-1');
    fs.mkdirSync(dirNoBranch, { recursive: true });
    fs.writeFileSync(
      path.join(dirNoBranch, 'task.json'),
      JSON.stringify({ id: 'R-1', title: 'Readonly task', status: 'DONE', files: ['src'] }, null, 2),
      'utf8'
    );
    assert.doesNotThrow(() => status());
  } finally {
    if (prevRepo === undefined) delete process.env.REPO;
    else process.env.REPO = prevRepo;
    if (prevBoard === undefined) delete process.env.BOARD;
    else process.env.BOARD = prevBoard;
    if (prevBuild === undefined) delete process.env.BUILD_CMD;
    else process.env.BUILD_CMD = prevBuild;
    cleanupTempRoot(root);
  }
});

test('sendToAntigravity & selectExecutor: kênh 1 lỗi thì dùng kênh 2; mọi kênh lỗi thì rơi về manual', () => {
  const { root, repo, board } = initTempGitRepo();
  const prevRepo = process.env.REPO;
  const prevBoard = process.env.BOARD;
  process.env.REPO = repo;
  process.env.BOARD = board;
  try {
    const dir = path.join(board, 'T-3');
    fs.mkdirSync(dir, { recursive: true });
    const dummyTask = {
      id: 'T-3',
      title: 'Test executor fallback',
      status: 'IN_PROGRESS',
      branch: 'feat/t-3',
      files: ['src'],
      attempts: 1,
      max_attempts: 3,
    };
    save(dummyTask);

    // Ca 1: Kênh 1 lỗi rõ ràng (exit khác 0), kênh 2 thành công → trả về tên kênh 2 và ghi executor.log
    const usedChannel = sendToAntigravity(dummyTask, 'prompt-1.md', [
      {
        name: 'EXECUTOR_CMD',
        available: () => true,
        send: () => {
          throw new Error('exit 1 on channel 1');
        },
      },
      {
        name: 'agy',
        available: () => true,
        send: () => true,
      },
      {
        name: 'manual',
        available: () => true,
        send: () => true,
      },
    ]);
    assert.equal(usedChannel, 'agy');
    const logContent = fs.readFileSync(path.join(dir, 'executor.log'), 'utf8');
    assert.match(logContent, /\[EXECUTOR_CMD\].*exit 1 on channel 1/);

    // Ca 1b: Kênh 1 bị timeout (ETIMEDOUT / ExecutorUncertainError) → ném lỗi, KHÔNG gọi send() của kênh 2
    let ch2SendCount = 0;
    assert.throws(
      () =>
        sendToAntigravity(dummyTask, 'prompt-1.md', [
          {
            name: 'agy',
            available: () => true,
            send: () => {
              const err = new Error('spawnSync agy ETIMEDOUT');
              err.code = 'ETIMEDOUT';
              throw err;
            },
          },
          {
            name: 'agentapi',
            available: () => true,
            send: () => {
              ch2SendCount += 1;
              return true;
            },
          },
        ]),
      (err) =>
        err instanceof ExecutorUncertainError &&
        /kênh agy quá thời gian, có thể agent đã chạy, kiểm tra worktree trước khi reopen/.test(err.message)
    );
    assert.equal(ch2SendCount, 0, 'Timeout ở kênh 1 tuyệt đối không được gọi send() của kênh 2');

    // Ca 2: Mọi kênh tự động đều lỗi → rơi về manual
    const fallbackManual = selectExecutor(
      [
        {
          name: 'EXECUTOR_CMD',
          available: () => true,
          send: () => {
            throw new Error('fail 1');
          },
        },
        {
          name: 'agy',
          available: () => true,
          send: () => ({ status: 1, stdout: '{"error":"bad"}' }),
        },
        {
          name: 'manual',
          available: () => true,
          send: () => true,
        },
      ],
      dummyTask,
      'prompt-1.md'
    );
    assert.equal(fallbackManual, 'manual');
  } finally {
    if (prevRepo === undefined) delete process.env.REPO;
    else process.env.REPO = prevRepo;
    if (prevBoard === undefined) delete process.env.BOARD;
    else process.env.BOARD = prevBoard;
    cleanupTempRoot(root);
  }
});
