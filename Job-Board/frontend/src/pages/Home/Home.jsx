import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../../features/auth/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const { user, isSuccess } = useSelector((state) => state.auth);
  const { employee } = useSelector((state) => state.employee);

  useEffect(() => {
    if (employee) {
      navigate("/jobs");
    }
    dispatch(getMe());
    if (user && (user.role === "employee" || user.role === "employer")) {
      navigate("/jobs");
    }
  }, [isSuccess, userStorage?.token]);

  const onClick = (role) => {
    toast.dismiss();
    navigate(`/${role}`);
  };

  return (
    <div className="flex h-screen bg-color-slate">
      <ToastContainer />
      <div className="m-auto flex gap-x-10 text-2xl">
        <div className="card" onClick={() => onClick("employee")}>
          <p>Seeking Employment?</p>
        </div>
        <div className="card" onClick={() => onClick("employer")}>
          <p>Seeking Employee?</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
