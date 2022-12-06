const express = require("express");
const authenticate = require("../middleware/authenticate");
const {
  employerMiddleware,
  adminMiddleware,
} = require("../middleware/roleMiddleware");
const {
  getEmployersData,
  getEmployerData,
  getLoggedInEmployerData,
  updateEmployerData,
  deleteEmployerData,
  createEmployer,
  getUnApprovedEmployers,
  updateEmployerWithId,
} = require("../controller/EmployerController");

const router = express.Router();

router
  .route("/")
  .get(authenticate, getEmployersData)
  .post(authenticate, createEmployer)
  .put(authenticate, employerMiddleware, updateEmployerData);

router
  .route("/me")
  .get(authenticate, employerMiddleware, getLoggedInEmployerData);

router
  .route("/unapproved")
  .get(authenticate, adminMiddleware, getUnApprovedEmployers);

router
  .route("/:id")
  .get(authenticate, getEmployerData)
  .put(authenticate, adminMiddleware, updateEmployerWithId)
  .delete(authenticate, employerMiddleware, deleteEmployerData);

module.exports = router;
