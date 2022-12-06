import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import employeeReducer from "../features/employee/employeeSlice";
import jobReducer from "../features/job/jobSlice";
import employerReducer from "../features/employer/employerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    job: jobReducer,
    employer: employerReducer,
  },
});

export default store;
