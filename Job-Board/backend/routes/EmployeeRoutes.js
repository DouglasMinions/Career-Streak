const express = require("express");
const {
  getEmployee,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getMe,
} = require("../controller/EmployeeController");

const authenticate = require("../middleware/authenticate");
const {
  adminMiddleware,
  employeeMiddleware,
} = require("../middleware/roleMiddleware");
const router = express.Router();

router
  .route("/")
  .get(authenticate, getEmployee)
  .post(authenticate, postEmployee)
  .put(authenticate, updateEmployee);

router.route("/all").get(authenticate, getEmployees);

router.route("/:id").delete(authenticate, adminMiddleware, deleteEmployee);

router.route("/me").get(authenticate, getMe);

module.exports = router;
