from fastapi import FastAPI, Depends
import joblib
import pandas as pd 
from schemas import ChurnInput
from models import PredictionHistory
from sqlalchemy.orm import Session  
from database import get_db
from database import engine, Base
from models import PredictionHistory

app = FastAPI(title = "Customer Churn Prediction")

model = joblib.load("../Customer_Churn_model.pkl")

Base.metadata.create_all(bind=engine)

@app.get('/')
def home():
    return {
        "message" : "Company churn prediction API is running"
    }


@app.post("/predict")
def predict_churn(data : ChurnInput, db: Session = Depends(get_db)):
    input_data = pd.DataFrame([data.model_dump()])

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0][1]

    record = PredictionHistory(
        monthly_charges = data.Monthly_Charges,
        api_utilization_rate=data.API_Utilization_Rate,
        total_users=data.Total_Users,
        tenure_months=data.Tenure_Months,

        system_error_logs=data.System_Error_Logs,
        support_tickets_raised=data.Support_Tickets_Raised,

        company_size=data.Company_Size,
        late_payment_count=data.Late_Payment_Count,
        industry=data.Industry,
        premium_feature_usage=data.Premium_Feature_Usage,

        predicted_churn=int(prediction),
        churn_probability=float(probability)
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    if prediction == 1:
        result = "Customer will churn !!!!"
    else:
        result = "Customer will not churn "

    return {
        "prediction" : result,
        "churn_probability" : round(float(probability),4)
    }

