const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Use memory storage instead of saving to uploads folder
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// serve frontend
app.use(express.static("public"));

// serve latest image
app.get("/latest.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "latest.jpg"));
});

// upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    // Write file directly as latest.jpg
    fs.writeFileSync("latest.jpg", req.file.buffer);

    res.send("Uploaded successfully");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
