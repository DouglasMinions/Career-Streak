import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

// register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// logout user
const logout = async () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  localStorage.removeItem("user");
  await axios.post(API_URL + "logout", {
    headers: { authorization: `Bearer ${token}` },
  });
};

const getMe = async () => {
  const { token } = JSON.parse(localStorage.getItem("user"));
  if (!token) return;
  const response = await axios.get(API_URL + "me", {
    headers: { authorization: `Bearer ${token}` },
  });

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getMe,
};

export default authService;
