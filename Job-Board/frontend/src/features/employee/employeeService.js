import axios from "axios";

const API_URL = "http://localhost:5000/api/employee";

const getMe = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: { authorization: `Bearer ${user?.token}` },
  };
  const response = await axios.get(API_URL + "/me", options);
  return { ...response.data.user, ...response.data.employee };
};

const createEmployee = async (empData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: { authorization: `Bearer ${user?.token}` },
  };
  const response = await axios.post(API_URL, empData, options);
  return response.data;
};

const updateEmployee = async (empData) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const options = {
    headers: { authorization: `Bearer ${user?.token}` },
  };
  const response = await axios.put(API_URL, empData, options);
  return response.data;
};

export default { getMe, createEmployee, updateEmployee };
