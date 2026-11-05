# Tamanna — Transcript Input & Normalization

This guide documents Tamanna's ownership area without changing the application
implementation.

## Owned areas

- `frontend/src/features/transcript-input/` — transcript entry, text-file
  selection, preview, and input-state presentation.
- `backend/src/modules/transcripts/` — transcript validation, normalization,
  and normalization-related API behavior.

## Intended flow

1. Accept transcript text from the form or a `.txt` file.
2. Validate that the input contains usable text.
3. Normalize spacing and remove non-content noise while preserving meaning.
4. Return normalized text and basic transcript statistics to the rest of the
   application.

## Collaboration boundary

Changes in this area should remain focused on transcript input and
normalization. Summary generation, meeting persistence, dashboard orchestration,
and shared API plumbing belong to the other module owners.

## Commit checklist

- Keep frontend and backend transcript changes in the assigned directories.
- Include validation behavior in the change description.
- Avoid changing shared components when a transcript-local solution is enough.
- Confirm that empty, whitespace-only, and file-import inputs are handled
  consistently.
