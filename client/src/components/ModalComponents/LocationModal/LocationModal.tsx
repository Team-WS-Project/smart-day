import * as styles from "./LocationModal.css";
import locationDatas from "./locationDatas.json";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { toggleLocationModal, useUserInfoStore } from "../../../store/store";

const LocationModal = () => {
  const [state, setState] = useState({
    sido: "",
    sigungu: "",
    eupmyeon: "",
  });
  const { favoriteLocations, currentLocation } = useUserInfoStore((state) => ({
    favoriteLocations: state.favoriteLocations,
    currentLocation: state.currentLocation,
  }));

  const { addFavoriteLocation, deleteFavoriteLocation, setCurrentLocation } = useUserInfoStore((state) => ({
    addFavoriteLocation: state.actions.addFavoriteLocation,
    deleteFavoriteLocation: state.actions.deleteFavoriteLocation,
    setCurrentLocation: state.actions.setCurrentLocation,
  }));

  const handleSidoChange = (e) => {
    if (e.target.value === "") {
      return;
    }
    setState({ ...state, sido: e.target.value, sigungu: "" });
  };

  const handleSigunguChange = (e) => {
    if (e.target.value === "") {
      return;
    }

    setState({ ...state, sigungu: e.target.value });
    setCurrentLocation(`${state.sido} ${e.target.value}`);
  };

  // const handleEupmyeonChange = (e) => {};

  const handleAddFavorite = () => {
    if (favoriteLocations.length < 5) {
      addFavoriteLocation(currentLocation);
    } else {
      alert("즐겨찾기는 최대 5개까지 가능합니다.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <div className={styles.title}>지역 선택</div>
          <FiX className={styles.closeButton} onClick={toggleLocationModal} />
        </div>

        <select name="sido" className={styles.selectBox} value={state.sido} onChange={handleSidoChange}>
          <option value="">시/도 선택</option>
          {locationDatas.map((data) => (
            <option value={data.name}>{data.name}</option>
          ))}
        </select>

        <select name="sigungu" className={styles.selectBox} value={state.sigungu} onChange={handleSigunguChange}>
          <option value="">시/군/구 선택</option>
          {locationDatas.map((data) =>
            data.name === state.sido
              ? data.subArea.map((subAreaData) => (
                  <option key={subAreaData} value={subAreaData}>
                    {subAreaData}
                  </option>
                ))
              : null,
          )}
        </select>

        {/* <select
          name="Eupmyeon"
          className={styles.selectBox}
          value={eupmyeon}
          onChange={handleEupmyeonChange}
        >
          <option value="">읍/면/동 선택</option>
        </select> */}

        {/* minheight, ☆ - onclick */}
        <div className={styles.favoriteArea}>
          <div className={styles.subTitle}>즐겨찾기한 위치</div>
          {favoriteLocations.map((location, index) => (
            <div key={index} className={styles.locationItem}>
              {location}
              <TiStarFullOutline className={styles.starFilledIcon} onClick={() => deleteFavoriteLocation(location)} />
            </div>
          ))}
        </div>

        {/* minheight, ★ - onclick */}
        <div className={styles.currentLocationArea}>
          <div className={styles.subTitle}>현재 위치</div>
          <div className={styles.locationItem}>
            {currentLocation}
            {favoriteLocations.filter((favoriteLocation) => favoriteLocation === currentLocation).length === 0 ? (
              <TiStarOutline className={styles.starEmptyIcon} onClick={handleAddFavorite} />
            ) : (
              <TiStarFullOutline
                className={styles.starFilledIcon}
                onClick={() => deleteFavoriteLocation(currentLocation)}
              />
            )}
          </div>
        </div>
        <button className={styles.okButton} onClick={toggleLocationModal}>
          확인
        </button>
      </div>
    </div>
  );
};

export default LocationModal;
