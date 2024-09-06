const imageUrls = require("./asset.js");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const compression = require("compression");
app.use(compression());
app.use(cors());

// Generate a large dataset
const generateItems = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
    imageUrl: imageUrls[i % 10], // Cycle through the 10 images
  }));
};

const items = generateItems(10000);

app.get("/api/items", (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const stop = parseInt(req.query.stop) || 50;

  // Simulate network delay
  setTimeout(() => {
    res.json(items.slice(start, stop));
  }, 300);
});
console.log(imageUrls.length)
app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
