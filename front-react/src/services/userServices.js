import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Імпорт createApi з Redux Toolkit

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        signUp: build.mutation({
            query: ({ email, username, password }) => ({
                url: '/signup',
                method: 'POST',
                body: { email, username, password },
            }),

        }),
    }),
});

