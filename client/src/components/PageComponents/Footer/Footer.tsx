import { headerFooterContainer } from "../Header/Header.css";
import { footerButton } from "./Footer.css";

const Footer = () => {
  return (
    <div className={headerFooterContainer}>
      <div className={footerButton}>수정 이력</div>
      <div className={footerButton}>도움말</div>
    </div>
  );
};

export default Footer;
