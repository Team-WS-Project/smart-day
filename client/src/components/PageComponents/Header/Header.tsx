import { useNavigate } from "react-router-dom";
import {
  headerButton,
  headerFooterContainer,
  headerNaviButtons,
  headerNavigator,
  headerTwoButtons,
  mainLogo,
} from "./Header.css";
import { toggleLoginModal, toggleRegisterModal } from "../../../store/store";

const Header = () => {
  const navigate = useNavigate();

  const gotoMainPage = () => {
    navigate("/");
  };

  const gotoSchedulePage = () => {
    navigate("/schedule");
  };

  const gotoCalendarPage = () => {
    navigate("/calendar");
  };

  const gotoTodolistPage = () => {
    navigate("/todolist");
  };

  /* 모달들은 스타일을 확인할 수 있게 새 페이지로 연결만 시켜놓았습니다. */
  // const openLoginModal = () => {
  //   navigate("/loginmodal");
  // };

  // const openUserEditModal = () => {
  //   navigate("/usereditmodal");
  // };
  /* ............................................................... */

  return (
    <div className={headerFooterContainer}>
      <div className={mainLogo} onClick={gotoMainPage}>
        SMART DAY
      </div>
      <div className={headerNavigator}>
        <div className={headerNaviButtons} onClick={gotoSchedulePage}>
          전체 일정
        </div>
        <div>|</div>
        <div className={headerNaviButtons}>날씨</div>
        <div>|</div>
        <div className={headerNaviButtons} onClick={gotoCalendarPage}>
          캘린더
        </div>
        <div>|</div>
        <div className={headerNaviButtons} onClick={gotoTodolistPage}>
          TodoList
        </div>
      </div>
      <div className={headerTwoButtons}>
        <button
          className={headerButton}
          onClick={toggleLoginModal} //
        >
          로그인
        </button>
        <button
          className={headerButton}
          onClick={toggleRegisterModal} //
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Header;
