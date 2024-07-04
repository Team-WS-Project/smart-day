// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CalendarPage from "../pages/CalendarPage/CalendarPage";


function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
