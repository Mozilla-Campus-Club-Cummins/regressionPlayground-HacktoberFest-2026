from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas.regression import RegressionRequest, RegressionResponse
from services.regression_service import analyze_dataset

app = FastAPI(
    title="Regression Playground API",
    description="A small API for exploring simple linear regression.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/regression", response_model=RegressionResponse)
def run_regression(request: RegressionRequest) -> RegressionResponse:
    result = analyze_dataset([point.model_dump() for point in request.data])
    return RegressionResponse(**result.__dict__)
