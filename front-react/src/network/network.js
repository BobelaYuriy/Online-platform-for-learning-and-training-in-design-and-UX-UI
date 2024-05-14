import $api from './index';
import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = 'http://localhost:3001/api';

// Функції з використанням $api для запитів
export const signIn = async ({ email, password }) => {
    try {
        const response = await $api.post('/signin', { email, password });
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

export const signOutUser = async () => {
    try {
        const response = await $api.post('/signout');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

export const getUserInfo = async () => {
    try {
        const response = await $api.get('/profile');
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error getting user info:', error.message);
        throw error;
    }
};

export const enrollUserInCourse = async (courseId) => {
    try {
        const response = await $api.post(`/enroll/?id=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error enrolling in course:', error);
        throw error;
    }
};

export const unenrollUserInCourse = async (courseId) => {
    try {
        const response = await $api.post(`/unenroll/?id=${courseId}`);
        return response.data;
    } catch (error) {
        console.error('Error unenrolling from course:', error);
        throw error;
    }
};

export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Refresh error: ${error}`);
        throw new Error('Refresh error');
    }
};

export const getCourses = createAsyncThunk(
    'courses/allcourses', async () => {
        try {
            const response = await $api.get('/courses');
            return response.data;
        } catch (error) {
            console.error("Error getting courses:", error);
            throw error;
        }
    }
)

export const getCourseId = createAsyncThunk(
    'courses/getCourseId', async (id) => {
        try {
            const response = await $api.get(`/courses/id/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error getting course by ID:", error);
            throw error;
        }
    }
)
