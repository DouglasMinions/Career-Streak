import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset as authReset, getMe } from "../features/auth/authSlice";
import { reset as employeeStateReset } from "../features/employee/employeeSlice";
import { reset as employerStateReset } from "../features/employer/employerSlice";
import { reset as jobStateReset } from "../features/job/jobSlice";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess } = useSelector((state) => state.auth);
  const employerState = useSelector((state) => state.employer);
  const employeeState = useSelector((state) => state.employee);

  const onLogout = () => {
    localStorage.removeItem("user");
    dispatch(authReset());
    dispatch(employeeStateReset());
    dispatch(employerStateReset());
    dispatch(jobStateReset());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getMe());
  }, [isSuccess]);

  return (
    <nav className="py-5 bg-gray-900 text-white">
      <ul className="flex justify-between px-10">
        <span className="flex">
          <li className="mr-5">
            <Link to="/">Home</Link>
          </li>
          <li className="mr-5">
            <Link to="/jobs">Jobs</Link>
          </li>
          {(user?.role === "employer" ||
            (employerState.employer != null && user?.role !== "admin")) && (
            <li>
              <Link to="/create-job" className="mr-5">
                Post Job
              </Link>
              <Link to="/job-review" className="mr-5">
                Review Jobs
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link to="/approval/employers" className="mr-5">
                Employer Approvals
              </Link>
            </li>
          )}
          {(user?.role === "employee" || employeeState.employee) && (
            <li>
              <Link to="/updates" className="mr-5">
                Updates
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/analytics" className="mr-5">
                Analytics
              </Link>
            </li>
          )}
          <li className="mr-5">
            <a
              href="https://private-chat.onrender.com/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat
            </a>
          </li>
        </span>

        {!user ? (
          <span className="flex">
            <li className="mr-5">
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </span>
        ) : (
          <span className="flex">
            <li className="mr-5">
              {user.role === "user" && <Link to="/">Profile</Link>}
              {user.role === "employee" && <Link to="/employee">Profile</Link>}
              {user.role === "employer" && <Link to="/employer">Profile</Link>}
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </span>
        )}
      </ul>
    </nav>
  );
};

export default Header;
