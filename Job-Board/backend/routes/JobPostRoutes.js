const express = require("express");
const authenticate = require("../middleware/authenticate");
const {
  employerMiddleware,
  adminMiddleware,
  employeeMiddleware,
} = require("../middleware/roleMiddleware");

const {
  getJob,
  getJobs,
  postJobs,
  updateJobs,
  deleteJobs,
  applyJob,
  hireForJob,
  getOpenJobs,
} = require("../controller/JobPostController");

const router = express.Router();

router.route("/").get(getJobs).post(authenticate, employerMiddleware, postJobs);
router.route("/apply").put(authenticate, employeeMiddleware, applyJob);
router.route("/hire").put(authenticate, hireForJob);
router.route("/current/:id").get(authenticate, getJob);
router
  .route("/:id")
  .get(getOpenJobs)
  .put(authenticate, employerMiddleware, updateJobs)
  .delete(authenticate, adminMiddleware, deleteJobs);

module.exports = router;
