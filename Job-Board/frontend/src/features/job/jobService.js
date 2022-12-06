import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

// Get Jobs
const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create Job
const createJob = async (jobData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: { authorization: `Bearer ${user?.token}` },
  };
  const response = await axios.post(API_URL, jobData, options);
  return response.data;
};

// Apply Job
const applyJob = async (jobData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: { authorization: `Bearer ${user?.token}` },
  };
  const response = await axios.put(`${API_URL}/apply`, jobData, options);

  return response.data;
};

// get Open jobs
const getOpenJobs = async (jobData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: { authorization: `Bearer ${user?.token}` },
  };
  const response = await axios.get(
    `${API_URL}/${jobData.empId}`,
    jobData,
    options
  );

  return response.data;
};

export default { getJobs, createJob, applyJob, getOpenJobs };
