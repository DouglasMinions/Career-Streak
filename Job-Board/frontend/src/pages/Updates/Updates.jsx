import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmpMe } from "../../features/employee/employeeSlice";
import getOptions from "../../utils/options";

const Updates = () => {
  const [job, setJob] = useState({});
  const employeeState = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const getHiredJob = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/jobs/current/${employeeState.employee.currentJob}`,
      getOptions()
    );

    setJob((prev) => ({ ...prev, ...response.data }));
  };

  useEffect(() => {
    if (employeeState.employee == null) {
      dispatch(getEmpMe);
    }
    if (employeeState.employee?.currentJob) {
      getHiredJob();
    }
  }, [employeeState.isSuccess]);

  if (Object.keys(job).length === 0) {
    return <div>No Updates</div>;
  }

  return (
    <div className="container py-6 px-6 h-full ">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg bg-slate-200 p-5 ">
        <div className="text-center">
          <h1 className="text-xl">Congratulations, You got hired</h1>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg  content-center m-3 ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py- px-2">
                  Employer
                </th>
                <th scope="col" className="py-3 px-6">
                  {job.company}
                </th>
              </tr>
              <tr>
                <th scope="col" className="py- px-2">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  {job.title}
                </th>
              </tr>
              <tr>
                <th scope="col" className="py- px-2">
                  Description
                </th>
                <th scope="col" className="py-3 px-6">
                  {job.description}
                </th>
              </tr>
              <tr>
                <th scope="col" className="py- px-2">
                  Responsibilities
                </th>
                <th scope="col" className="py-3 px-6">
                  {job.responsibilities}
                </th>
              </tr>
              <tr>
                <th scope="col" className="py- px-2">
                  Location
                </th>
                <th scope="col" className="py-3 px-6">
                  {job.location}
                </th>
              </tr>
              <tr>
                <th scope="col" className="py- px-2">
                  Job Type
                </th>
                <th scope="col" className="py-3 px-6">
                  {job.jobType}
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Updates;
