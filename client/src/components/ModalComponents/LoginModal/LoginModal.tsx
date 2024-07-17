import React, { useState } from "react";
import {
  inputField,
  inputBox,
  loginClose,
  loginContainer,
  loginField,
  loginMain,
  inputIcon,
  loginButton,
  registerButton,
  wrapper,
} from "./LoginModal.css";
import { VscChromeClose } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toggleLoginModal, toggleRegisterModal } from "../../../store/store";

const LoginModal = () => {
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FaEyeSlash />);

  const handleToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  return (
    <div className={wrapper}>
      <div className={loginContainer}>
        <div className={loginClose} onClick={toggleLoginModal}>
          <VscChromeClose />
        </div>
        <div className={loginMain}>SMART DAY</div>
        <div className={loginField}>
          <div className={inputField}>
            <div className={inputIcon}>
              <CiMail />
            </div>

            <input className={inputBox} placeholder="아이디 (email)" />
          </div>
          <div className={inputField}>
            <div className={inputIcon}>
              <IoLockClosedOutline />
            </div>
            <input className={inputBox} placeholder="비밀번호" type={type} />
            <div className={inputIcon} onClick={handleToggle} style={{ cursor: "pointer" }}>
              {icon}
            </div>
          </div>
          <div className={loginButton}>로그인</div>
        </div>
        <div className={registerButton} onClick={toggleRegisterModal}>
          회원가입
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
