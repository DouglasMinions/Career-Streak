import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jobService from "./jobService";

const initialState = {
  jobPostings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all jobs
export const getJobs = createAsyncThunk("job/getJobs", async (thunkAPI) => {
  try {
    return await jobService.getJobs();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// get employer specific active jobs
export const getOpenJobs = createAsyncThunk(
  "job/getOpenJobs",
  async (jobData, thunkAPI) => {
    try {
      return await jobService.getOpenJobs(jobData);
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

// create job
export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, thunkAPI) => {
    try {
      return await jobService.createJob(jobData);
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

// apply job
export const applyJob = createAsyncThunk(
  "job/applyJob",
  async (jobData, thunkAPI) => {
    try {
      return await jobService.applyJob(jobData);
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

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.jobPostings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobPostings = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.jobPostings = [];
        state.message = action.payload;
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobPostings = action.payload;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.jobPostings = [];
        state.message = action.payload;
      })
      .addCase(applyJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobPostings = action.payload;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.jobPostings = [];
        state.message = action.payload;
      })
      .addCase(getOpenJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpenJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobPostings = action.payload;
      })
      .addCase(getOpenJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.jobPostings = [];
        state.message = action.payload;
      });
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;
