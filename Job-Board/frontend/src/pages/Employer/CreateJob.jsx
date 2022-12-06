import "./style.css";
import { useState } from "react";
import background from "../../assets/images/employer-back.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInEmployer } from "../../features/employer/employerSlice";
import { createJob, reset } from "../../features/job/jobSlice";
import { ToastContainer, toast } from "react-toastify";

const CreateJob = () => {
  const initialForm = {
    title: "",
    location: "",
    jobType: "",
    description: "",
    requirements: "",
    responsibilities: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [btnText, setBtnText] = useState("Submit");
  const employerState = useSelector((state) => state.employer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInEmployer());
    if (!employerState?.employer?.adminApproval) {
      setBtnText("Waiting for Admin Approval");
    } else {
      setBtnText("Post Job");
    }
  }, [employerState.isSuccess]);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    toast("Creating Job Post", { autoClose: 200 });
    const { employer } = employerState;
    const jobData = {
      employerId: employer._id,
      company: employer.company,
      ...formData,
    };
    dispatch(createJob(jobData));
    dispatch(reset());
    setFormData(initialForm);
  };

  return (
    <>
      <div
        className=" h-60 w-flex bg-center"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <form onSubmit={onSubmit}>
        <div className="flex justify-center pt-10">
          <div className="bg-profile p-5">
            <label className="uppercase font-semibold text-lg">
              Create Job
            </label>
            <div className="card card-50 ">
              <div className="flex items-center justify-between">
                <label className="lbl">Job Role</label>
                <input
                  className="inp"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={onChange}
                  placeholder="Developer"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="lbl">Location</label>
                <input
                  className="inp"
                  type="text"
                  placeholder="Vancouver ,CANADA"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="lbl">Job Type</label>
                <input
                  type="text"
                  name="jobType"
                  placeholder="Full Time"
                  className="inp"
                  value={formData.jobType}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="lbl">Description</label>
                <textarea
                  className="inp"
                  type="text"
                  style={{ marginBottom: ".55rem" }}
                  placeholder="Description Of Job"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="lbl">Requirement</label>
                <textarea
                  type="text"
                  name="requirements"
                  placeholder="requirements"
                  className="inp"
                  style={{ marginBottom: ".55rem" }}
                  value={formData.requirements}
                  onChange={onChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="lbl">Responsibilities</label>
                <textarea
                  type="text"
                  style={{ marginBottom: ".55rem" }}
                  name="responsibilities"
                  placeholder="responsibilities"
                  className="inp"
                  value={formData.responsibilities}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <button
              style={{ margin: "8px" }}
              type="submit"
              className={
                employerState?.employer?.adminApproval
                  ? "btn"
                  : "btn btn-disabled"
              }
              disabled={employerState?.employer?.adminApproval ? false : true}
            >
              {btnText}
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateJob;
