const employerMiddleware = (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role !== "employer") {
    res.status(403);
    throw new Error("Not Authenticated as Employer");
  }
  next();
};

const employeeMiddleware = (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role !== "employee") {
    res.status(403).send({ message: "Not Authenticated as Employee" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.role || req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not Authenticated as Admin");
  }
  next();
};

module.exports = { employerMiddleware, employeeMiddleware, adminMiddleware };
