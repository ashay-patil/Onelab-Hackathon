import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const DetectImage = () => {
    const { user } = useOutletContext();
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle image selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    // Handle image prediction
    const handlePredict = async () => {
        if (!image) {
            alert("Please upload an image before predicting.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setPrediction("");

            const formData = new FormData();
            formData.append("image", image);

            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:5000/imageAPI/v1/predict-image", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Prediction failed");
            }

            alert("Prediction successful!");
            setPrediction(data.prediction);

        } catch (err) {
            console.error("Error predicting image:", err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Detect Image</h2>

            <div>
                <label htmlFor="imageUpload">Upload Image:</label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <button onClick={handlePredict} disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {prediction && (
                <div>
                    <h3>Prediction Result:</h3>
                    <p>{prediction === "Real" ? "✅ This image is Real" : "❌ This image is Fake"}</p>
                </div>
            )}
        </div>
    );
};

export default DetectImage;
