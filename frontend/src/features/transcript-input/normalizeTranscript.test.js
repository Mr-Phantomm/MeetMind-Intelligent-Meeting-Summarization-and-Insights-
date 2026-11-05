import { describe, expect, it } from 'vitest';
import { isTranscriptUsable, normalizeTranscript } from './normalizeTranscript.js';

describe('normalizeTranscript', () => {
  it('normalizes whitespace and removes non-content markers', () => {
    const result = normalizeTranscript('  Hello   team.  \r\n[music]\n We agreed today. ');

    expect(result.text).toBe('Hello team.\nWe agreed today.');
    expect(result.wordCount).toBe(5);
    expect(result.lineCount).toBe(2);
  });

  it('rejects empty or marker-only input', () => {
    expect(isTranscriptUsable(' \n [applause] ')).toBe(false);
    expect(normalizeTranscript('').characterCount).toBe(0);
  });
});
