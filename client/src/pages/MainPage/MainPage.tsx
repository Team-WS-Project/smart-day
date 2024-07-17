import { useNavigate } from "react-router-dom";
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";
import ListContainer from "./ListContainer/ListContainer";
import { datePick, linkCalendarPage, locationTextArea, pageContainer, textArea, weatherText } from "./MainPage.css";
import { appContainer } from "../../App.css";
import useModalStore, { toggleLocationModal } from "../../store/store";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";

const MainPage = () => {
  const locationModal = useModalStore((state) => state.locationModal);

  const navigate = useNavigate();

  const gotoCalendarPage = () => {
    navigate("/calendar");
  };

  return (
    <>
      {locationModal && <LocationModal />}
      <div className={appContainer}>
        <Header />
        <div className={pageContainer}>
          <div className={locationTextArea}>
            현재 지역은 location 입니다.
            <div onClick={toggleLocationModal}>위치변경</div>
          </div>
          <div>
            <ListContainer />
          </div>
          <div className={textArea}>
            <div className={datePick}>+ 월별 일정 추가</div>
            <div className={weatherText}>오늘은 날씨가 weather이므로, textObj 하시는건 어때요?</div>
            <div
              className={linkCalendarPage}
              onClick={gotoCalendarPage} //
            >
              전체 달력 보기
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
