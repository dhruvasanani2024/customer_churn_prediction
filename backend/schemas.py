from pydantic import BaseModel

class ChurnInput(BaseModel):
    Monthly_Charges : float
    API_Utilization_Rate: float
    Total_Users: int
    Tenure_Months: int
    System_Error_Logs: int
    Support_Tickets_Raised: int
    Company_Size : str
    Late_Payment_Count: int
    Industry: str
    Premium_Feature_Usage : int

