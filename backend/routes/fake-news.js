const express = require('express');
const router = express.Router();

const predictNews = require('../controller/fake-news');


router.route('/predict-news').post(predictNews);

module.exports = router;