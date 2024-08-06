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
import { getUserInfoAPI } from "../../../../apis/getUserInfoAPI";
import { useChangeUserInfoStore } from "../../../../store/changeUserInfoStore";
const CheckPasswordModal = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEyeSlash />);
  const [password, setPassword] = useState("");
  const actions = useChangeUserInfoStore((state) => state.actions);

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
    setIcon((prevIcon) => (prevIcon.type === FaEyeSlash ? <FaEye /> : <FaEyeSlash />));
  };

  const handleGetUser = async () => {
    try {
      const res = await getUserInfoAPI(password);
      if (res) {
        actions.setNickname(res.nickname);
        togglePWCheckModal();
        toggleUserEditModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className={pwCheckButton} onClick={handleGetUser}>
            비밀번호 확인
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPasswordModal;
