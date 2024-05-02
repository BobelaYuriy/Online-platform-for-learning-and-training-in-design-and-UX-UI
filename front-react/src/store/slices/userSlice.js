import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp } from '../../network/network';
import { userApi } from "../../services/userServices";
const initialState = {
  user: null,
  isAuthorized: false,
  token: null,
};

export const signUpUser = createAsyncThunk("user/signUp", async (userData) => {
  try {
    const response = await signUp(userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isAuthorized = true;
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
