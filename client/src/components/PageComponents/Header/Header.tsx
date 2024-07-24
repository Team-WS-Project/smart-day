import { useNavigate } from "react-router-dom";
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
import { toggleLoginModal, togglePWCheckModal, toggleRegisterModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { requestLogoutAPI } from "../../../apis/logoutAPI";

const Header = () => {
  const userId = useUserInfoStore((state) => state.userId);
  const nickname = useUserInfoStore((state) => state.nickname);
  const actions = useUserInfoStore((state) => state.actions);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const gotoMainPage = () => {
    navigate("/");
  };

  const gotoSchedulePage = () => {
    if (userId !== null) {
      navigate("/schedule");
    } else {
      toggleLoginModal();
    }
  };

  const gotoCalendarPage = () => {
    if (userId !== null) {
      navigate("/calendar");
    } else {
      toggleLoginModal();
    }
  };

  const gotoTodolistPage = () => {
    if (userId !== null) {
      navigate("/todolist");
    } else {
      toggleLoginModal();
    }
  };

  const handleLogout = async () => {
    try {
      await requestLogoutAPI();
      actions.setUserId(null);
      actions.setNickname(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
