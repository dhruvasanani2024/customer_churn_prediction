import { useState } from "react";
import axios from "axios";

function ChurnForm() {
  const [formData, setFormData] = useState({
    Monthly_Charges: "",
    API_Utilization_Rate: "",
    Total_Users: "",
    Tenure_Months: "",
    System_Error_Logs: "",
    Support_Tickets_Raised: "",
    Company_Size: "Startup",
    Late_Payment_Count: "",
    Industry: "Technology",
    Premium_Feature_Usage: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          Monthly_Charges: Number(formData.Monthly_Charges),
          API_Utilization_Rate: Number(formData.API_Utilization_Rate),
          Total_Users: Number(formData.Total_Users),
          Tenure_Months: Number(formData.Tenure_Months),
          System_Error_Logs: Number(formData.System_Error_Logs),
          Support_Tickets_Raised: Number(formData.Support_Tickets_Raised),
          Company_Size: formData.Company_Size,
          Late_Payment_Count: Number(formData.Late_Payment_Count),
          Industry: formData.Industry,
          Premium_Feature_Usage: Number(formData.Premium_Feature_Usage),
        }
      );

      setResult(response.data);

    } catch (error) {
      console.error(error);

      setResult({
        error: "Something went wrong while predicting."
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Company Churn Prediction</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="Monthly_Charges"
          placeholder="Monthly Charges"
          value={formData.Monthly_Charges}
          onChange={handleChange}
        />

        <input
          type="number"
          name="API_Utilization_Rate"
          placeholder="API Utilization Rate"
          value={formData.API_Utilization_Rate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="Total_Users"
          placeholder="Total Users"
          value={formData.Total_Users}
          onChange={handleChange}
        />

        <input
          type="number"
          name="Tenure_Months"
          placeholder="Tenure Months"
          value={formData.Tenure_Months}
          onChange={handleChange}
        />

        <input
          type="number"
          name="System_Error_Logs"
          placeholder="System Error Logs"
          value={formData.System_Error_Logs}
          onChange={handleChange}
        />

        <input
          type="number"
          name="Support_Tickets_Raised"
          placeholder="Support Tickets Raised"
          value={formData.Support_Tickets_Raised}
          onChange={handleChange}
        />

        <select
          name="Company_Size"
          value={formData.Company_Size}
          onChange={handleChange}
        >
          <option value="Startup">Startup</option>
          <option value="SMB">SMB</option>
          <option value="Enterprise">Enterprise</option>
        </select>

        <input
          type="number"
          name="Late_Payment_Count"
          placeholder="Late Payment Count"
          value={formData.Late_Payment_Count}
          onChange={handleChange}
        />

        <select
          name="Industry"
          value={formData.Industry}
          onChange={handleChange}
        >
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Technology">Technology</option>
        </select>

        <select
          name="Premium_Feature_Usage"
          value={formData.Premium_Feature_Usage}
          onChange={handleChange}
        >
          <option value={0}>No Premium Features</option>
          <option value={1}>Uses Premium Features</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Churn"}
        </button>

      </form>

      {result && (
        <div>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <h2>{result.prediction}</h2>

              <p>
                Churn Probability:{" "}
                {(result.churn_probability * 100).toFixed(2)}%
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ChurnForm;