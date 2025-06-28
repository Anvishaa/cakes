const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const cakesDir = path.join(__dirname, "public/cakes");

// Get all category folder names
app.get("/api/categories", (req, res) => {
  fs.readdir(cakesDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Can't read categories" });
    const categories = files.filter(file =>
      fs.statSync(path.join(cakesDir, file)).isDirectory()
    );
    res.json(categories);
  });
});

// Get all images (except wall.jpg) from a category
app.get("/api/categories/:category/images", (req, res) => {
  const category = req.params.category;
  const categoryPath = path.join(cakesDir, category);
  fs.readdir(categoryPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Can't read category images" });
    const images = files
      .filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f) && f !== "wall.jpg")
      .map(f => `/cakes/${category}/${f}`);
    res.json(images);
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


