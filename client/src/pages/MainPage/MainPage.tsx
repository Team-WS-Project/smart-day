import { useNavigate } from "react-router-dom";
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";
import ListContainer from "./ListContainer/ListContainer";
import { datePick, linkCalendarPage, locationTextArea, pageContainer, textArea, weatherText } from "./MainPage.css";
import { appContainer } from "../../App.css";
import DatepickerModal from "../../components/ModalComponents/DatepickerModal/DatepickerModal";
import TaskModal from "../../components/ModalComponents/TaskModal/TaskModal";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import UserEditModal from "../../components/ModalComponents/UserEditModal/UserEditModal";
import useModalStore, { toggleDatepickerModal, toggleLocationModal } from "../../store/modalStore";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";

const MainPage = () => {
  const navigate = useNavigate();
  const gotoCalendarPage = () => {
    navigate("/calendar");
  };

  const { loginModal, userEditModal, datepickerModal, taskModal, locationModal, registerModal } = useModalStore();

  return (
    <>
      {registerModal && <RegisterModal />}
      {loginModal && <LoginModal />}
      {userEditModal && <UserEditModal />}
      {locationModal && <LocationModal />}
      {datepickerModal && <DatepickerModal />}
      {taskModal && <TaskModal />}
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
            <div className={datePick} onClick={toggleDatepickerModal}>
              + 월별 일정 추가
            </div>
            <div className={weatherText}>오늘은 날씨가 weather이므로, textObj 하시는건 어때요?</div>
            <div className={linkCalendarPage} onClick={gotoCalendarPage}>
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
