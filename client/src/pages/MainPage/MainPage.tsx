// import { useNavigate } from "react-router-dom";
import Header from "../../components/PageComponents/Header/Header";
import Footer from "../../components/PageComponents/Footer/Footer";
import ListContainer from "./ListContainer/ListContainer";
import {
  datePick,
  // linkCalendarPage,
  locationChange,
  locationTextArea,
  pageContainer,
  textArea,
  // weatherText,
} from "./MainPage.css";
import { appContainer } from "../../App.css";
import DatepickerModal from "../../components/ModalComponents/DatepickerModal/DatepickerModal";
import TaskModal from "../../components/ModalComponents/TaskModal/TaskModal";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import useModalStore, { toggleDatepickerModal, toggleLocationModal } from "../../store/modalStore";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";
import RegisterEditModal from "../../components/ModalComponents/RegisterEditModal/RegisterEditModal";
import CheckPasswordModal from "../../components/ModalComponents/RegisterEditModal/CheckPasswordModal/CheckPasswordModal";
import { useUserInfoStore } from "../../store/userInfoStore";

const MainPage = () => {
  const { loginModal, userEditModal, datepickerModal, taskModal, locationModal, registerModal, pwCheckModal } =
    useModalStore();
  const { currentLocation } = useUserInfoStore();

  return (
    <>
      {registerModal && <RegisterModal />}
      {loginModal && <LoginModal />}
      {userEditModal && <RegisterEditModal />}
      {pwCheckModal && <CheckPasswordModal />}
      {locationModal && <LocationModal />}
      {datepickerModal && <DatepickerModal />}
      {taskModal && <TaskModal />}
      <div className={appContainer}>
        <Header />
        <div className={pageContainer}>
          <div className={locationTextArea}>
            현재 지역은 {currentLocation ? currentLocation : "내 위치"} 입니다.
            <div className={locationChange} onClick={toggleLocationModal}>
              {" "}
              위치변경
            </div>
          </div>
          <div>
            <ListContainer />
          </div>
          <div className={textArea}>
            <div className={datePick} onClick={toggleDatepickerModal}>
              + 월별 일정 추가
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
