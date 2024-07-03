import CalendarComponent from "../../components/PageComponents/CalendarComponent/CalendarComponent";
import { appContainer } from "./CalendarPage.css";

const CalendarPage = () => {
    return(
        <div className={appContainer}>
            // header
            <div>
                <div>
                    <CalendarComponent />
                </div>
            </div>
            // footer
        </div>
    )
};

export default CalendarPage;
