from sqlalchemy import Column, Integer, Float, String, DateTime
from datetime import datetime, timezone

from database import Base

class PredictionHistory(Base):

    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key = True, index = True)

    monthly_charges = Column(Float)
    api_utilization_rate= Column(Float)
    total_users= Column(Integer)
    tenure_months= Column(Integer)
    system_error_logs= Column(Integer)
    support_tickets_raised= Column(Integer)
    company_size = Column(String)
    late_payment_count= Column(Integer)
    industry= Column(String)
    premium_feature_usage = Column(Integer)

    predicted_churn = Column(Integer)
    churn_probability = Column(Float)
    actual_churn = Column(Integer, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


