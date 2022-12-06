const mongoose = require("mongoose");

const employerSchema = mongoose.Schema(
  {
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    company: {
      type: String,
      required: [true, "Company Name is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    adminApproval: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employer", employerSchema);
