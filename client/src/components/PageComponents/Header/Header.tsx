import {
  headerButton,
  headerFooterContainer,
  headerNaviButtons,
  headerNavigator,
  headerTwoButtons,
  mainLogo,
} from "./Header.css";

const Header = () => {
  return (
    <div className={headerFooterContainer}>
      <div className={mainLogo}>SMART DAY</div>
      <div className={headerNavigator}>
        <div className={headerNaviButtons}>전체 일정</div>
        <div>|</div>
        <div className={headerNaviButtons}>날씨</div>
        <div>|</div>
        <div className={headerNaviButtons}>캘린더</div>
        <div>|</div>
        <div className={headerNaviButtons}>TodoList</div>
      </div>
      <div className={headerTwoButtons}>
        <button className={headerButton}>로그인</button>
        <button className={headerButton}>회원가입</button>
      </div>
    </div>
  );
};

export default Header;
