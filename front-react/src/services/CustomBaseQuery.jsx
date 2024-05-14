// customBaseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { checkAuth } from "../network/network"; // Make sure to adjust the import path to your `checkAuth` function

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  prepareHeaders: (headers) => {
    const storedData = localStorage.getItem("persist:user");
    let token = null;

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        token = parsedData?.token ? parsedData.token.replace(/"/g, "") : null; // Remove quotes from token if present
      } catch (e) {
        console.error("Error parsing stored data:", e);
      }
    }
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("No token found in localStorage");
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
        localStorage.setItem(
          "persist:user",
          JSON.stringify({ token: response.data.accessToken })
        );
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${response.data.accessToken}`
        );
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
