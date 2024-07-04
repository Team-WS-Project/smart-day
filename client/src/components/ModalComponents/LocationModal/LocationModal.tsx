import { FiX } from "react-icons/fi";
import {
  body,
  closeButton,
  footer,
  header,
  modalWindow,
  okButton,
  title,
  wrapper,
} from "./LocationModal.css";

const LocationModal = () => {
  return (
    <div className={wrapper}>
      <div className={modalWindow}>
        <div className={header}>
          <div className={title}>지역 선택</div>
          <FiX className={closeButton} />
        </div>
        <div className={body}></div>
        <div className={footer}>
          <div className={okButton}>확인</div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
