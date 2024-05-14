import { createApi } from '@reduxjs/toolkit/query/react';
import { getUser } from '../store/slices/userSlice'; // Припускаю, що `getUser` - це action creator з ваших slices
import { customBaseQuery } from './CustomBaseQuery';
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => '/profile', // Припускаю, що це правильний шлях для отримання даних про користувача
        }),
    }),
});

// Деструктуризуємо мутацію та запит для використання у компонентах
