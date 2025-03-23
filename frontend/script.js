const uploadImage_ = async (e) => {
    e.preventDefault(); // Ensure form submission is prevented

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
};

const predictNews_ = async (e) => {
    e.preventDefault(); // Ensure form submission is prevented

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

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("newsResult").textContent = `Prediction: ${data.prediction || "Failed"}`;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("newsResult").textContent = "Error in prediction.";
    }
};

// Add event listeners
document.getElementById('imgbtn').addEventListener('click', uploadImage_);
document.getElementById('newsbtn').addEventListener('click', predictNews_);
