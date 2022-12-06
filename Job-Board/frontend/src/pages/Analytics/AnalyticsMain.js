import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Analytics from "./Analytics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
var moment = require("moment");
moment().format();

export function AnalyticsMain() {
  let [datas, setDatas] = useState([{}]);
  let [employerdatas, setEmployerDatas] = useState([{}]);
  let [employeedatas, setEmployeeDatas] = useState([{}]);

  const getMe = async () => {
    const API_URL = "http://localhost:5000/api/jobs";
    const { token } = JSON.parse(localStorage.getItem("user"));
    if (!token) return;
    const response = await axios.get(API_URL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return response.data;
  };

  const getemployer = async () => {
    const API_URL = "http://localhost:5000/api/employer";
    const { token } = JSON.parse(localStorage.getItem("user"));
    if (!token) return;
    const response = await axios.get(API_URL, {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.data.employers;
  };

  const getemployee = async () => {
    const API_URL = "http://localhost:5000/api/employee/all";
    const { token } = JSON.parse(localStorage.getItem("user"));
    if (!token) return;
    const response = await axios.get(API_URL, {
      headers: { authorization: `Bearer ${token}` },
    });

    return response.data.employees;
  };

  useEffect(() => {
    getMe().then((data) => {
      setDatas(data);
    });
    getemployer().then((data) => {
      setEmployerDatas(data);
    });
    getemployee().then((data) => {
      setEmployeeDatas(data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-2/4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
            <Analytics datas={datas} name={"Job"} />
          </div>
        </div>

        <div className="basis-2/4">
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-1">
            <Analytics datas={employerdatas} name={"Employer"} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 md:mt-5 md:ml-60">
        <Analytics datas={employeedatas} name={"Employee"} />
      </div>
    </>
  );
}

export default AnalyticsMain;
