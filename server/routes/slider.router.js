const router = require('express').Router();
const https = require('https');
const download = require('image-downloader');
const path = require('path');
const { createWorker } = require('tesseract.js');
router.get('/', (req, res) => {
  res.send('anik');
});

router.post('/getcode', (req, res) => {
  const resObj = {
    status: 200,
    imagePath: ''
  };
  try {
    let fullUrl = req.body.url;
    const options = {
      url: fullUrl,
      dest: './server/images/'
    };
    download
      .image(options)
      .then(({ filename, image }) => {
        resObj.imagePath = filename;
        res.send(resObj);
      })
      .catch(err => {
        resObj.status = 500;
        resObj.imagePath = '';
        res.send(resObj);
      });
  } catch (error) {
    resObj.status = 500;
    resObj.imagePath = '';
    res.send(resObj);
  }
});

router.post('/getQrcode', (req, res) => {
  const resObj = {
    status: 200,
    qrCode: ''
  };
  const image = path.resolve(__dirname, '../../' + req.body.url);
  const worker = createWorker();
  try {
    if (req.body.url !== '') {
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {
          data: { text }
        } = await worker.recognize(image);
        resObj.qrCode = text;
        res.send(resObj);
        await worker.terminate();
      })();
    } else {
      resObj.status = 500;
      res.send(resObj);
    }
  } catch (err) {
    resObj.status = 500;
    res.send(resObj);
  }
});

module.exports = router;
