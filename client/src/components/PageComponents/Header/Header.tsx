import { useLocation, useNavigate } from "react-router-dom";
import {
  afterLogin,
  afterLoginContainer,
  afterLoginDropdown,
  afterLoginDropdownButton,
  headerButton,
  headerFooterContainer,
  headerNaviButtons,
  headerNavigator,
  headerTwoButtons,
  mainLogo,
} from "./Header.css";
import useModalStore, { toggleLoginModal, togglePWCheckModal, toggleRegisterModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { requestLogoutAPI } from "../../../apis/logoutAPI";
import useDailyTodoStore from "../../../store/todoStore";
import useDailyScheduleStore from "../../../store/dayStore";
import useScheduleStore from "../../../store/scheduleStore";
import { useWeatherStore } from "../../../store/weatherStore";

const Header = () => {
  const userId = useUserInfoStore((state) => state.userId);
  const nickname = useUserInfoStore((state) => state.nickname);
  const actions = useUserInfoStore((state) => state.actions);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const setLoginRedirectPath = useModalStore((state) => state.actions.setLoginRedirectPath);
  const loginRedirectPath = useModalStore((state) => state.loginRedirectPath);

  const clearTodo = useDailyTodoStore((state) => state.actions.clearTodo);
  const clearSchedule = useDailyScheduleStore((state) => state.actions.clearSchedule);
  const clear = useScheduleStore((state) => state.actions.clearSchedule);
  const clearWeatherData = useWeatherStore((state) => state.actions.clearWeatherData);
  const clearLocation = useUserInfoStore((state) => state.actions.clearCurrentLocation);

  const navigate = useNavigate();
  const location = useLocation();

  const gotoMainPage = () => {
    navigate("/");
    setLoginRedirectPath(null);
  };

  const gotoSchedulePage = () => {
    if (userId !== null) {
      navigate("/schedule");
    } else {
      toggleLoginModal();
      setLoginRedirectPath("/schedule");
    }
  };

  const gotoCalendarPage = () => {
    if (userId !== null) {
      navigate("/calendar");
    } else {
      toggleLoginModal();
      setLoginRedirectPath("/calendar");
    }
  };

  const gotoTodolistPage = () => {
    if (userId !== null) {
      navigate("/todolist");
    } else {
      toggleLoginModal();
      setLoginRedirectPath("/todolist");
    }
  };

  useEffect(() => {
    if (userId !== null && loginRedirectPath !== null) {
      navigate(loginRedirectPath);
    }
  }, [userId]);

  const handleLogout = async () => {
    try {
      await requestLogoutAPI();
      actions.setUserId(null);
      actions.setNickname(null);
      clearTodo();
      clearSchedule();
      clear();
      clearWeatherData();
      clearLocation();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={headerFooterContainer}>
      <div
        className={mainLogo}
        onClick={gotoMainPage}
        style={{ fontWeight: location.pathname === "/" ? "bold" : "normal" }}
      >
        SMART DAY
      </div>
      <div className={headerNavigator}>
        <div
          className={headerNaviButtons}
          onClick={gotoSchedulePage}
          style={{ fontWeight: location.pathname === "/schedule" ? "bold" : "normal" }}
        >
          전체 일정
        </div>
        <div>|</div>
        <div
          className={headerNaviButtons}
          onClick={gotoCalendarPage}
          style={{ fontWeight: location.pathname === "/calendar" ? "bold" : "normal" }}
        >
          캘린더
        </div>
        <div>|</div>
        <div
          className={headerNaviButtons}
          onClick={gotoTodolistPage}
          style={{ fontWeight: location.pathname === "/todolist" ? "bold" : "normal" }}
        >
          TodoList
        </div>
      </div>
      {userId !== null ? (
        <div className={afterLoginContainer}>
          <div className={afterLogin} onClick={() => setDropdownVisible(!dropdownVisible)}>
            {nickname !== null ? `${nickname}님, 안녕하세요!` : `${userId}님, 안녕하세요!`}
            <IoMdArrowDropdown />
          </div>
          <div className={afterLoginDropdown} style={{ display: dropdownVisible ? "block" : "none" }}>
            <button className={afterLoginDropdownButton} onClick={handleLogout}>
              로그아웃
            </button>
            <button className={afterLoginDropdownButton} onClick={togglePWCheckModal}>
              회원수정
            </button>
          </div>
        </div>
      ) : (
        <div className={headerTwoButtons}>
          <button className={headerButton} onClick={toggleLoginModal}>
            로그인
          </button>
          <button className={headerButton} onClick={toggleRegisterModal}>
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
