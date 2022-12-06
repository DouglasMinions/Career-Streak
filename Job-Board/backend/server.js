require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Career Streaks Backend</h1>");
});

app.use("/api/auth", require("./routes/Auth.js"));
app.use("/api/employee", require("./routes/EmployeeRoutes.js"));
app.use("/api/jobs", require("./routes/JobPostRoutes.js"));
app.use("/api/employer", require("./routes/EmployerRoutes"));
app.use("/api/upload", require("./config/upload"));

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
