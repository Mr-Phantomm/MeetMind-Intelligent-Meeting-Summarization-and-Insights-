import React, { useRef, useState } from 'react';
import { Alert } from '../../components/shared/Alert.jsx';
import { Button } from '../../components/shared/Button.jsx';
import { normalizeTranscript } from './normalizeTranscript.js';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export function TranscriptInputForm({ onSubmit }) {
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const statistics = normalizeTranscript(value);

  function handleTextChange(event) {
    setValue(event.target.value);
    setError('');
    setFileName('');
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.txt')) {
      setError('Please choose a .txt transcript file.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Transcript files must be smaller than 2 MB.');
      return;
    }

    try {
      setValue(await file.text());
      setFileName(file.name);
      setError('');
    } catch (readError) {
      setError(`Unable to read ${file.name}. Please try another file.`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = normalizeTranscript(value);

    if (!normalized.text) {
      setError('Enter transcript text or import a .txt file before continuing.');
      return;
    }

    onSubmit?.(normalized);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Transcript input">
      {error && <Alert type="error" title="Transcript not ready" message={error} />}

      <label htmlFor="transcript-text">Meeting transcript</label>
      <textarea
        id="transcript-text"
        value={value}
        onChange={handleTextChange}
        placeholder="Paste the meeting transcript here..."
        rows={12}
        aria-describedby="transcript-statistics"
      />

      <div id="transcript-statistics" aria-live="polite">
        {statistics.wordCount} words · {statistics.characterCount} characters
        {fileName && ` · imported from ${fileName}`}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,text/plain"
        onChange={handleFileChange}
        hidden
      />
      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
        Import .txt file
      </Button>
      <Button type="submit" disabled={!statistics.wordCount}>
        Continue
      </Button>
    </form>
  );
}
