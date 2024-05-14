import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage.jsx'
import { Header } from './components/Header/Header';
import DesignPage from './pages/CoursesPage/DesignPage.jsx'
import DetailsCoursePage from './pages/DetailCoursePage/DetailCoursePage.jsx';
import { SignIn } from './pages/LoginSignup/SignIn.jsx';
import { SignUp } from './pages/LoginSignup/SignUp.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

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
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
export default App;
