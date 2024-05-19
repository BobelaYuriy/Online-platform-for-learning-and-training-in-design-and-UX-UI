import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Header } from './components/Header/Header';
import DesignPage from './pages/CoursesPage/DesignPage.jsx'
import DetailsCoursePage from './pages/DetailCoursePage/DetailCoursePage.jsx';
import { SignIn } from './pages/LoginSignup/SignIn.jsx';
import { SignUp } from './pages/LoginSignup/SignUp.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import LessonPage from './pages/LessonPage/LessonPage.jsx';
import CourseLessonsPage from './pages/CourseLessonsPage/CourseLessonsPage.jsx';
import ArticlePage from './pages/ArticlePage/ArticlePage.jsx';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courseuiux" element={<DesignPage />} />
        <Route path="/coursesuiux/id/:id" element={<DetailsCoursePage />} />
        <Route path="/coursesuiux/id/:id/lessons" element={<CourseLessonsPage />} />
        <Route path="/coursesuiux/id/:id/lessons/:lessonIndex" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </div>
  );
}
export default App;
