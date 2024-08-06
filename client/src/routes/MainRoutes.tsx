import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import CalendarPage from "../pages/CalendarPage/CalendarPage";
import SchedulePage from "../pages/SchedulePage/SchedulePage";
import TodoListPage from "../pages/TodolistPage/TodolistPage";

function MainRoutes() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/calendar"} element={<CalendarPage />} />
        <Route path={"/schedule"} element={<SchedulePage />} />
        <Route path={"/todolist"} element={<TodoListPage />} />
      </Routes>
    </Router>
  );
}

export default MainRoutes;
