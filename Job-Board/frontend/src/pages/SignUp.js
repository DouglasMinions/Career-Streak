import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { getMe, register, reset } from "../features/auth/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess || user) {
      dispatch(getMe());
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, message, navigate, dispatch]);

  const [formData, setForm] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // check for fields
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      setError("Please provide all fields");
      return;
    }

    // check for password match
    if (password !== confirmPassword) {
      setError(
        "Please make sure password and confirm password fields are same."
      );
      return;
    }

    dispatch(register({ name, email, password }));
  };

  const onChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen bg-color-slate">
      <div className="m-auto w-1/3 p-3 rounded bg-color-blue drop-shadow-lg">
        <p className="text-3xl text-gray-700 pb-1 flex justify-between">
          <FaUser /> Sign Up Here
        </p>
        <form onSubmit={onSubmit}>
          <div className="pb-1">
            <input
              className="w-full border rounded shadow p-2"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </div>
          <div className="pb-1">
            <input
              className="w-full border rounded shadow p-2"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
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
            />
          </div>
          <div className="pb-1">
            <input
              className="w-full border rounded shadow p-2"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
            />
          </div>
          {error && <p className="text-red-900 font-semibold">{error}</p>}
          <div className="float-right">
            <button
              className="rounded text-white p-2 bg-gray-600 hover:bg-gray-700"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
