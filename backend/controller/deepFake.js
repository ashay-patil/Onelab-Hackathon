const path = require("path");
const { spawn } = require("child_process");

const predictImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded." });
    }

    const imagePath = path.resolve(__dirname, "../uploads", req.file.filename);
    const pythonScriptPath = path.resolve(__dirname, "../utils/predict_image.py");

    console.log(`Running Python script: ${pythonScriptPath}`);
    console.log(`Image path: ${imagePath}`);

    const pythonProcess = spawn("python", [pythonScriptPath, imagePath]);

    let prediction = "";
    let errorMessage = "";

    pythonProcess.stdout.on("data", (data) => {
        prediction += data.toString().trim();
        console.log("Raw Python Output:", prediction);
    });

    pythonProcess.stderr.on("data", (data) => {
        errorMessage += data.toString();
        console.error("Python Error Output:", errorMessage);
    });

    pythonProcess.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);

        if (prediction) {
            prediction = prediction.replace(/\s+/g, "");
            console.log("Final Prediction:", prediction);

            if (prediction === "Real" || prediction === "Fake") {
                res.status(200).json({ prediction });
                console.log('response Sent');
            } else {
                res.status(500).json({ error: "Invalid prediction format", details: prediction });
            }
        } else {
            res.status(500).json({ error: "Prediction failed", details: errorMessage });
        }
    });
};

module.exports = predictImage;
