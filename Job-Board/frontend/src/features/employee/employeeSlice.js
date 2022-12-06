import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
  employee: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getEmpMe = createAsyncThunk("employee/getMe", async (thunkAPI) => {
  try {
    return await employeeService.getMe();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (empData, thunkAPI) => {
    try {
      return await employeeService.createEmployee(empData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (empData, thunkAPI) => {
    try {
      return await employeeService.updateEmployee(empData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.employee = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmpMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmpMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(getEmpMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employee = null;
        state.message = action.payload;
      })
      .addCase(createEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employee = null;
        state.message = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employee = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employee = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
