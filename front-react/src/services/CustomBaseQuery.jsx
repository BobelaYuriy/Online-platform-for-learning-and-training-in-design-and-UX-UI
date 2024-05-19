import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { checkAuth } from "../network/network";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const { user } = getState(); // Assuming your slice name is `user`
    const token = user.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("No token found in state");
    }

    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const originalRequest = args;
    if (!originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await checkAuth();
        console.log("Token refreshed:", response);
        const { accessToken } = response.data;

        // Update token in local storage and state
        localStorage.setItem(
          "persist:user",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("persist:user")),
            token: accessToken,
          })
        );

        // Update headers with new token
        const newHeaders = new Headers(originalRequest.headers);
        newHeaders.set("Authorization", `Bearer ${accessToken}`);
        originalRequest.headers = newHeaders;
        result = await baseQuery(originalRequest, api, extraOptions);
      } catch (error) {
        console.error("User is not authorized", error);
        document.location.replace("/signin");
        localStorage.setItem(
          "persist:user",
          JSON.stringify({ isAuthorized: false, token: null, userData: null })
        );
        throw new Error("Refresh token error");
      }
    } else {
      console.error(`User isn't authorized error:`, result.error);
    }
  }

  return result;
};
