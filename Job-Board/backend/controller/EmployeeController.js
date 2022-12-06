const asyncHandler = require("express-async-handler");
const Employee = require("../models/Employee");
const User = require("../models/User");

// @desc    Get employee Data
// @route   GET /api/employee/id
// @access  Public
const getEmployee = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email }).select("-password");
  const employee = (await Employee.findOne({ _id: user.id })) || "";
  res.json({ user, employee });
});

// @desc    Get employee Data
// @route   POST /api/employee/id
// @access  Private
const postEmployee = asyncHandler(async (req, res) => {
  const email = req.user.email;
  const { name, address, phone, resume } = req.body;
  await User.updateOne({ email }, { name, address, phone });
  const qualifications = req.body && req.body.qualifications;
  const experiences = req.body && req.body.experiences;
  const employeeInfo = {
    userId: req.user._id,
    resume,
    qualifications,
    experiences,
  };

  const employee = await Employee.create(employeeInfo);

  // Update user role as employee
  await User.updateOne({ email }, { role: "employee" });
  const user = await User.findOne({ email }).select("-password");
  res.json({
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address,
    phone: user.phone,
    qualifications: employee.qualifications,
    resume: employee.resume,
    experiences: employee.experiences,
    appliedTo: employee.appliedTo,
  });
});

// @desc    Update employee Data
// @route   POST /api/employee/id
// @access  Private
const updateEmployee = asyncHandler(async (req, res) => {
  const { name, address, phone, resume, qualifications, experiences } =
    req.body;
  await User.updateOne({ email: req.user.email }, { name, address, phone });
  await Employee.updateOne(
    { userId: req.user._id },
    { resume, qualifications, experiences }
  );
  const employee = await Employee.findOne({ userId: req.user._id }).lean();
  res.json({ ...employee });
});

// @desc    Get logged in  employee Data
// @route   POST /api/employee/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findOne({ _id: userId }).select("-password");
  const employee = await Employee.findOne({ userId });
  res.json({ user: user, employee: employee });
});

// @desc    Delete employee
// @route   Delete /api/employee/id
// @access  Private
const deleteEmployee = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const message = await Employee.deleteOne({ _id });
  res.json(message);
});

// @desc Get All Employees
// @route Get /api/employee/all
// @acess Private
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.json({ employees });
});

module.exports = {
  getEmployee,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getMe,
};
