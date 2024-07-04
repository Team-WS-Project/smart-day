import { useNavigate } from "react-router-dom";
import ListContainer from "../../components/PageComponents/ListContainer/ListContainer";
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";
import { datePick, linkCalendarPage, locationTextArea, pageContainer, textArea, weatherText } from "./MainPage.css";
import { appContainer } from "../../App.css";

const MainPage = () => {
    const navigate = useNavigate();

    const textClick = () => {
        navigate("/calendar");
    };

    return(
        <div className={appContainer}>
            <Header />
            <div className={pageContainer}>
                <div className={locationTextArea}>
                    현재 지역은 location 입니다.
                </div>
                <div>
                    <ListContainer/>
                </div>
                <div className={textArea}>
                    <div className={datePick}>+ 월별 일정 추가</div>
                    <div className={weatherText}>오늘은 날씨가 weather이므로, textObj 하시는건 어때요?</div>
                    <div
                        className={linkCalendarPage}
                        onClick={textClick}
                    >전체 달력 보기</div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default MainPage;
