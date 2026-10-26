// Ý tưởng từ RTK filters của decolua/9router (MIT)

const ANSI_RE = /\u001b\[[0-9;?]*[ -/]*[@-~]/g;
const IMPORTANT_LOG_RE = /error|Error|warning|TS\d+|✗|failed/;

function filterHunkLines(hunkLines, maxHunkLines) {
  const isChange = hunkLines.map((l) => l.startsWith('+') || l.startsWith('-') || l.startsWith('\\'));
  const hasAnyChange = isChange.some(Boolean);
  const kept = [];
  for (let i = 0; i < hunkLines.length; i += 1) {
    const line = hunkLines[i];
    if (line.startsWith(' ') && hasAnyChange) {
      const nearChange = Boolean(isChange[i - 1] || isChange[i + 1]);
      if (!nearChange) continue;
    }
    kept.push(line);
  }
  if (kept.length > maxHunkLines) {
    const omitted = kept.length - maxHunkLines;
    return [...kept.slice(0, maxHunkLines), `… (đã lược ${omitted} dòng)`];
  }
  return kept;
}

export function compactDiff(diff, opts = {}) {
  try {
    if (typeof diff !== 'string') throw new TypeError('diff phải là chuỗi');
    const { maxHunkLines = 40 } = opts;
    if (typeof maxHunkLines !== 'number' || Number.isNaN(maxHunkLines) || maxHunkLines < 1) {
      throw new RangeError('maxHunkLines phải là số dương');
    }
    if (!diff.trim()) return diff;

    const lines = diff.replace(/\r\n/g, '\n').split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    const files = [];
    let currentFile = null;

    for (const line of lines) {
      if (line.startsWith('diff --git ')) {
        if (currentFile) files.push(currentFile);
        currentFile = {
          headers: [line],
          hunks: [],
          added: 0,
          removed: 0,
        };
        continue;
      }
      if (!currentFile) {
        currentFile = {
          headers: [],
          hunks: [],
          added: 0,
          removed: 0,
        };
      }
      if (line.startsWith('@@')) {
        currentFile.hunks.push({ header: line, lines: [] });
        continue;
      }
      if (currentFile.hunks.length === 0) {
        if (!line.startsWith('index ')) {
          currentFile.headers.push(line);
        }
      } else {
        const hunk = currentFile.hunks[currentFile.hunks.length - 1];
        hunk.lines.push(line);
        if (line.startsWith('+') && !line.startsWith('+++')) {
          currentFile.added += 1;
        } else if (line.startsWith('-') && !line.startsWith('---')) {
          currentFile.removed += 1;
        }
      }
    }
    if (currentFile) files.push(currentFile);

    const outLines = [];
    for (const f of files) {
      for (const h of f.headers) {
        outLines.push(h);
      }
      outLines.push(`+${f.added} -${f.removed}`);
      for (const hunk of f.hunks) {
        outLines.push(hunk.header);
        const compactedHunk = filterHunkLines(hunk.lines, maxHunkLines);
        for (const l of compactedHunk) {
          outLines.push(l);
        }
      }
    }

    const result = outLines.join('\n');
    if (!result.trim()) return diff;
    return result;
  } catch {
    return diff;
  }
}

function collapseConsecutiveDuplicates(lines) {
  const out = [];
  let prev = null;
  let count = 0;

  const flush = () => {
    if (prev === null) return;
    out.push(count > 1 ? `${prev} (×${count})` : prev);
  };

  for (const line of lines) {
    if (prev !== null && line === prev) {
      count += 1;
    } else {
      flush();
      prev = line;
      count = 1;
    }
  }
  flush();
  return out;
}

export function compactBuildLog(log) {
  try {
    if (typeof log !== 'string') throw new TypeError('log phải là chuỗi');
    if (!log.trim()) return log;

    const clean = log.replace(ANSI_RE, '').replace(/\r\n/g, '\n');
    const rawLines = clean.split('\n');
    if (rawLines.length > 0 && rawLines[rawLines.length - 1] === '') {
      rawLines.pop();
    }

    const deduped = collapseConsecutiveDuplicates(rawLines);
    const tailStart = Math.max(0, deduped.length - 30);
    const selected = [];
    for (let i = 0; i < deduped.length; i += 1) {
      const line = deduped[i];
      if (i >= tailStart || IMPORTANT_LOG_RE.test(line)) {
        selected.push(line);
      }
    }

    const finalLines = collapseConsecutiveDuplicates(selected);
    const result = finalLines.join('\n');
    if (!result.trim()) return log;
    return result;
  } catch {
    return log;
  }
}
