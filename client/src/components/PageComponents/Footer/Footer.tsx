import { useNavigate } from "react-router-dom"; // 임시 import
import { headerFooterContainer } from "../Header/Header.css";
import { footerButton } from "./Footer.css";

const Footer = () => {
  /* 임시 ...........................  */
  const navigate = useNavigate();

  const openLoggerModal = () => {
    navigate("/loggermodal");
  };
  /* ................................. */

  return (
    <div className={headerFooterContainer}>
      <div
        className={footerButton}
        onClick={openLoggerModal} //
      >
        수정 이력
      </div>
      <div className={footerButton}>도움말</div>
    </div>
  );
};

export default Footer;
