import axios from "axios";

const API_URL = "http://localhost:5000/api/employer";

// Get request header
const getOptions = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    headers: { authorization: `Bearer ${user?.token}` },
  };
};

// Get logged in employer
const getLoggedInEmployer = async () => {
  const response = await axios.get(API_URL + "/me", getOptions());
  return response.data;
};

// create employer
const createEmployer = async (empData) => {
  const response = await axios.post(API_URL, empData, getOptions());
  return response.data;
};

// update employer
const updateEmployer = async (empData) => {
  const response = await axios.put(API_URL, empData, getOptions());
  return response.data;
};

// get unapproved employer
const getUnApprovedEmployers = async () => {
  const response = await axios.get(API_URL + "/unapproved", getOptions());
  return response.data.message;
};

// approve employer
const approveEmployer = async (empData) => {
  const response = await axios.put(
    `${API_URL}/${empData._id}`,
    { adminApproval: true },
    getOptions()
  );
  return response.data.message;
};

export default {
  getLoggedInEmployer,
  createEmployer,
  updateEmployer,
  getUnApprovedEmployers,
  approveEmployer,
};
