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
import { toggleLoginModal, toggleRegisterModal } from "../../../store/modalStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import { requestLoginAPI } from "../../../apis/loginAPI";

const LoginModal = () => {
  const { setUserId, setCurrentLocation } = useUserInfoStore((state) => state.actions);
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const respond = await requestLoginAPI(email, password);
      if (respond !== undefined) {
        setUserId(respond.data[0].id);
        setCurrentLocation(respond.data[0].location);
        // setFavoriteLocation();
        toggleLoginModal();
      } else {
        throw Error;
      }
    } catch (err) {
      alert("로그인에 실패했습니다.");
    }
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

            <input
              className={inputBox}
              placeholder="아이디 (email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={inputField}>
            <div className={inputIcon}>
              <IoLockClosedOutline />
            </div>
            <input
              className={inputBox}
              placeholder="비밀번호"
              type={type}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={inputIcon} onClick={handleToggle} style={{ cursor: "pointer" }}>
              {icon}
            </div>
          </div>
          <div className={loginButton} onClick={() => handleLogin(email, password)}>
            로그인
          </div>
        </div>
        <div
          className={registerButton}
          onClick={() => {
            toggleLoginModal(), toggleRegisterModal();
          }}
        >
          회원가입
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
