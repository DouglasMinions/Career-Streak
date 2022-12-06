const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  school: {
    type: String,
  },
  course: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
});

const employeeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  resume: {
    type: String,
    require: [true, "Resume is required"],
  },
  qualifications: [qualificationSchema],
  experiences: [experienceSchema],
  appliedTo: {
    type: Array,
  },
  currentJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
