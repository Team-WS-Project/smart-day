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
} from "./RegisterEditModal.css";
import { VscChromeClose } from "react-icons/vsc";
import { GoTag } from "react-icons/go";
import { toggleLocationModal, toggleLoginModal, toggleUserEditModal } from "../../../store/modalStore";
import { useChangeUserInfoStore } from "../../../store/changeUserInfoStore";
import { useUserInfoStore } from "../../../store/userInfoStore";
import { editUserInfoAPI } from "../../../apis/editUserInfoAPI";

const RegisterModal = () => {
  const { nickname } = useChangeUserInfoStore((state) => ({
    nickname: state.nickname,
  }));

  const [newNickName, setNickname] = useState("");

  const { currentLocation } = useUserInfoStore();
  const location = currentLocation;

  const handleRegister = async (location: string, newNickName: string) => {
    try {
      await editUserInfoAPI(location, newNickName);

      alert("회원정보를 수정했습니다! 로그인을 진행해주세요.");
      toggleUserEditModal();
      toggleLoginModal();
    } catch (error) {
      alert("회원정보 수정에 실패했습니다.");
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
            <GoTag />
          </div>
          <input
            className={inputBox}
            placeholder={`기존 닉네임 : ${nickname}`}
            value={newNickName}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={locationButton} onClick={toggleLocationModal}>
          위치 설정
        </div>
        <div className={registerButton} onClick={() => handleRegister(location, newNickName)}>
          회원정보 수정
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
