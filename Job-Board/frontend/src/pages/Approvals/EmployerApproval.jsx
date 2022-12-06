import { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnApprovedEmployers,
  approveEmployer,
} from "../../features/employer/employerSlice";

const EmployerApproval = () => {
  const [employers, setEmployers] = useState([]);
  const employerRedux = useSelector((state) => state.employer);
  const dispatch = useDispatch();

  const getPendingApprovals = () => {
    dispatch(getUnApprovedEmployers());
    if (employerRedux.employer) {
      setEmployers([...employerRedux.employer]);
    }
  };

  useEffect(() => {
    getPendingApprovals();
  }, [employerRedux.isSuccess]);

  const onApprove = (_id) => {
    dispatch(approveEmployer({ _id }));
    getPendingApprovals();
  };

  return (
    <div className="container mx-auto bg-color-slate h-screen">
      <div className="grid grid-cols-3 gap-4 flex-1 p-5">
        {employers.length
          ? employers.map((emp) => {
              return (
                <div key={emp._id} className="rounded-lg bg-gray-800">
                  <div className="flex flex-col items-center pb-8 ">
                    <img
                      className="mb-3 w-24 h-24 rounded-full shadow-lg m-2"
                      src={emp.logo}
                      alt=""
                    />
                    <h5 className="mb-1 text-xl font-medium text-white">
                      {emp.company}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {emp.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {emp.location}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <button
                        type="button"
                        className="glow-on-hover"
                        onClick={() => onApprove(emp._id)}
                      >
                        Approve
                      </button>
                      <button type="button" className="glow-on-hover">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      {employers.length ? (
        ""
      ) : (
        <h1 className="text-center">There no new employers to approve</h1>
      )}
    </div>
  );
};

export default EmployerApproval;
