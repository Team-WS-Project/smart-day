import CalendarComponent from "../../components/PageComponents/CalendarComponent/CalendarComponent";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";
import { appContainer } from "./CalendarPage.css";

const CalendarPage = () => {
    return(
        <div className={appContainer}>
            <Header />
            <div>
                <div>
                    <CalendarComponent />
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default CalendarPage;
