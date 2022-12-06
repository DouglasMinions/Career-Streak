const mongoose = require("mongoose");

const JobPostSchema = mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
    },
    title: {
      type: String,
      required: [true, "Please provide job title"],
    },
    description: {
      type: String,
      required: [true, "Please provide job title"],
    },
    responsibilities: {
      type: String,
    },
    requirements: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Please provide job title"],
    },
    jobType: {
      type: String,
    },
    hiring: {
      type: Boolean,
      default: true,
    },
    website: {
      type: String,
    },
    appliedBy: {
      type: Array,
    },
    status: {
      type: String,
      default: "open",
    },
    candidateHired: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobPost", JobPostSchema);
