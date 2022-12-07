const asyncHandler = require("express-async-handler");
const JobPost = require("../models/JobPost");
const Employee = require("../models/Employee");
const User = require("../models/User");

// @desc    Get jobs posts
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const jobPosts = await JobPost.find().sort({ createdAt: -1 });
  res.json(jobPosts);
});

// @desc    Get jobs posts
// @route   GET /api/jobs/id
// @access  Public
const getJob = asyncHandler(async (req, res) => {
  const jobPost = await JobPost.findOne({ _id: req.params.id }).select(
    "-appliedBy"
  );
  res.json(jobPost);
});

// @desc    Get Open jobs posts
// @route   GET /api/jobs
// @access  Public
const getOpenJobs = asyncHandler(async (req, res) => {
  const jobPosts = await JobPost.find({ employerId: req.params?.id }).sort({
    createdAt: -1,
  });
  const jobApplicants = await Promise.all(
    jobPosts.map(async (post) => {
      // get employees
      const employees = await Employee.find({
        _id: { $in: post.appliedBy },
      });

      // get user
      const applicants = await Promise.all(
        employees.map(async (employee) => {
          const user = await User.findById(employee.userId).select("-password");
          return { employee, user };
        })
      );

      return { ...post?._doc, applicants };
    })
  );

  res.json(jobApplicants);
});

// @desc    Post job data
// @route   Post /api/jobs
// @access  Private
const postJobs = asyncHandler(async (req, res) => {
  const {
    title,
    company,
    description,
    responsibilities,
    requirements,
    location,
    jobType,
    hiring,
  } = req.body;
  if (!title || !company || !description || !location) {
    res.status(422);
    throw new Error("Please provide all required fields");
  }

  const jobPost = await JobPost.create({
    title,
    company,
    description,
    responsibilities,
    requirements,
    location,
    jobType,
    hiring,
    employerId: req.user._id,
  });
  if (!jobPost) {
    res.status(500);
    throw new Error("Server error while creating job post");
  }

  const jobPosts = await JobPost.find().sort({ createdAt: -1 });
  res.status(201).json(jobPosts);
});

// @desc    Update job data
// @route   PUT /api/jobs/id
// @access  Private
const updateJobs = asyncHandler(async (req, res) => {
  const jobPost = await JobPost.findById(req.params.id);
  if (!jobPost) {
    res.status(400);
    throw new Error("No job with this Id");
  }

  await JobPost.updateOne({ id: req.params.id }, { ...req.body });
  const updatedJobPost = await JobPost.findById(req.params.id);
  res.json(updatedJobPost);
});

// @desc    Delete user data
// @route   DEL /api/jobs/id
// @access  Private
const applyJob = asyncHandler(async (req, res) => {
  const jobPost = await JobPost.findById(req.body.id);
  if (!jobPost) {
    res.status(400);
    throw new Error("No job with this Id");
  }

  await JobPost.updateOne(
    { _id: req.body.id },
    { appliedBy: [...jobPost.appliedBy, req.body.empId] }
  );
  const updatedJobPost = await JobPost.findById(req.params.id);
  res.json(updatedJobPost);
});

// @desc    Delete user data
// @route   DEL /api/jobs/id
// @access  Private
const deleteJobs = asyncHandler(async (req, res) => {
  await JobPost.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Success" });
});

// @desc    Hire employee for job
// @route   PUT /api/jobs/hire
// @access  Private
const hireForJob = asyncHandler(async (req, res) => {
  const { jobId, applicantId } = req.body;
  await JobPost.updateOne(
    { _id: jobId },
    { candidateHired: applicantId, hiring: false }
  );
  await Employee.updateOne({ _id: applicantId }, { currentJob: jobId });
  res.status(200).json({ message: "Success" });
});

module.exports = {
  getJobs,
  postJobs,
  updateJobs,
  deleteJobs,
  applyJob,
  getOpenJobs,
  hireForJob,
  getJob,
};
