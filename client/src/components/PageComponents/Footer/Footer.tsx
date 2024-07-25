import { headerFooterContainer } from "../Header/Header.css";
import { footerText } from "./Footer.css";

const Footer = () => {
  return (
    <div className={headerFooterContainer}>
      <div className={footerText}>완승팀🐣</div>
      <div className={footerText}>Copyright ⓒ 2024</div>
    </div>
  );
};

export default Footer;
