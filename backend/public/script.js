async function uploadImage() {
    const fileInput = document.getElementById("imageInput");
    if (fileInput.files.length === 0) {
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    try {
        const response = await fetch("http://localhost:5000/imageAPI/v1/predict-image", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("imageResult").textContent = `Prediction: ${data.prediction || "Failed"}`;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("imageResult").textContent = "Error in prediction.";
    }
}

async function predictNews() {
    const newsText = document.getElementById("newsInput").value.trim();
    if (!newsText) {
        alert("Please enter news text.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/newsAPI/v1/predict-news", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newsText })
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Server Response:", data);

        // Ensure the response contains the prediction
        if (data.prediction) {
            document.getElementById("newsResult").textContent = `Prediction: ${data.prediction}`;
        } else {
            document.getElementById("newsResult").textContent = "Prediction failed.";
        }

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("newsResult").textContent = "Error in prediction.";
    }
}
