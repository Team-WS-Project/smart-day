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
import { useUserInfoStore } from "../../store/userInfoStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CalendarPage = () => {
  const { loginModal, userEditModal, locationModal, registerModal, pwCheckModal } = useModalStore();
  const userId = useUserInfoStore((state) => state.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
  }, [navigate]);

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
