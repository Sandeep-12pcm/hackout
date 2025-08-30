import React, { useState } from "react";
import axios from "axios";

const Predicted = () => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");

  // Example input data
  const inputData = [
    {
      Latitude: 12.34,
      Longitude: 56.78,
      Elevation: 100,
      Avg_Precipitation: 200,
      Coastal_Distance: 300,
      Historical_Floods: 1,
      Drainage_Capacity: 2,
    },
  ];

  const handlePredict = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/predict', inputData);
      setPredictions(res.data.predictions);
      setError("");
    } catch (err) {
      setError("Prediction error: " + err);
      setPredictions([]);
    }
  };

  return (
    <div>
      <button onClick={handlePredict}>Get Predictions</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {predictions.map((pred, idx) => (
          <li key={idx}>
            Prediction {idx + 1}: {pred}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Predicted;
