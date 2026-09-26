import pytest
from fastapi.testclient import TestClient

from main import app
from models.regression import fit_simple_linear_regression

client = TestClient(app)


def test_perfect_line_has_expected_coefficients_and_metrics():
    result = fit_simple_linear_regression(
        [{"x": 1, "y": 5}, {"x": 2, "y": 8}, {"x": 3, "y": 11}]
    )

    assert result.slope == pytest.approx(3)
    assert result.intercept == pytest.approx(2)
    assert result.r2 == pytest.approx(1)
    assert result.mse == pytest.approx(0)
    assert result.rmse == pytest.approx(0)
    assert result.mae == pytest.approx(0)
    assert [row["predicted"] for row in result.predictions] == pytest.approx(
        [5, 8, 11]
    )


def test_noisy_data_reports_residual_metrics():
    result = fit_simple_linear_regression(
        [{"x": 1, "y": 2}, {"x": 2, "y": 4}, {"x": 3, "y": 5}]
    )

    assert result.mse > 0
    assert result.rmse == pytest.approx(result.mse**0.5)
    assert result.mae > 0
    assert all("residual" in row for row in result.predictions)


def test_api_returns_model_predictions_without_decision_threshold():
    response = client.post(
        "/api/regression",
        json={"data": [{"x": 1, "y": 5}, {"x": 2, "y": 8}]},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["slope"] == pytest.approx(3)
    assert len(payload["predictions"]) == 2
    assert "threshold" not in payload
    assert "decision" not in payload["predictions"][0]


@pytest.mark.parametrize(
    "data",
    [
        [],
        [{"x": 1, "y": 2}],
        [{"x": 1, "y": 2}, {"x": 1, "y": 3}],
        [{"x": "nope", "y": 2}, {"x": 2, "y": 3}],
        [{"x": 1, "y": 2, "z": 3}, {"x": 2, "y": 3}],
    ],
)
def test_api_rejects_invalid_datasets(data):
    response = client.post("/api/regression", json={"data": data})
    assert response.status_code == 422
