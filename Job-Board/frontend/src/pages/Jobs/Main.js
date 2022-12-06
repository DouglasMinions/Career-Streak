import React, { useEffect, useState } from "react";
import Job from "./Job";
import "./style.css";
import formattedInputDate from "../../config/dateFormatter";
import { getLoggedInEmployer } from "../../features/employer/employerSlice";
import { useSelector, useDispatch } from "react-redux";
import { getJobs, applyJob } from "../../features/job/jobSlice";
import {
  getEmpMe,
  updateEmployee,
} from "../../features/employee/employeeSlice";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const Main = () => {
  const jobState = useSelector((state) => state.job);
  const [jobPostings, setJobPostings] = useState([]);
  const userState = useSelector((state) => state.auth);
  const employeeState = useSelector((state) => state.employee);

  const dispatch = useDispatch();
  const [selectedJob, setSelectedJob] = useState();
  const [btnText, setBtnText] = useState("Apply Now");

  const onJobClick = (index) => {
    setSelectedJob(jobPostings[index]);
    if (userState.user?.role === "employer") return;
    const { employee } = employeeState;
    jobPostings[index].appliedBy.includes(employee?._id)
      ? setBtnText("Application Sent")
      : setBtnText("Apply Now");
  };

  const onApply = () => {
    if (userState.user == null) {
      toast("You need to log in first");
      return;
    }
    if (userState.user?.role !== "employee") {
      toast("Only job searchers can apply");
      return;
    }
    const { employee } = employeeState;
    if (!employee) return;
    dispatch(applyJob({ id: selectedJob._id, empId: employee._id }));
    const updatedEmp = {
      ...employeeState.employee,
      appliedTo: [...employeeState.employee.appliedTo, selectedJob._id],
    };
    dispatch(updateEmployee(updatedEmp));
    setBtnText("Application Sent");
  };

  // get jobs
  useEffect(() => {
    dispatch(getJobs());
    if (jobState.jobPostings) {
      setJobPostings(jobState.jobPostings);
    }
  }, [jobState.isSuccess]);

  useEffect(() => {
    if (userState.user?.role === "employee" && !employeeState.employee) {
      dispatch(getEmpMe());
    } else if (userState.user?.role === "employer") {
      dispatch(getLoggedInEmployer());
    }
  }, [userState.isSuccess]);

  if (jobState.isLoading || !jobPostings) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-row bg-color-slate">
      <div className="basis-1/4  overflow-auto hover:overflow-scroll h-screen">
        {jobPostings?.map((job, index) => (
          <Job key={job._id} job={job} click={() => onJobClick(index)} />
        ))}
      </div>

      {selectedJob && (
        <div className="basis-3/4 overflow-auto hover:overflow-scroll h-screen bg-white">
          <div className="rounded-md m-3 bg-white border-2 p-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
              className="rounded-md h-12 w-12 m-5"
              alt="job"
            />
            <h4 className="sub-heading">{selectedJob.title}</h4>
            <h3 className="sub-heading">{selectedJob.company}</h3>
            <p className="text-gray-600">
              Published on: {formattedInputDate(selectedJob.createdAt)}
            </p>
            <button
              className="btn-app"
              onClick={onApply}
              disabled={btnText === "Application Sent"}
            >
              {btnText}
            </button>
          </div>
          <div className="p-4">
            <div>
              <p className="sub-heading">Employent Type</p>
              <h3 className="text-gray-600">{selectedJob.jobType}</h3>
            </div>
            <div>
              <p className="sub-heading">Description</p>
              <h3 className="text-gray-600">{selectedJob.description}</h3>
            </div>
            <div>
              <p className="sub-heading">Responsibility</p>
              <h3 className="text-gray-600">{selectedJob.responsibilities}</h3>
            </div>
            <div>
              <p className="sub-heading">Requirement</p>
              <h3 className="text-gray-600">{selectedJob.requirements}</h3>
            </div>
            <div className="mb-10">
              <p className="sub-heading">Hiring Status</p>
              <h3 className="text-yellow-900 ">
                {selectedJob?.hiring
                  ? "Yes we are hiring for our team"
                  : "No our hiring application is full but you can apply "}
              </h3>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Main;
