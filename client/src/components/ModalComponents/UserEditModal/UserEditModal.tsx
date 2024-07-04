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
} from "./UserEditModal.css";
import { VscChromeClose } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoTag } from "react-icons/go";

const UserEditModal = () => {
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FaEyeSlash />);

  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [iconConfirmPassword, setIconConfirmPassword] = useState(
    <FaEyeSlash />
  );

  const handleToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) =>
      prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />
    );
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
    setTypeConfirmPassword((prevType) =>
      prevType === "password" ? "text" : "password"
    );
    setIconConfirmPassword((prevIcon) =>
      prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />
    );
  };

  return (
    <div className={wrapper}>
      <div className={registerContainer}>
        <div className={loginClose}>
          <VscChromeClose />
        </div>
        <div className={loginMain}>SMART DAY</div>

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
          <div
            className={inputIcon}
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
          >
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
          />
          <div
            className={inputIcon}
            onClick={handleToggleConfirmPassword}
            style={{ cursor: "pointer" }}
          >
            {iconConfirmPassword}
          </div>
        </div>
        <div className={inputField}>
          <div className={inputIcon}>
            <GoTag />
          </div>
          <input className={inputBox} placeholder="닉네임" />
        </div>
        <div className={locationButton}>위치 설정</div>
        <div className={registerButton}>회원 정보 수정</div>
      </div>
    </div>
  );
};

export default UserEditModal;
