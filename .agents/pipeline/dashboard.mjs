#!/usr/bin/env node
// Bố cục bảng + ngăn chi tiết lấy cảm hứng từ dashboard của decolua/9router (MIT). Không copy code.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const DEFAULT_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const STATUS_LIST = [
  'PLANNED',
  'ASSIGNED',
  'IN_PROGRESS',
  'REVIEW',
  'REWORK',
  'APPROVED',
  'MERGED',
  'DONE',
  'BLOCKED',
  'PENDING',
];

function extractTitleFromMarkdown(content, fallback) {
  if (!content) return fallback;
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      return trimmed.replace(/^#+\s*/, '').trim() || fallback;
    }
  }
  return fallback;
}

function extractStatusFromReport(content) {
  if (!content) return 'PENDING';
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const m = /^STATUS:\s*([A-Z_]+)/.exec(lines[i]);
    if (m) return m[1];
  }
  return 'PENDING';
}

function readSafeFile(dirPath, fileName) {
  const resolvedDir = path.resolve(dirPath);
  const fullPath = path.resolve(resolvedDir, fileName);
  if (!fullPath.startsWith(resolvedDir + path.sep)) return null;
  if (!fs.existsSync(fullPath)) return null;
  try {
    if (!fs.statSync(fullPath).isFile()) return null;
    return fs.readFileSync(fullPath, 'utf8');
  } catch {
    return null;
  }
}

function collectTaskDocs(dirPath) {
  let entries = [];
  try {
    entries = fs.readdirSync(dirPath);
  } catch {
    return [];
  }
  const docOrder = [
    { label: 'spec.md', match: (f) => f === 'spec.md' },
    { label: 'prompt', match: (f) => /^prompt(-\d+)?\.md$/.test(f) },
    { label: 'report', match: (f) => /^report(-\d+)?\.md$/.test(f) },
    { label: 'verify', match: (f) => /^verify-\d+\.md$/.test(f) },
    { label: 'review.md', match: (f) => f === 'review.md' },
  ];
  const docs = [];
  for (const group of docOrder) {
    const matched = entries.filter(group.match).sort();
    for (const fileName of matched) {
      const content = readSafeFile(dirPath, fileName);
      if (content !== null) {
        docs.push({ name: fileName, content });
      }
    }
  }
  return docs;
}

export function loadAllTasks(tasksDir) {
  const resolvedTasksDir = path.resolve(tasksDir);
  if (!fs.existsSync(resolvedTasksDir)) return [];
  const entries = fs
    .readdirSync(resolvedTasksDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name)
    .sort();

  const items = [];
  for (const dirName of entries) {
    const dirPath = path.resolve(resolvedTasksDir, dirName);
    if (!dirPath.startsWith(resolvedTasksDir + path.sep)) continue;

    const taskJsonRaw = readSafeFile(dirPath, 'task.json');
    const docs = collectTaskDocs(dirPath);

    if (taskJsonRaw !== null) {
      try {
        const parsed = JSON.parse(taskJsonRaw);
        items.push({
          id: String(parsed.id ?? dirName),
          title: String(parsed.title ?? dirName),
          status: String(parsed.status ?? 'PENDING'),
          attempts: parsed.attempts ?? 0,
          max_attempts: parsed.max_attempts ?? 0,
          branch: String(parsed.branch ?? '-'),
          updated_at: String(parsed.updated_at ?? parsed.created_at ?? '-'),
          history: Array.isArray(parsed.history) ? parsed.history : [],
          isAux: false,
          docs,
        });
        continue;
      } catch {}
    }

    const promptContent = readSafeFile(dirPath, 'prompt.md') ?? readSafeFile(dirPath, 'prompt-1.md');
    const reportContent = readSafeFile(dirPath, 'report.md') ?? readSafeFile(dirPath, 'report-1.md');
    const specContent = readSafeFile(dirPath, 'spec.md');

    if (promptContent !== null || reportContent !== null || specContent !== null) {
      let updatedAt = '-';
      try {
        const refFile = reportContent !== null ? 'report.md' : promptContent !== null ? 'prompt.md' : 'spec.md';
        const st = fs.statSync(path.join(dirPath, refFile));
        updatedAt = st.mtime.toISOString();
      } catch {}

      const status = extractStatusFromReport(reportContent);
      const title = extractTitleFromMarkdown(promptContent ?? specContent ?? reportContent, `Việc phụ ${dirName}`);
      items.push({
        id: dirName,
        title,
        status,
        attempts: '-',
        max_attempts: '-',
        branch: '(việc phụ)',
        updated_at: updatedAt,
        history: [],
        isAux: true,
        docs,
      });
    }
  }
  return items;
}

export function renderDashboardHtml(tasks, generatedAt = new Date().toISOString()) {
  const counts = {};
  for (const s of STATUS_LIST) counts[s] = 0;
  for (const t of tasks) {
    counts[t.status] = (counts[t.status] ?? 0) + 1;
  }

  const summaryCardsHtml = Object.entries(counts)
    .map(
      ([st, count]) => `
      <button type="button" class="stat-card status-badge-${escapeHtml(st)}" data-filter-status="${escapeHtml(st)}" title="Lọc theo ${escapeHtml(st)}">
        <span class="stat-label">${escapeHtml(st)}</span>
        <span class="stat-count">${escapeHtml(count)}</span>
      </button>`
    )
    .join('\n');

  const statusOptionsHtml = [
    '<option value="ALL">Tất cả trạng thái (' + escapeHtml(tasks.length) + ')</option>',
    ...Object.entries(counts).map(
      ([st, count]) => `<option value="${escapeHtml(st)}">${escapeHtml(st)} (${escapeHtml(count)})</option>`
    ),
  ].join('\n');

  const rowsHtml = tasks
    .map((t, idx) => {
      const safeId = escapeHtml(t.id);
      const safeTitle = escapeHtml(t.title);
      const safeStatus = escapeHtml(t.status);
      const safeAttempts =
        t.attempts === '-' && t.max_attempts === '-'
          ? '-'
          : `${escapeHtml(t.attempts)}/${escapeHtml(t.max_attempts)}`;
      const safeBranch = escapeHtml(t.branch);
      const safeUpdated = escapeHtml(t.updated_at);
      const auxBadge = t.isAux ? ' <span class="aux-tag">phụ</span>' : '';

      const historyHtml =
        t.history && t.history.length > 0
          ? `<ul class="history-list">
              ${t.history
                .map(
                  (h) =>
                    `<li><code>${escapeHtml(h.at ?? '')}</code> — <span class="badge status-badge-${escapeHtml(h.status ?? '')}">${escapeHtml(h.status ?? '')}</span> ${escapeHtml(h.note ?? '')}</li>`
                )
                .join('\n')}
            </ul>`
          : '<p class="muted">(Không có lịch sử trong task.json)</p>';

      const docsHtml =
        t.docs && t.docs.length > 0
          ? `<div class="docs-tabs">
              ${t.docs
                .map(
                  (d, dIdx) => `
                  <details class="doc-panel" ${dIdx === 0 ? 'open' : ''}>
                    <summary class="doc-summary">${escapeHtml(d.name)} (${escapeHtml(d.content.length)} ký tự)</summary>
                    <pre class="doc-pre">${escapeHtml(d.content)}</pre>
                  </details>`
                )
                .join('\n')}
            </div>`
          : '<p class="muted">(Không có tài liệu đính kèm)</p>';

      return `
        <tr class="task-row" data-id="${safeId}" data-title="${safeTitle}" data-status="${safeStatus}" data-target="detail-${idx}">
          <td class="col-id"><strong>${safeId}</strong>${auxBadge}</td>
          <td class="col-title">${safeTitle}</td>
          <td class="col-status"><span class="badge status-badge-${safeStatus}">${safeStatus}</span></td>
          <td class="col-attempts">${safeAttempts}</td>
          <td class="col-branch"><code>${safeBranch}</code></td>
          <td class="col-updated"><code>${safeUpdated}</code></td>
        </tr>
        <tr class="detail-row" id="detail-${idx}" data-id="${safeId}" data-title="${safeTitle}" data-status="${safeStatus}">
          <td colspan="6" class="detail-cell">
            <details class="task-details">
              <summary class="task-details-summary">Chi tiết &amp; tài liệu của <strong>${safeId}</strong> (${escapeHtml(t.docs.length)} file, ${escapeHtml(t.history.length)} mốc lịch sử)</summary>
              <div class="task-details-body">
                <div class="detail-section">
                  <h4>Lịch sử (history)</h4>
                  ${historyHtml}
                </div>
                <div class="detail-section">
                  <h4>Tài liệu (spec / prompt / report / verify / review)</h4>
                  ${docsHtml}
                </div>
              </div>
            </details>
          </td>
        </tr>`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bảng Việc Pipeline URAH — cv_quang</title>
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --surface-alt: #f1f5f9;
      --text: #0f172a;
      --muted: #475569;
      --border: #cbd5e1;
      --accent: #4f46e5;
      --pre-bg: #0f172a;
      --pre-text: #e2e8f0;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0b1120;
        --surface: #1e293b;
        --surface-alt: #0f172a;
        --text: #f1f5f9;
        --muted: #94a3b8;
        --border: #334155;
        --accent: #818cf8;
        --pre-bg: #020617;
        --pre-text: #e2e8f0;
      }
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
      background: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 16px;
      width: 100%;
    }
    header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: baseline;
      gap: 8px;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 1.25rem;
      margin: 0;
    }
    .meta {
      font-size: 0.8rem;
      color: var(--muted);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
      gap: 8px;
      margin-bottom: 16px;
    }
    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--border);
      cursor: pointer;
      text-align: left;
      font: inherit;
    }
    .stat-card.active-filter {
      outline: 2px solid var(--accent);
      outline-offset: 1px;
    }
    .stat-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.03em;
    }
    .stat-count {
      font-size: 1.15rem;
      font-weight: 800;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }
    .controls input,
    .controls select,
    .controls button {
      padding: 7px 10px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      font: inherit;
    }
    .controls input {
      flex: 1 1 200px;
      min-width: 0;
    }
    .controls select {
      flex: 0 1 200px;
      max-width: 100%;
    }
    .table-wrap {
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 640px;
    }
    th, td {
      padding: 8px 10px;
      border-bottom: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }
    th {
      background: var(--surface-alt);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--muted);
    }
    .task-row {
      cursor: pointer;
    }
    .task-row:hover {
      background: var(--surface-alt);
    }
    .detail-cell {
      padding: 4px 12px 10px 12px;
      background: var(--surface-alt);
    }
    .task-details-summary {
      cursor: pointer;
      font-size: 0.82rem;
      color: var(--muted);
      padding: 4px 0;
    }
    .task-details-body {
      padding-top: 8px;
    }
    .detail-section h4 {
      margin: 8px 0 4px 0;
      font-size: 0.85rem;
    }
    .history-list {
      margin: 4px 0 10px 0;
      padding-left: 18px;
    }
    .history-list li {
      margin-bottom: 4px;
    }
    .doc-panel {
      border: 1px solid var(--border);
      border-radius: 6px;
      margin-bottom: 6px;
      background: var(--surface);
    }
    .doc-summary {
      padding: 6px 10px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.82rem;
    }
    .doc-pre {
      margin: 0;
      padding: 10px;
      background: var(--pre-bg);
      color: var(--pre-text);
      overflow-x: auto;
      max-height: 360px;
      font-size: 0.78rem;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
    }
    .aux-tag {
      display: inline-block;
      margin-left: 4px;
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 0.68rem;
      background: var(--surface-alt);
      border: 1px solid var(--border);
      color: var(--muted);
    }
    .status-badge-PLANNED { background: #e2e8f0; color: #1e293b; }
    .status-badge-ASSIGNED { background: #dbeafe; color: #1e40af; }
    .status-badge-IN_PROGRESS { background: #fef3c7; color: #92400e; }
    .status-badge-REVIEW { background: #ede9fe; color: #5b21b6; }
    .status-badge-REWORK { background: #ffedd5; color: #9a3412; }
    .status-badge-APPROVED { background: #dcfce7; color: #166534; }
    .status-badge-MERGED { background: #d1fae5; color: #065f46; }
    .status-badge-DONE { background: #ccfbf1; color: #115e59; }
    .status-badge-BLOCKED { background: #fee2e2; color: #991b1b; }
    .status-badge-PENDING { background: #f3f4f6; color: #374151; }
    .muted { color: var(--muted); font-size: 0.8rem; margin: 4px 0; }
    .hidden-row { display: none !important; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Bảng Việc Pipeline URAH — <code>cv_quang</code></h1>
      <div class="meta">Sinh lúc: <code>${escapeHtml(generatedAt)}</code> | Tổng số mục: <strong id="visible-count">${escapeHtml(tasks.length)}</strong> / ${escapeHtml(tasks.length)}</div>
    </header>

    <section class="stats-grid" aria-label="Thống kê theo trạng thái">
      ${summaryCardsHtml}
    </section>

    <section class="controls" aria-label="Bộ lọc bảng việc">
      <input type="search" id="search-input" placeholder="Tìm theo ID hoặc tiêu đề..." aria-label="Tìm theo ID hoặc tiêu đề" />
      <select id="status-filter" aria-label="Lọc theo trạng thái">
        ${statusOptionsHtml}
      </select>
      <button type="button" id="reset-filter">Xoá lọc</button>
    </section>

    <div class="table-wrap">
      <table id="tasks-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Trạng thái</th>
            <th>Lượt</th>
            <th>Nhánh</th>
            <th>Cập nhật lúc</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    (function () {
      var searchInput = document.getElementById('search-input');
      var statusFilter = document.getElementById('status-filter');
      var resetBtn = document.getElementById('reset-filter');
      var visibleCountEl = document.getElementById('visible-count');
      var taskRows = Array.prototype.slice.call(document.querySelectorAll('.task-row'));
      var statCards = Array.prototype.slice.call(document.querySelectorAll('.stat-card'));

      function applyFilters() {
        var q = (searchInput.value || '').trim().toLowerCase();
        var st = statusFilter.value || 'ALL';
        var shown = 0;

        taskRows.forEach(function (row) {
          var id = (row.getAttribute('data-id') || '').toLowerCase();
          var title = (row.getAttribute('data-title') || '').toLowerCase();
          var rowStatus = row.getAttribute('data-status') || '';
          var detailId = row.getAttribute('data-target');
          var detailRow = detailId ? document.getElementById(detailId) : null;

          var matchStatus = st === 'ALL' || rowStatus === st;
          var matchQuery = !q || id.indexOf(q) !== -1 || title.indexOf(q) !== -1;
          var visible = matchStatus && matchQuery;

          if (visible) {
            row.classList.remove('hidden-row');
            if (detailRow) detailRow.classList.remove('hidden-row');
            shown += 1;
          } else {
            row.classList.add('hidden-row');
            if (detailRow) detailRow.classList.add('hidden-row');
          }
        });

        if (visibleCountEl) visibleCountEl.textContent = String(shown);
        statCards.forEach(function (card) {
          if (card.getAttribute('data-filter-status') === st) {
            card.classList.add('active-filter');
          } else {
            card.classList.remove('active-filter');
          }
        });
      }

      searchInput.addEventListener('input', applyFilters);
      statusFilter.addEventListener('change', applyFilters);
      resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        statusFilter.value = 'ALL';
        applyFilters();
      });

      statCards.forEach(function (card) {
        card.addEventListener('click', function () {
          var targetStatus = card.getAttribute('data-filter-status');
          statusFilter.value = statusFilter.value === targetStatus ? 'ALL' : targetStatus;
          applyFilters();
        });
      });

      taskRows.forEach(function (row) {
        row.addEventListener('click', function () {
          var detailId = row.getAttribute('data-target');
          var detailRow = detailId ? document.getElementById(detailId) : null;
          if (!detailRow) return;
          var detailsEl = detailRow.querySelector('details.task-details');
          if (detailsEl) detailsEl.open = !detailsEl.open;
        });
      });
    })();
  </script>
</body>
</html>
`;
}

export function buildDashboard({ tasksDir, outFile } = {}) {
  const resolvedTasksDir = path.resolve(
    tasksDir ?? process.env.TASKS_DIR ?? process.env.BOARD ?? path.join(DEFAULT_REPO, '.agents', 'tasks')
  );
  const resolvedOutFile = path.resolve(outFile ?? path.join(resolvedTasksDir, 'dashboard.html'));
  const tasks = loadAllTasks(resolvedTasksDir);
  const html = renderDashboardHtml(tasks);
  fs.mkdirSync(path.dirname(resolvedOutFile), { recursive: true });
  fs.writeFileSync(resolvedOutFile, html, 'utf8');
  console.log(resolvedOutFile);
  return resolvedOutFile;
}

export function runDashboardCli(argv = process.argv.slice(2)) {
  let outFile = null;
  let watchMode = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--watch') {
      watchMode = true;
    } else if (arg === '--out' && argv[i + 1]) {
      outFile = argv[i + 1];
      i += 1;
    } else if (arg.startsWith('--out=')) {
      outFile = arg.slice('--out='.length);
    }
  }
  buildDashboard({ outFile });
  if (watchMode) {
    setInterval(() => {
      try {
        buildDashboard({ outFile });
      } catch (e) {
        console.error(`[LỖI DASHBOARD] ${e.message}`);
      }
    }, 30000);
  }
}

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  runDashboardCli();
}
