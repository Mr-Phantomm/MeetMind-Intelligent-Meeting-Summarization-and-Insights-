const NON_CONTENT_LINE = /^\s*(?:\[?(?:music|applause|inaudible|crosstalk)\]?)\s*$/i;

export function normalizeTranscript(value) {
  const source = typeof value === 'string' ? value : '';
  const lines = source
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .filter((line) => line && !NON_CONTENT_LINE.test(line));

  const text = lines.join('\n');

  return {
    text,
    characterCount: text.length,
    wordCount: text ? text.split(/\s+/).length : 0,
    lineCount: lines.length,
  };
}
