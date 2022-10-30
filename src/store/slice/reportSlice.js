import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { error, success } from './notificationSlice';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const initialState = {
  reports_pending: [],
  reports_done: [],
  error: '',
  loading: null,
};

export const getReportByInterviewer = createAsyncThunk('report/getReportByInterviewer', async (params, thunkAPI) => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/report/by-interviewer', {
      interviewerId: params,
    });
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
});

export const submitReport = createAsyncThunk('report/submitReport', async (params, thunkAPI) => {
  await axios
    .patch('http://localhost:8000/api/report/mark', {
      interviewId: params.interviewId,
      interviewerId: params.interviewerId,
      mark: params.mark,
      comment: params.comment,
    })
    .then((res) => {
      thunkAPI.dispatch(success('Submit successfully'));
    })
    .catch((err) => {
      thunkAPI.dispatch(error(err.response.data.message));
    });
});

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: {
    [getReportByInterviewer.pending]: (state, action) => {
      state.loading = true;
      state.reports = [];
      state.error = '';
    },
    [getReportByInterviewer.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.reports_pending = [];
      state.reports_done = [];
    },
    [getReportByInterviewer.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = '';
      state.reports_done = action.payload.report_done;
      state.reports_pending = action.payload.report_pending;
    },
  },
});

export const { reducer: reportReducer } = reportSlice;
export default reportReducer;
