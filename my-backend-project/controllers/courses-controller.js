const Courses = require("../models/courses");
const User = require("../models/user"); // Підключення моделі користувача
const mongoose = require('mongoose');
const { certificate } = require("./certificate-controller");

const allcourses = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const searchQuery = req.query.search;
        const category = req.params.category;

        let query = {};

        if (searchQuery) {
            // Якщо є параметр `query`, додаємо умову для фільтрації за назвою курсу
            query.title = { $regex: searchQuery, $options: "i" };
        }

        if (category) {
            // Якщо є параметр `category`, додаємо умову для фільтрації за категорією
            query.category = category;
        }

        const courses = await Courses.find(query)
            .limit(limit);

        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const idcourse = async (req, res) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

        if (!isValidObjectId) {
            return res.status(400).json({ error: "Невірний формат ідентифікатора" });
        }

        const course = await Courses.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Курс не знайдено" });
        }

        const userId = req.user.id; // Отримання ID користувача з авторизації
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        const isEnrolled = user.enrolledCourses.some(
            (enrolledCourse) => enrolledCourse.courseId.toString() === req.params.id
        );
        const resultObject = {
            isEnrolled,
            ...course.toObject(), // Копіюємо властивості курсу
        };


        return res.status(200).json(resultObject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const enrollUserInCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;

        const user = await User.findById(userId);
        const isEnrolled = user.enrolledCourses.some(
            (course) => course.courseId.toString() === courseId
        );

        if (isEnrolled) {
            return res
                .status(400)
                .json({ message: "Користувач вже записаний на цей курс" });
        }

        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Курс не знайдено" });
        }

        // Include lesson information directly in the enrollment object
        const enrollment = {
            courseId: courseId,
            title: course.title,
            description: course.description,
            level: course.level,
            category: course.category,
            image: course.image,
            progress: 0,
            accuracy: 0,
            certificate: null, // Assuming certificate field remains optional
            lessons: course.lessons.map((lesson) => ({ // Map lessons to simpler objects
                title: lesson.title,
                description: lesson.description,
                duration: lesson.duration,
                testInfo: null
                // Omit testInfo for initial enrollment (tests are completed separately)
            })),
        };

        user.enrolledCourses.push(enrollment);
        await user.save();

        res.status(200).json({ message: "Користувач успішно записаний на курс" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unenrollUserFromCourse = async (req, res) => {
    try {
        const userId = req.user.id; // Отримуємо ідентифікатор користувача з авторизації
        const courseId = req.params.id; // Отримуємо ідентифікатор курсу з параметра запиту

        // Знаходимо користувача в базі даних
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        // Перевіряємо, чи користувач записаний на цей курс
        const enrolledCourseIndex = user.enrolledCourses.findIndex(
            (enrollment) => enrollment.courseId.toString() === courseId
        );

        if (enrolledCourseIndex === -1) {
            return res
                .status(400)
                .json({ message: "Користувач не записаний на цей курс" });
        }

        // Видаляємо об'єкт enrollment з масиву enrolledCourses користувача
        user.enrolledCourses.splice(enrolledCourseIndex, 1);

        // Зберігаємо оновлені дані користувача
        await user.save();

        res.status(200).json({ message: "Користувач видалений з курсу" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getLessonData = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const lessonIndex = req.params.lessonIndex;

        const course = await Courses.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Курс не знайдений" });
        }

        if (lessonIndex < 0 || lessonIndex >= course.lessons.length) {
            return res.status(404).json({ message: "Урок не знайдений" });
        }

        const lesson = course.lessons[lessonIndex];

        const lessonData = {
            title: lesson.title,
            description: lesson.description,
            tests: lesson.tests,
            video: lesson.video
        };

        res.status(200).json(lessonData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCourseLessons = async (req, res) => {
    try {
        const userId = req.user.id; // Отримуємо ідентифікатор користувача з авторизації
        const courseId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Користувач не знайдений" });
        }

        const courseInfo = user.enrolledCourses.find(course => course.courseId.toString() === courseId);

        if (!courseInfo) {
            return res.status(404).json({ message: "Курс не знайдений" });
        }

        const course = await Courses.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Курс не знайдений" });
        }

        // Створюємо масив короткої інформації про уроки
        const lessonsInfo = course.lessons.map((lesson, index) => {
            const lessonData = {
                index: index,
                title: lesson.title,
                duration: lesson.duration,
                description: lesson.description,
                isCompleted: false, // Додано поле для визначення пройденості уроку
            };

            // Перевірка, чи користувач пройшов всі тести уроку
            const completedTests = courseInfo.completedTests.filter(test => test.lessonIndex === index);
            if (completedTests.length === lesson.tests.length) {
                lessonData.isCompleted = true;
            }

            return lessonData;
        });

        // Розділяємо уроки на всі та пройдені
        const allLessons = lessonsInfo;
        const completedLessons = lessonsInfo
            .filter(lesson => lesson.isCompleted)
            .map(lesson => ({
                lessonIndex: lesson.index,
                testResults: courseInfo.completedTests
                    .filter(test => test.lessonIndex === lesson.index)
                    .map(test => ({
                        testIndex: test.testIndex,
                        userScore: test.userScore,
                        maxScore: test.maxScore,
                        percentageCorrect: test.percentageCorrect,
                    })),
            }));

        // Формуємо об'єкт для відповіді
        const responseObj = {
            allLessons: allLessons,
            completedLessons: completedLessons,
        };

        res.status(200).json(responseObj);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEnrolledCourseInfo = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Користувача не знайдено' });
        }
        if (user.enrolledCourses.length === 0) {
            return res.status(404).json({ message: 'Користувач не записаний на жоден курс' });
        }
        const courseId = req.params.id;
        const enrolledCourse = user.enrolledCourses.find(course => course.courseId.toString() === courseId);
        if (!enrolledCourse) {
            return res.status(404).json({ message: 'Користувач не записаний на цей курс' });
        }
        res.json(enrolledCourse);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

const submitUserAnswers = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.courseId;
        const lessonIndex = parseInt(req.params.lessonIndex);
        const userAnswers = req.body.userAnswers;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        const enrolledCourse = user.enrolledCourses.find(
            (enrolledCourse) => enrolledCourse.courseId.toString() === courseId
        );
        if (!enrolledCourse) {
            return res
                .status(400)
                .json({ message: "Користувач не записаний на цей курс" });
        }

        let lesson = enrolledCourse.lessons[lessonIndex];
        if (!lesson) {
            return res.status(404).json({ message: "Урок не знайдено" });
        }

        // Перевірка, чи тест вже пройдений користувачем
        let testInfo = lesson.testInfo;
        if (!testInfo) {
            testInfo = {
                userScore: 0,
                maxScore: 0,
                percentageCorrect: 0,
            };
            lesson.testInfo = testInfo;
        }

        // Отримання правильних відповідей з моделі Course
        const course = await Courses.findById(enrolledCourse.courseId);
        const correctAnswers = course.lessons[lessonIndex].tests.questions.map((question) => question.correctAnswer);

        // Порівняння відповідей користувача з правильними
        const userScores = userAnswers.map((answer, index) => (answer === correctAnswers[index] ? 1 : 0));

        // Обчислення загального балу користувача
        const totalScore = userScores.reduce((total, score) => total + score, 0);
        const maxScore = course.lessons[lessonIndex].tests.questions.length;
        const percentageCorrect = Math.round((totalScore / maxScore) * 100);

        // Оновлення інформації про тест у користувача
        lesson.testInfo = {
            userScore: totalScore,
            maxScore: maxScore,
            percentageCorrect: percentageCorrect,
        };

        // Оновлення актуальності курсу у користувача
        const allLessons = enrolledCourse.lessons;
        const totalUserScore = allLessons.reduce((total, lesson) => total + (lesson.testInfo ? lesson.testInfo.userScore : 0), 0);
        const totalMaxScore = allLessons.reduce((total, lesson) => total + (lesson.testInfo ? lesson.testInfo.maxScore : 0), 0);
        const overallPercentageCorrect = Math.round((totalUserScore / totalMaxScore) * 100);
        enrolledCourse.accuracy = overallPercentageCorrect;

        const completedLessonCount = allLessons.filter((lesson) => lesson.testInfo && lesson.testInfo.userScore > 0).length;
        const totalLessonCount = allLessons.length;
        enrolledCourse.progress = Math.round((completedLessonCount / totalLessonCount) * 100);

        await user.save();

        if (enrolledCourse.progress === 100) {
            // Виклик контролера для видачі сертифіката
            await certificate(req, res);
        }

        res.status(200).json({
            message: "Результати тестування збережено",
            testInfo: lesson.testInfo,
            percentageCorrect,
            overallPercentageCorrect,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    allcourses,
    idcourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    getLessonData,
    getCourseLessons,
    getEnrolledCourseInfo,
    submitUserAnswers
}