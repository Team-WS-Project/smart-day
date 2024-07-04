// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CalendarPage from "../pages/CalendarPage/CalendarPage";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import TodoListPage from "../pages/TodolistPage/TodolistPage";

/* 임시 import ............................................................................ */
import LoginModal from "../components/ModalComponents/LoginModal/LoginModal";
import UserEditModal from "../components/ModalComponents/UserEditModal/UserEditModal";
import DayModal from "../components/ModalComponents/DayModal/DayModal";
import DatepickerModal from "../components/ModalComponents/DatepickerModal/DatepickerModal";
import TaskModal from "../components/ModalComponents/TaskModal/TaskModal";
import LoggerModal from "../components/ModalComponents/LoggerModal/LoggerModal";
/*......................................................................................... */

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/todolist" element={<TodoListPage />} />

        {/* 모달들은 임시 경로로 스타일을 확인할 수 있게 라우팅 ..........*/}
        <Route path="/loginmodal" element={<LoginModal />} />
        <Route path="/usereditmodal" element={<UserEditModal />} />
        <Route path="/datepickermodal" element={<DatepickerModal />} />
        <Route path="/daymodal" element={<DayModal />} />
        <Route path="/taskmodal" element={<TaskModal />} />
        <Route path="/loggermodal" element={<LoggerModal />} />
        {/*............................................................*/}
      </Routes>
    </Router>
  );
}

export default MainRoutes;
