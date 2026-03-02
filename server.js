const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// create uploads folder if not exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const upload = multer({ dest: "uploads/" });

// serve frontend
app.use(express.static("public"));

// serve latest image
app.get("/latest.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "latest.jpg"));
});

// upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {

    fs.copyFileSync(req.file.path, "latest.jpg");

    fs.unlinkSync(req.file.path);

    res.send("Uploaded successfully");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
