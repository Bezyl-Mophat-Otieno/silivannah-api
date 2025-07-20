const path = require('path');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router();


// create uploads directory if not exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}   

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.send(`
    <p>✅ File uploaded successfully!</p>
    <p>File Name: ${req.file.filename}</p>
    <p>File Size: ${req.file.size} bytes</p>
    <p>File Type: ${req.file.mimetype}</p>
    <p>File Path: ${req.file.path}</p>
    <p>Available Actions:</p>
    <p><a href="/files/upload">Upload Another File</a></p>
    <p><a href="/files/view/${req.file.filename}">View Uploaded File</a></p>
    <p><a href="/files/list">List Uploaded Files</a></p>
    <p><a href="/files/delete/${req.file.filename}">Delete File</a></p>
    <p><a href="/">Go back</a></p>
  `);
}); 

// Route to display uploaded file
router.get('/view/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename
    );
    fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found' });
    }
    res.sendFile(filePath);
    });
});


// Route to list uploaded files
router.get('/list', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading directory', error: err });
    }
    const fileList = files.map(file => ({
      name: file,  
    }));
    res.status(200).json(fileList);
  });
});

// Route to delete a file
router.delete('/delete/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).json({ message: 'File not found', error: err });
    }
    res.status(200).json({ message: 'File deleted successfully' });
    });
});

module.exports = router;


    