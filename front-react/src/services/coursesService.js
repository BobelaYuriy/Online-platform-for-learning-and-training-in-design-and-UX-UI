import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomBaseQuery';

export const courseApi = createApi({
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    endpoints: (build) => ({
        getCourses: build.query({
            query: (limit) => ({
                url: '/courses',
                params: { limit },
            }),
        }),
        getCourseId: build.query({
            query: (id) => ({
                url: `/courses/id/${id}`,
            }),
        }),
    }),
});

export const { useGetCoursesQuery, useGetCourseIdQuery } = courseApi;
