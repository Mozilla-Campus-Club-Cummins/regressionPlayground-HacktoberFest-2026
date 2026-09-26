from pydantic import BaseModel, ConfigDict, Field, model_validator


class DataPoint(BaseModel):
    model_config = ConfigDict(extra="forbid")

    x: float = Field(allow_inf_nan=False)
    y: float = Field(allow_inf_nan=False)


class RegressionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    data: list[DataPoint] = Field(min_length=2, max_length=10000)

    @model_validator(mode="after")
    def require_distinct_x_values(self):
        if len({point.x for point in self.data}) < 2:
            raise ValueError("At least two distinct x values are required.")
        return self


class Prediction(BaseModel):
    x: float
    actual: float
    predicted: float
    residual: float


class RegressionResponse(BaseModel):
    slope: float
    intercept: float
    r2: float
    mse: float
    rmse: float
    mae: float
    predictions: list[Prediction]
