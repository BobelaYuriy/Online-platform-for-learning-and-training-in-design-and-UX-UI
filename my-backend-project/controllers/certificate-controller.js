const cloudinary = require("../utils/cloudinary");
const { createCanvas, loadImage, registerFont } = require("canvas");
const User = require("../models/user");
const Course = require("../models/courses");
const path = require('path');

const certificate = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.courseId;

        const user = await User.findById(userId);
        const course = await Course.findById(courseId);
        const enrolledCourse = user.enrolledCourses.find(course => course.courseId.toString() === courseId);

        if (!user || !course) {
            return res
                .status(404)
                .json({ message: "Користувач або курс не знайдено" });
        }

        const canvas = createCanvas(1748, 2481);
        const context = canvas.getContext("2d");

        const certificatePath = path.join(__dirname, '../utils/certificate.jpg');
        const background = await loadImage(certificatePath);
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const pathToFont = path.join(__dirname, '../utils/times.ttf');
        registerFont(pathToFont, { family: 'TIMES' });

        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";

        context.font = "120px TIMES";
        const welcomeText = `Вітаємо, ${user.username}!`;
        context.fillText(welcomeText, canvas.width / 2, 250);

        context.font = "100px TIMES";
        const courseCompletionText = "Ви успішно завершили курс:";
        context.fillText(courseCompletionText, canvas.width / 2, 400);

        const courseTitleText = course.title;
        context.fillText(courseTitleText, canvas.width / 2, 550);

        context.textAlign = "left";
        context.font = "60px TIMES";
        const courseTextAccuracy = `Ваша акуратність: ${enrolledCourse.accuracy}%`;
        context.fillText(courseTextAccuracy, 200, 700);

        const maxHeightForDetails = canvas.height - 700 - 50;

        let currentY = 800;
        context.font = "50px TIMES";
        enrolledCourse.lessons.forEach(lesson => {
            if (lesson.testInfo && lesson.testInfo.percentageCorrect != null) {
                const lessonText = `${lesson.title}: ${lesson.testInfo.percentageCorrect}%`;
                const lessonTextWidth = context.measureText(lessonText).width;

                if (lessonTextWidth < canvas.width - 300) {
                    context.fillText(lessonText, 200, currentY);
                    currentY += 60;
                } else {
                    console.warn(`Skipping lesson text: ${lessonText} due to exceeding width`);
                }

                if (currentY > maxHeightForDetails + 800) {
                    console.warn("Lesson details exceeding available height. Stopping loop.");
                    return;
                }
            }
        });

        const courseImage = await loadImage(course.image);
        const imageWidth = 780;
        const imageHeight = 1040;
        const imageX = canvas.width - imageWidth - 100;
        const imageY = 700;

        context.drawImage(courseImage, imageX, imageY, imageWidth, imageHeight);

        const certificateBase64 = canvas.toDataURL("image/jpeg");

        const uploadRes = await cloudinary.uploader.upload(certificateBase64, {
            folder: "imagesCertificates",
        });

        enrolledCourse.certificate = uploadRes.url;

        await user.save();

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    certificate,
};
