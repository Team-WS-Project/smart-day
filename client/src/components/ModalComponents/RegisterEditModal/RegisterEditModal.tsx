import React, { useState } from "react";
import {
  inputField,
  inputBox,
  loginClose,
  registerContainer,
  loginMain,
  locationButton,
  inputIcon,
  registerButton,
  wrapper,
} from "./RegisterEditModal.css";
import { VscChromeClose } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { toggleLocationModal, toggleLoginModal, toggleUserEditModal } from "../../../store/modalStore";
import { requestRegisterAPI } from "../../../apis/registerAPI";
import { useChangeUserInfoStore } from "../../../store/changeUserInfoStore";
import { useUserInfoStore } from "../../../store/userInfoStore";

const RegisterModal = () => {
  const { email, nickname } = useChangeUserInfoStore((state) => ({
    email: state.email,
    nickname: state.nickname,
  }));
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FaEyeSlash />);

  const [newEmail, setEmail] = useState(email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newNickName, setNickname] = useState(nickname || "");

  const { currentLocation } = useUserInfoStore();
  const location = currentLocation;

  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [iconConfirmPassword, setIconConfirmPassword] = useState(<FaEyeSlash />);

  const handleToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
    setTypeConfirmPassword((prevType) => (prevType === "password" ? "text" : "password"));
    setIconConfirmPassword((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  const handleRegister = async (newEmail: string, password: string, location: string, newNickName: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(newEmail)) {
      alert("올바른 이메일 형식을 입력해주세요.");
    } else if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      try {
        await requestRegisterAPI(newEmail, password, location, newNickName);

        alert("회원정보를 수정했습니다! 로그인을 진행해주세요.");
        toggleUserEditModal();
        toggleLoginModal();
      } catch (error) {
        alert("회원정보 수정에 실패했습니다.");
      }
    }
  };

  return (
    <div className={wrapper}>
      <div className={registerContainer}>
        <div className={loginClose} onClick={toggleUserEditModal}>
          <VscChromeClose />
        </div>
        <div className={loginMain}>SMART DAY</div>

        <div className={inputField}>
          <div className={inputIcon}>
            <CiMail />
          </div>

          <input
            className={inputBox}
            placeholder="아이디 (email)"
            value={newEmail}
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
        <div className={inputField}>
          <div className={inputIcon}>
            <IoLockClosedOutline />
          </div>
          <input
            className={inputBox}
            placeholder="비밀번호 확인"
            type={typeConfirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className={inputIcon} onClick={handleToggleConfirmPassword}>
            {iconConfirmPassword}
          </div>
        </div>
        <div className={inputField}>
          <div className={inputIcon}>
            <GoTag />
          </div>
          <input
            className={inputBox}
            placeholder="닉네임"
            value={newNickName}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={locationButton} onClick={toggleLocationModal}>
          위치 설정
        </div>
        <div className={registerButton} onClick={() => handleRegister(newEmail, password, location, newNickName)}>
          회원정보 수정
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
