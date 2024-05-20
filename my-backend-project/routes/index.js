var express = require('express');
var router = express.Router();
const { allcourses, idcourse, enrollUserInCourse, unenrollUserFromCourse, getCourseLessons, getLessonData, getEnrolledCourseInfo, submitUserAnswers } = require('../controllers/courses-controller')
const { verifyToken } = require('../middleware/token-controller')
const { signin, signup, signout, getUserById, refresh, updateProfile } = require('../controllers/user-controller');
const { allArticle, articleById } = require('../controllers/article-controller');
const { certificate } = require('../controllers/certificate-controller');

router.get('/refresh', refresh);

//роути для юзерів
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

router.get('/profile', verifyToken, getUserById);
router.post('/updateprofile', verifyToken, updateProfile);

router.get('/courses/:category', allcourses);
router.get('/courses/id/:id', verifyToken, idcourse);
router.post('/courses/enroll/id/:id', verifyToken, enrollUserInCourse);
router.post('/courses/unenroll/id/:id', verifyToken, unenrollUserFromCourse);

router.get('/profile/courses/:id/lessons', verifyToken, getEnrolledCourseInfo)

router.get('/enrolledcourses/id/:courseId/lesson/:lessonIndex', verifyToken, getLessonData)

router.post('/enrolledcourses/id/:courseId/lesson/:lessonIndex/test', verifyToken, submitUserAnswers)

router.get('/certificate/:courseId', verifyToken, certificate)
//articles
router.get('/articles', allArticle)
router.get('/articles/id/:id', articleById)

module.exports = router;
