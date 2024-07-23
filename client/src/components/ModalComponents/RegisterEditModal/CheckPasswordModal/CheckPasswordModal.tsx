import { useState } from "react";
import {
  inputField,
  inputBox,
  pwCheckClose,
  pwCheckContainer,
  pwCheckField,
  pwCheckTitle,
  inputIcon,
  pwCheckButton,
  wrapper,
} from "./CheckPasswordModal.css";
import { VscChromeClose } from "react-icons/vsc";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { togglePWCheckModal, toggleUserEditModal } from "../../../../store/modalStore";
const CheckPasswordModal = () => {
  //   const { setUserId, setCurrentLocation } = useUserInfoStore((state) => state.actions);
  const [type, setType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  // const handleLogin = (password: string) => {
  //   try {

  //     if (respond !== undefined) {
  //       setUserId(respond.data[0].id);
  //       setCurrentLocation(respond.data[0].location);
  //       // setFavoriteLocation();
  //       toggleCheckPasswordModal();
  //     } else {
  //       throw Error;
  //     }
  //   } catch (err) {
  //     alert("로그인에 실패했습니다.");
  //   }
  // };

  return (
    <div className={wrapper}>
      <div className={pwCheckContainer}>
        <div className={pwCheckClose} onClick={togglePWCheckModal}>
          <VscChromeClose />
        </div>
        <div className={pwCheckTitle}>비밀번호를 입력해주세요</div>
        <div className={pwCheckField}>
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
          <div
            className={pwCheckButton}
            onClick={() => {
              togglePWCheckModal(), toggleUserEditModal();
            }}
          >
            비밀번호 확인
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPasswordModal;
