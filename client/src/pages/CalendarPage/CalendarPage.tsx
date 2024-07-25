import { appContainer } from "../../App.css";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import Footer from "../../components/PageComponents/Footer/Footer";
import Header from "../../components/PageComponents/Header/Header";
import { calendarPageBody } from "./CalendarPage.css";
import useModalStore from "../../store/modalStore";
import RegisterModal from "../../components/ModalComponents/RegisterModal/RegisterModal";
import LoginModal from "../../components/ModalComponents/LoginModal/LoginModal";
import RegisterEditModal from "../../components/ModalComponents/RegisterEditModal/RegisterEditModal";
import CheckPasswordModal from "../../components/ModalComponents/RegisterEditModal/CheckPasswordModal/CheckPasswordModal";
import LocationModal from "../../components/ModalComponents/LocationModal/LocationModal";

const CalendarPage = () => {
  const { loginModal, userEditModal, locationModal, registerModal, pwCheckModal } = useModalStore();

  return (
    <>
      {" "}
      {registerModal && <RegisterModal />}
      {loginModal && <LoginModal />}
      {userEditModal && <RegisterEditModal />}
      {pwCheckModal && <CheckPasswordModal />}
      {locationModal && <LocationModal />}
      <div className={appContainer}>
        <Header />
        <div className={calendarPageBody}>
          <CalendarComponent />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CalendarPage;
