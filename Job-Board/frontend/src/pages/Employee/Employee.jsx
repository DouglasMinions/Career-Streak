import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Experience from "./Experience";
import Qualification from "./Qualification";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../features/auth/authSlice";
import {
  getEmpMe,
  createEmployee,
  updateEmployee,
} from "../../features/employee/employeeSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";
import Personal from "./Personal";
import { Navigate } from "react-router-dom";

const Employee = () => {
  const initialQualifictaion = {
    school: "",
    startDate: "",
    endDate: "",
    course: "",
  };

  const initialExperience = {
    company: "",
    startDate: "",
    endDate: "",
    position: "",
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    resume: "",
    qualifications: [initialQualifictaion],
    experiences: [initialExperience],
  });

  const authRedux = useSelector((state) => state.auth);
  const employeeRedux = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const resumeData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (authRedux.user == null) {
      navigate("/login");
    }
    if (authRedux?.user?.role === "employee") {
      dispatch(getEmpMe());
    }
  }, []);

  useEffect(() => {
    if (authRedux.user?.role === "user") {
      setFormData({ ...formData, ...authRedux.user });
    } else if (authRedux.user?.role === "employee") {
      setFormData((prev) => ({
        ...prev,
        ...employeeRedux.employee,
      }));
    }
  }, [authRedux.isSuccess, employeeRedux.isSuccess, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClick = () => toast("Updating Info");

  // on qualification add
  const onQualifiationAdd = () => {
    setFormData({
      ...formData,
      qualifications: [...formData.qualifications, initialQualifictaion],
    });
  };

  // on Expericen Add click
  const onExperienceAdd = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, initialExperience],
    });
  };

  // resume upload
  const uploadResume = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/upload/resume",
      resumeData
    );
    setFormData({ ...formData, resume: response.data.path });
  };

  // handle form submission as per role
  const submission = () => {
    if (authRedux?.user?.role === "user") {
      dispatch(createEmployee(formData));
    } else if (authRedux?.user?.role === "employee") {
      dispatch(updateEmployee({ userId: authRedux.user._id, ...formData }));
    }
    dispatch(getMe());
  };

  // useEffect(() => {
  //   if (resumeData.has("file")) {
  //     uploadResume();
  //   }
  // }, [formData.resume]);

  // on form submit
  const onSubmit = (e) => {
    e.preventDefault();
    submission();
  };

  return (
    <div className="bg-color-slate">
      <div className="flex justify-center pt-10">
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <Personal
            formData={formData}
            onChange={onChange}
            resumeData={resumeData}
            uploadResume={uploadResume}
          />

          {/* Qualifications Start here */}
          <div className="bg-profile pb-1 pt-5 mt-10">
            <label className="header">Qualification</label>
            {formData.qualifications.map((qualifiction, i) => (
              <Qualification
                key={i}
                index={i}
                formData={formData}
                setFormData={setFormData}
                qualification={qualifiction}
              />
            ))}
            <button
              type="button"
              className="btn mb-2"
              onClick={onQualifiationAdd}
            >
              Add More
            </button>
          </div>

          {/* Experience */}
          <div className="bg-profile pb-1 pt-5 mt-10">
            <label className="header">Experiences</label>
            {formData.experiences.map((experience, i) => (
              <Experience
                key={i}
                index={i}
                experience={experience}
                setFormData={setFormData}
                formData={formData}
              />
            ))}
            <button
              type="button"
              className="btn mb-2"
              onClick={onExperienceAdd}
            >
              Add More
            </button>
          </div>
          <button
            type="submit"
            onClick={onClick}
            className="my-5  text-blue-600 font-semibold hover:text-white
         py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Employee;
