import { useState } from "react";
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
} from "./RegisterModal.css";
import { VscChromeClose } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { toggleLocationModal, toggleLoginModal, toggleRegisterModal } from "../../../store/modalStore";
import { requestRegisterAPI } from "../../../apis/registerAPI";
import { useUserInfoStore } from "../../../store/userInfoStore";

const RegisterModal = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEyeSlash />);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const { currentLocation } = useUserInfoStore();
  const location = currentLocation;

  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [iconConfirmPassword, setIconConfirmPassword] = useState(<FaEyeSlash />);

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  const handleToggleConfirmPassword = () => {
    setTypeConfirmPassword((prevType) => (prevType === "password" ? "text" : "password"));
    setIconConfirmPassword((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  const handleRegister = async (email: string, password: string, location: string, nickname: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식을 입력해주세요.");
    } else if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      try {
        const res = await requestRegisterAPI(email, password, location, nickname);
        if (res) {
          alert("회원가입에 성공하였습니다! 로그인을 진행해주세요.");
          toggleRegisterModal();
          toggleLoginModal();
        }
      } catch (error) {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <div className={wrapper}>
      <div className={registerContainer}>
        <div className={loginClose} onClick={toggleRegisterModal}>
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={locationButton} onClick={toggleLocationModal}>
          위치 설정
        </div>
        <div className={registerButton} onClick={() => handleRegister(email, password, location, nickname)}>
          회원가입
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
