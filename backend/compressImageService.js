const sharp = require('sharp');
const multer = require('multer');
const express = require('express');

const router = express.Router();
const upload = multer();

router.post('/compress', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
      const { buffer } = req.file;
      // Adjust sharp options as needed
      const outputBuffer = await sharp(buffer).webp({ quality: 75 }).toBuffer();
      res.status(200).send(outputBuffer);
    } catch (err) {
      res.status(500).send('Failed to compress image');
    }
});

module.exports = router;
