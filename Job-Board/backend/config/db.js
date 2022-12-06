const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => console.log("CareerStreaks DB connected"))
    .catch((err) => console.error("Error while connecting DB " + err));
}

module.exports = connectDB;
