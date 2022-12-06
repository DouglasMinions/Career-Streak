import { useLocation } from "react-router-dom";
import axios from "axios";
import getOptions from "../../utils/options";
import { useState } from "react";

const EmployeeView = (props) => {
  const { applicant, job } = useLocation().state;
  const [btnText, setBtnText] = useState("Hire");

  const onHire = (e) => {
    e.preventDefault();
    axios.put(
      "http://localhost:5000/api/jobs/hire",
      { applicantId: applicant.employee._id, jobId: job._id },
      getOptions()
    );
    setBtnText("Hired");
  };

  return (
    <div className="container py-12 px-6 h-full ">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-slate-200 p-5 ">
        <form>
          <div className="grid grid-cols-3 gap-4">
            <div className="form-group mb-6">
              <label className="form-label inline-block mb-2 text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
rounded"
                value={applicant.user.name}
                readOnly
              />
            </div>
            <div className="form-group mb-6">
              <label className="form-label inline-block mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
rounded"
                value={applicant.user.email}
                readOnly
              />
            </div>
            <div className="form-group mb-6">
              <label className="form-label inline-block mb-2 text-gray-700">
                Phone
              </label>
              <input
                type="phone"
                className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
rounded"
                value={applicant.user.phone}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5>Qualifications</h5>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-6">School</th>
                    <th className="py-3 px-6">Course</th>
                  </tr>
                </thead>
                <tbody>
                  {applicant.employee.qualifications.map((qualification) => (
                    <tr
                      key={qualification._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {qualification.school}
                      </th>
                      <td className="py-4 px-6">{qualification.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h5>Experiences</h5>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-6">Comapny</th>
                    <th className="py-3 px-6">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {applicant.employee.experiences.map((experience) => (
                    <tr
                      key={experience._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {experience.company}
                      </th>
                      <td className="py-4 px-6">{experience.position}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-3">
            <button onClick={(e) => onHire(e)} className="btn">
              {btnText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeView;
