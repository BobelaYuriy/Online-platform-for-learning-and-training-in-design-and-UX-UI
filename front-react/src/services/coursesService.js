import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './CustomBaseQuery';

export const courseApi = createApi({
    reducerPath: 'courseApi',
    baseQuery: customBaseQuery,
    tagTypes: ['Course'],
    endpoints: (build) => ({
        getCourses: build.query({
            query: ({ limit, category }) => ({
                url: `/courses/${category}`,

            }),
        }),
        getCourseId: build.query({
            query: (id) => ({
                url: `/courses/id/${id}`,
            }),
        }),
        getCourseLessons: build.query({
            query: (id) => ({
                url: `/profile/courses/${id}/lessons`,
            }),
        }),
        getLesson: build.query({
            query: ({ courseId, lessonIndex }) => ({
                url: `/enrolledcourses/id/${courseId}/lesson/${lessonIndex}`,
            }),
        }),
        enrollCourse: build.mutation({
            query: (courseId) => ({
                url: `/courses/enroll/id/${courseId}`,
                method: 'POST',
            }),
        }),
        unenrollCourse: build.mutation({
            query: (courseId) => ({
                url: `/courses/unenroll/id/${courseId}`,
                method: 'POST',
            }),
        }),
        submitUserAnswers: build.mutation({
            query: ({ courseId, lessonIndex, userAnswers }) => ({
                url: `/enrolledcourses/id/${courseId}/lesson/${lessonIndex}/test`,
                method: 'POST',
                body: { userAnswers },
            }),
        }),
        getAllArticles: build.query({
            query: (search) => ({
                url: '/articles',
                params: {
                    search, // Pass the search parameter to the query
                },
            }),
        }),
        getArticleById: build.query({
            query: (id) => ({
                url: `/articles/id/${id}`,
            }),
        }),
    }),
});
