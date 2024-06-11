const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config(); // This will look for a .env file in the root of your project

console.log(process.env); // Debugging line to check loaded environment variables

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const profileRoutes = require("./routes/profileRoutes");

app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
if (!mongoUrl) {
  console.error("MongoDB URL is not defined");
  process.exit(1);
}

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb connected..."))
  .catch((err) => {
    console.error("Mongodb connection error:", err);
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/profile", profileRoutes);

app.use(express.static(path.resolve(__dirname, "../frontend/public")));

// Serve the index.html file for any other routes
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/public/index.html"))
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend is running on port ${port}`);
});

module.exports = app;
