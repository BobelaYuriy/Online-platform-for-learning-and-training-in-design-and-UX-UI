const mongoose = require("mongoose");

const testInfoSchema = new mongoose.Schema({
  userScore: Number,
  maxScore: Number,
  percentageCorrect: Number
});

const lessonSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  testInfo: testInfoSchema
});

const userCourseSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  title: String,
  description: String,
  level: String,
  category: String,
  image: String,
  progress: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  certificate: { type: String, default: null },
  lessons: [lessonSchema],
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  enrolledCourses: [userCourseSchema],
  avatar: { type: String, default: null }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
