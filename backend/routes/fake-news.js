const express = require('express');
const router = express.Router();

const predictNews = require('../controller/fake-news');
const authorize = require('../middleware/authorize');

router.post('/predict-news',authorize, predictNews);

module.exports = router;