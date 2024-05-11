import $api from './index'
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'

import { createAsyncThunk } from "@reduxjs/toolkit";

//файл із запитами аксіоса
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

export const getUser = async () => {
    try {
        const response = await $api.post('/profile');
        return response.data;
    } catch (error) {
        console.error('Error getUser:', error);
        throw error;
    }
};

export const chechAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
        return response.data;
    } catch (error) {
        throw error;
    }
}

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