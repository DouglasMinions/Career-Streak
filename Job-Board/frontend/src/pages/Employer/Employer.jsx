import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { getMe, reset } from "../../features/auth/authSlice";
import backImage from "../../assets/images/employer-back.jpg";
import {
  createEmployer,
  getLoggedInEmployer,
  updateEmployer,
} from "../../features/employer/employerSlice";

const EmployerProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    location: "",
    description: "",
    website: "",
  });

  const authRedux = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.auth);
  const employerState = useSelector((state) => state.employer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (authRedux.user == null) {
      navigate("/login");
    }
    dispatch(reset());
  }, []);

  // Get user data
  useEffect(() => {
    dispatch(getMe());
    if (userState.user?.email) {
      setFormData((prev) => ({ ...prev, email: userState.user.email }));
    }
  }, [userState.isSuccess]);

  // Get employer data
  useEffect(() => {
    if (userState.user?.role === "employer") {
      dispatch(getLoggedInEmployer());
      if (employerState.employer) {
        setFormData((prev) => ({ ...prev, ...employerState.employer }));
      }
    }
  }, [employerState.isSuccess, userState.isSuccess]);

  // on change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submission
  const onSubmit = (e) => {
    e.preventDefault();
    toast("Updating Info...", { autoClose: 1000 });
    const { user } = userState;
    if (user.role === "user") {
      dispatch(createEmployer(formData));
    } else if (user.role === "employer") {
      dispatch(updateEmployer(formData));
    }
    dispatch(getMe());
  };

  return (
    <>
      <div
        className=" h-60 w-flex rounded-lg bg-center"
        style={{
          backgroundImage: `url(${backImage})`,
        }}
      >
        {/* <img
          className="relative bottom-6 right-1 h-14 w-14"
          // src={require("./logo.png")}
          alt="Card cap"
        /> */}
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center pt-10">
          <div className="bg-profile p-5">
            <label className="uppercase font-semibold text-lg">
              Employer Info
            </label>
            <div className="card card-50 ">
              <div className="flex items-center justify-between">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="E-mail"
                  className="bg-gray-200 inp"
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between">
                <label>Company</label>
                <input
                  className="inp"
                  type="text"
                  name="company"
                  value={formData.company}
                  placeholder="facebook"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label>Location</label>
                <input
                  className="inp"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  placeholder="Vancouver ,CANADA"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label>Description</label>
                <textarea
                  style={{ marginBottom: ".55rem" }}
                  className="inp"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  placeholder="Description Of Company"
                />
              </div>
              <div className="flex items-center justify-between">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={onChange}
                  placeholder="Social media"
                  className="inp"
                />
              </div>
              <button type="submit" className="btn">
                Submit
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmployerProfile;
