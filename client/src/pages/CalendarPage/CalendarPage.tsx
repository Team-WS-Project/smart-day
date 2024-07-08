import { appContainer } from "../../App.css";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";
import { calendarPageBody } from "./CalendarPage.css";

const CalendarPage = () => {
  return (
    <div className={appContainer}>
      <Header />
      <div className={calendarPageBody}>
        <CalendarComponent />
      </div>
      <Footer />
    </div>
  );
};

export default CalendarPage;
