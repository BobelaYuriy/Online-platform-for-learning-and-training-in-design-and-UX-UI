import { createSlice } from "@reduxjs/toolkit";
import { getCourses } from "../../network/network";

const initialState = {
    courses: [],
    isLoading: false, // Початкове значення isLoading має бути false
    error: '',
    prikol: false
}

export const coursesReducer = createSlice({
    name: 'courses',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCourses.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.prikol = false;
        }),
            builder.addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.courses = action.payload;
                state.prikol = true;
            }),
            builder.addCase(getCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.prikol = false;
            });
    }
})

export default coursesReducer.reducer;
