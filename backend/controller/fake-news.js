const { spawn } = require('child_process');
const path = require('path');

const predictNews = (req, res) => {
    const { newsText } = req.body;
    const {userId} = req.user;
    if (!newsText) {
        return res.status(400).json({ error: "News text is required" });
    }

    // Get the absolute path to the Python script
    const scriptPath = path.join(__dirname, '../utils/predict_news.py');

    // Call Python script
    const pythonProcess = spawn('python', [scriptPath, newsText]);

    pythonProcess.stdout.on('data', (data) => {
        const prediction = data.toString().trim();
        res.json({ prediction });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = predictNews;
