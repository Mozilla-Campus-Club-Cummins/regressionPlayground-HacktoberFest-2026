# Contributing

Thanks for helping make Regression Playground a clearer place to learn. Small, focused contributions are welcome, including documentation, accessibility fixes, tests, visualizations, and new model or decision strategies.

## Before you start

- Search existing discussions and issues to avoid duplicating work.
- For a substantial change, open a feature request first to agree on scope.
- Do not assume an issue number exists; refer to an issue only after it has been created.

## Development setup

Follow the local setup in [README.md](README.md). Run the backend tests with `python -m pytest -q` from `backend/` and create a frontend production build with `npm run build` from `frontend/`.

## Pull requests

- Keep changes focused and explain the user-visible behavior in the PR description.
- Add or update tests for behavior changes.
- Keep regression fitting separate from threshold and decision logic.
- Include screenshots for user-interface changes when practical.
- Check that uploaded data and error states remain understandable.

Use the pull request template and describe any checks you ran. Be kind, curious, and constructive in review.
