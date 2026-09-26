# Contributor Notes

- Keep the regression fitting implementation in `backend/models/regression.py` and decision-threshold behavior in the frontend. Do not fold threshold labels into the regression API.
- Add focused tests for calculation, validation, and user-facing behavior changes.
- Start the API from `backend/` with `uvicorn main:app --reload`; run tests there with `python -m pytest -q`.
- Start the frontend from `frontend/` with `npm run dev`; validate changes with `npm run build`.
- Prefer beginner-readable modules and avoid adding infrastructure or dependencies without a clear need.
