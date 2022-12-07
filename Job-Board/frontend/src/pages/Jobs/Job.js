import { FaMicrosoft, FaFacebook } from "react-icons/fa";

const Job = ({ job, click }) => {
  return (
    <div className="cursor-pointer">
      <div
        className="flex flex-col md:flex-row md:max-w-sm rounded-lg bg-white shadow-lg m-2"
        onClick={() => click(job._id)}
      >
        <img
                src={ require(`./${job.company}.jpg`) }
                className="rounded-md h-12 w-12 m-5"
                alt="job"
              />
        <div className="p-6 flex flex-col justify-start">
          <h6 className="text-gray-900 text-lg font-medium mb-2 ">
            {job.title}
          </h6>
          <h3 className="text-gray-700 text-base mb-4">{job.company}</h3>
          <p className="text-gray-600 text-xs">{job.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Job;
