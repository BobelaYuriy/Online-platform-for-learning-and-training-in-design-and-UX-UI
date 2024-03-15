import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage.jsx';
import { LoginSignup } from './components/LoginSignup/LoginSignup.jsx';
import { Header } from './components/Header/Header';
import { DesignPage } from './components/CoursesPage/DesignPage'
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginSignup />} />
        <Route path="/courseuiux" element={<DesignPage />} />
      </Routes>
    </div>
  );
}

export default App;
