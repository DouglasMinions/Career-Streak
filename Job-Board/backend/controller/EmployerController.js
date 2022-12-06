const asyncHandler = require("express-async-handler");
const Employer = require("../models/Employer");
const User = require("../models/User");

// @desc    Get employer Data
// @route   GET /api/employer
// @access  Private
const getEmployersData = asyncHandler(async (req, res) => {
  const employers = await Employer.find();
  res.json({ employers });
});

// @desc    Get employer Data
// @route   GET /api/employer/id
// @access  Private
const getEmployerData = asyncHandler(async (req, res) => {
  const employers = await Employer.findById(req.params.id);
  res.json({ employers });
});

// @desc    Get LoggedIn employer Data
// @route   GET /api/employer/me
// @access  Private
const getLoggedInEmployerData = asyncHandler(async (req, res) => {
  const employer = await Employer.findOne({ userId: req.user._id });
  res.json(employer);
});

// @desc    Convery user to employer
// @route   Post /api/employer
// @access  Private
const createEmployer = asyncHandler(async (req, res) => {
  const { logo, company, location, description, website } = req.body;
  if (!company || !location) {
    res.status(400);
    throw new Error("Company Name and location are required");
  }

  const employer = await Employer.create({
    logo,
    userId: req.user._id,
    company,
    location,
    description,
    website,
  });

  if (!employer) {
    res.status(500).send({ message: "Error while creating employer" });
    return;
  }

  // update user role
  await User.updateOne({ email: req.user.email }, { role: "employer" });
  res.json(employer);
});

// @desc    Update job data
// @route   PUT /api/employer
// @access  Private
const updateEmployerData = asyncHandler(async (req, res) => {
  await Employer.updateOne({ userId: req.user._id }, { ...req.body });
  const updatedEmployer = await Employer.findOne({ userId: req.user._id });
  res.json(updatedEmployer);
});

// @desc    Delete user data
// @route   DEL /api/employer/id
// @access  Private
const deleteEmployerData = asyncHandler(async (req, res) => {
  const message = await Employer.deleteOne({ _id: req.params.id });
  res.json({ message });
});

// @desc    Get unapproved employers data
// @route   Get /api/employer/unapproved
// @access  Private
const getUnApprovedEmployers = asyncHandler(async (req, res) => {
  const message = await Employer.find({ adminApproval: false });
  res.json({ message });
});

// @desc    Update adminApproval
// @route   PUT /api/employer/id
// @access  Private
const updateEmployerWithId = asyncHandler(async (req, res) => {
  const updatedEmployer = await Employer.updateOne(
    { _id: req.params.id },
    req.body
  );
  res.json(updatedEmployer);
});

module.exports = {
  getEmployersData,
  getEmployerData,
  updateEmployerData,
  deleteEmployerData,
  getLoggedInEmployerData,
  createEmployer,
  getUnApprovedEmployers,
  updateEmployerWithId,
};
