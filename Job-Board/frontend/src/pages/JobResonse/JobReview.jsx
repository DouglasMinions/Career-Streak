import "./style.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOpenJobs } from "../../features/job/jobSlice";
import { getLoggedInEmployer } from "../../features/employer/employerSlice";

const JobReview = () => {
  const employerState = useSelector((state) => state.employer);
  const jobState = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employerState.employer == null) {
      dispatch(getLoggedInEmployer());
    }
    if (employerState.employer) {
      dispatch(getOpenJobs({ empId: employerState.employer?.userId }));
    }
  }, [employerState.isSuccess]);

  return (
    <>
      <div className="container py-12 px-6 h-full">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Job</th>
                <th className="py-3 px-6">Applicants</th>
                <th className="py-3 px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobState.jobPostings?.map((job) => (
                <tr
                  key={job._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {job.title}
                  </th>
                  <td className="py-4 px-6">
                    {job.applicants?.map((applicant) => (
                      <>
                        <Link
                          to="/employee/each"
                          state={{ applicant, job }}
                          className="text-blue-600"
                        >
                          {applicant.user.name}
                        </Link>
                        <br />
                      </>
                    ))}
                  </td>
                  <td className="py-4 px-6">
                    {job.status === "open" ? "Hiring" : "Hired"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {jobState.jobPostings.length ? (
        ""
      ) : (
        <h1 className="text-center">No One Applied</h1>
      )}
    </>
  );
};

export default JobReview;
