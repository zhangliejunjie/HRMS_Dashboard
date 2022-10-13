import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  members: null,
};

export const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: {},
});
