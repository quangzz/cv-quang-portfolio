import assert from 'node:assert/strict';
import test from 'node:test';
import { compactBuildLog, compactDiff } from './compact-evidence.mjs';

test('compactDiff: diff 3 file với một hunk 200 dòng còn đủ 3 header, thống kê +N -M và dòng "đã lược"', () => {
  const bigHunkLines = [];
  for (let i = 1; i <= 200; i += 1) {
    bigHunkLines.push(`+const line${i} = ${i};`);
  }

  const rawDiff = [
    'diff --git a/src/first.ts b/src/first.ts',
    'index 1111111..2222222 100644',
    '--- a/src/first.ts',
    '+++ b/src/first.ts',
    '@@ -1,6 +1,6 @@',
    ' ctx far 1',
    ' ctx far 2',
    ' ctx near before',
    '-const a = 1;',
    '+const a = 2;',
    ' ctx near after',
    ' ctx far 3',
    'diff --git a/src/second-big.ts b/src/second-big.ts',
    'index 3333333..4444444 100644',
    '--- a/src/second-big.ts',
    '+++ b/src/second-big.ts',
    '@@ -1,1 +1,200 @@',
    ...bigHunkLines,
    'diff --git a/src/third.ts b/src/third.ts',
    'index 5555555..6666666 100644',
    '--- a/src/third.ts',
    '+++ b/src/third.ts',
    '@@ -10,3 +10,4 @@',
    ' keep near',
    '+export const ok = true;',
  ].join('\n');

  const out = compactDiff(rawDiff, { maxHunkLines: 40 });

  // Đủ 3 header của 3 file
  assert.match(out, /diff --git a\/src\/first\.ts b\/src\/first\.ts/);
  assert.match(out, /diff --git a\/src\/second-big\.ts b\/src\/second-big\.ts/);
  assert.match(out, /diff --git a\/src\/third\.ts b\/src\/third\.ts/);

  // Có dòng thống kê +N -M cho từng file
  assert.match(out, /\+1 -1/);
  assert.match(out, /\+200 -0/);
  assert.match(out, /\+1 -0/);

  // Có dòng "đã lược" cho hunk 200 dòng (200 - 40 = 160 dòng)
  assert.match(out, /… \(đã lược 160 dòng\)/);

  // Đã bỏ bớt các dòng ngữ cảnh ở xa thay đổi
  assert.equal(out.includes('ctx far 1'), false);
  assert.equal(out.includes('ctx far 3'), false);
  assert.equal(out.includes('ctx near before'), true);
});

test('compactBuildLog: xoá mã ANSI, giữ dòng lỗi TS/error/warning, gộp dòng trùng (×n) và giữ 30 dòng cuối', () => {
  const lines = [
    '\u001b[36mvite v6.4.5 building...\u001b[0m',
    'transforming module...',
    'transforming module...',
    'transforming module...',
    '\u001b[31msrc/App.tsx(12,5): error TS2322: Type string is not assignable to number.\u001b[0m',
    '\u001b[33mwarning: unused variable x\u001b[0m',
  ];
  for (let i = 1; i <= 50; i += 1) {
    lines.push(`chunk-${i}.js rendered`);
  }
  const rawLog = lines.join('\n');
  const out = compactBuildLog(rawLog);

  // Đã xoá mã màu ANSI
  assert.equal(/\u001b\[/.test(out), false);

  // Còn dòng lỗi TS2322 và dòng warning
  assert.match(out, /error TS2322: Type string is not assignable to number/);
  assert.match(out, /warning: unused variable x/);

  // Dòng trùng liên tiếp được gộp kèm (×n) khi nằm trong kết quả
  const dupErrorLog = [
    'Error: duplicate failure',
    'Error: duplicate failure',
    'Error: duplicate failure',
    'done',
  ].join('\n');
  assert.match(compactBuildLog(dupErrorLog), /Error: duplicate failure \(×3\)/);

  // Giữ 30 dòng cuối và lược bớt các dòng thường ở đầu
  assert.equal(out.includes('chunk-1.js rendered'), false);
  assert.equal(out.includes('chunk-50.js rendered'), true);
});

test('compactDiff & compactBuildLog: fail-open trả lại nguyên văn khi đầu vào hoặc tuỳ chọn gây lỗi', () => {
  const sampleDiff = 'diff --git a/x.ts b/x.ts\n--- a/x.ts\n+++ b/x.ts\n@@ -1 +1 @@\n-a\n+b';

  // Tuỳ chọn null hoặc có getter ném lỗi → trả lại nguyên văn sampleDiff
  assert.equal(compactDiff(sampleDiff, null), sampleDiff);
  const throwingOpts = {
    get maxHunkLines() {
      throw new Error('boom');
    },
  };
  assert.equal(compactDiff(sampleDiff, throwingOpts), sampleDiff);
  assert.equal(compactDiff(sampleDiff, { maxHunkLines: -5 }), sampleDiff);

  // Đầu vào không phải string hoặc rỗng → trả lại nguyên văn
  const badObj = { custom: 123 };
  assert.equal(compactDiff(badObj), badObj);
  assert.equal(compactBuildLog(badObj), badObj);
  assert.equal(compactDiff(''), '');
  assert.equal(compactBuildLog(''), '');
});
