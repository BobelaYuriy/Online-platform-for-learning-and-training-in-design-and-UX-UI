import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Імпорт createApi з Redux Toolkit

export const courseApi = createApi({
    reducerPath: 'courseAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
    endpoints: (build) => ({
        getCourses: build.query({
            query: (limit) => ({
                url: '/courses',
                params: {
                    limit: limit
                }
            })
        }),
        getCourseId: build.query(
            {
                query: (id) => ({
                    url: `/courses/id/${id}`
                })
            }
        )
    })
})