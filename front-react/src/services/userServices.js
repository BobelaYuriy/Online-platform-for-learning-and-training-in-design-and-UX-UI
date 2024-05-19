import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomBaseQuery';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customBaseQuery,
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => '/profile',
        }),
        updateProfile: build.mutation({
            query: (profileData) => ({
                url: '/updateprofile',
                method: 'POST',
                body: profileData,
            }),

        }),
    }),
});


