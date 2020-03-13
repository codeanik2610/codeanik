const router = require('express').Router();
const sliderRouter = require('./slider.router');

router.use('/tesseract', sliderRouter);

module.exports = router;
