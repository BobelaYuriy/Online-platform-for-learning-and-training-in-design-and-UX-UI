import $api from './index'
import { createAsyncThunk } from "@reduxjs/toolkit";

//файл із запитами аксіоса
export const signIn = async (email, password) => {
    try {
        const response = await $api.post('/signin', { username, password });
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};


export const signUp = async ({ email, username, password }) => {
    try {
        const response = await $api.post('/signup', { email, username, password });
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}

// export const signOut = async () => {
//     try {
//         const response = await $api.post('/signout');
//         return response.data;
//     } catch (error) {
//         console.error('Error logging out:', error);
//         throw error;
//     }
// };

//курси
export const getCourses = createAsyncThunk(
    'courses/allcourses', async () => {
        try {
            const response = await $api.get('/courses');
            return response.data;
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }
)

export const getCourseId = createAsyncThunk(
    'courses/getCourseId', async () => {
        try {
            const response = await $api.get('/courses/id/:id');
            return response.data;
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    }
)