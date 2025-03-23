import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import './DetectNews.css';
const DetectNews = () => {
    const { user } = useOutletContext();
    const [newsText, setNewsText] = useState("");
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle news text input change
    const handleInputChange = (e) => {
        setNewsText(e.target.value);
    };

    // Handle predict button click
    const handlePredict = async () => {
        if (!newsText.trim()) {
            alert("Please enter some news text to predict.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setPrediction("");

            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/newsAPI/v1/predict-news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newsText }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Prediction failed");
            }

            alert("Prediction successful!");
            setPrediction(data.prediction);

        } catch (err) {
            console.error("Error predicting news:", err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="detect-news-container">
            <h2>Detect News</h2>

            <div>
                <label htmlFor="newsInput">Enter News Text:</label>
                <textarea
                    id="newsInput"
                    value={newsText}
                    onChange={handleInputChange}
                    placeholder="Paste the news content here..."
                    rows="6"
                    cols="50"
                />
            </div>

            <button onClick={handlePredict} disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {prediction && (
                <div>
                    <h3>Prediction Result:</h3>
                    <p>{prediction === "Real" ? "✅ This news is Real" : "❌ This news is Fake"}</p>
                </div>
            )}
        </div>
    );
};

export default DetectNews;
