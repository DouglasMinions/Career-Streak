import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employerService";

const initialState = {
  employer: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get logged in Employer
export const getLoggedInEmployer = createAsyncThunk(
  "employer/getLoggedInEmployer",
  async (thunkAPI) => {
    try {
      return await employeeService.getLoggedInEmployer();
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

// Get logged in Employer
export const getUnApprovedEmployers = createAsyncThunk(
  "employer/getUnApprovedEmployers",
  async (thunkAPI) => {
    try {
      return await employeeService.getUnApprovedEmployers();
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

// Create Employer
export const createEmployer = createAsyncThunk(
  "employer/createEmployer",
  async (empData, thunkAPI) => {
    try {
      return await employeeService.createEmployer(empData);
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

// Update Employer
export const updateEmployer = createAsyncThunk(
  "employer/updateEmployer",
  async (empData, thunkAPI) => {
    try {
      return await employeeService.updateEmployer(empData);
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

// Approve Employer
export const approveEmployer = createAsyncThunk(
  "employer/approveEmployer",
  async (empData, thunkAPI) => {
    try {
      return await employeeService.approveEmployer(empData);
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

const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.employer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedInEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(getLoggedInEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employer = null;
        state.message = action.payload;
      })
      .addCase(createEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(createEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employer = null;
        state.message = action.payload;
      })
      .addCase(updateEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(updateEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employer = null;
        state.message = action.payload;
      })
      .addCase(getUnApprovedEmployers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnApprovedEmployers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(getUnApprovedEmployers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employer = null;
        state.message = action.payload;
      })
      .addCase(approveEmployer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveEmployer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employer = action.payload;
      })
      .addCase(approveEmployer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.employer = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = employerSlice.actions;
export default employerSlice.reducer;
