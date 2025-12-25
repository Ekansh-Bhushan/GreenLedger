const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const usageRoutes = require("./routes/usage");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usage", usageRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (_, res) => {
  res.send("GreenLedger API is running");
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
