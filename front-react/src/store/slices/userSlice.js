import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp, signIn, signOutUser, getUserInfo } from '../../network/network';
import { userApi } from "../../services/userServices";

const initialState = {
  userData: null,
  isAuthorized: false,
  token: null,
};

export const signUpUser = createAsyncThunk("user/signUp", async (userData) => {
  try {
    const response = await signUp(userData);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
});

export const signInUser = createAsyncThunk("user/signIn", async (userData) => {
  try {
    const response = await signIn(userData);
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
});

export const signOut = createAsyncThunk("user/signOut", async (userData) => {
  try {
    const response = await signOutUser(userData);
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await getUserInfo();
    return response;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
      state.token = null;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.token = action.payload.accessToken;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.token = action.payload.userData.accessToken;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthorized = false;
        state.userData = null;
        state.token = null;
      })
      .addMatcher(
        userApi.endpoints.getUser.matchFulfilled,
        (state, action) => {
          state.userData = action.payload;
        }
      );
  },
});

export const { setToken, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
