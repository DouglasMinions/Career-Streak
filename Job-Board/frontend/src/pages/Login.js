import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isSuccess, isError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    toast("Logging In....", { autoClose: 200, type: "info" });
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss();
      navigate("/");
    } else if (isError) {
      toast.dismiss();
    }
    dispatch(reset());
  }, [isSuccess, isError]);

  return (
    <div className="flex h-screen bg-color-slate">
      <ToastContainer />
      <div className="m-auto w-1/3 p-3 rounded bg-color-blue drop-shadow-lg">
        <h1 className="text-3xl text-gray-700 p-1 flex justify-between">
          <FaSignInAlt /> Login Here
        </h1>
        <form onSubmit={onSubmit}>
          <div className="pb-1">
            <input
              className="w-full border rounded shadow p-2"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="pb-1">
            <input
              className="w-full border rounded shadow p-2"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
            />
          </div>
          <div className="mt-2 float-right">
            <button
              className="rounded text-white p-2 bg-gray-600 hover:bg-gray-700 hover:text-blue-300"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
