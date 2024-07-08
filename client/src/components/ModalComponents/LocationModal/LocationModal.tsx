// LocationModal.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSido,
  setSigungu,
  setEupmyeon,
  addFavoriteLocation,
  setCurrentLocation,
} from "../../../redux/locationSlice";
import * as styles from "./LocationModal.css";
import locationDatas from "./locationDatas.json";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { FiX } from "react-icons/fi";

const LocationModal = () => {
  const dispatch = useDispatch();
  const { sido, sigungu, eupmyeon, favoriteLocations, currentLocation } = useSelector((state) => state.location);

  const handleSidoChange = (e) => {
    dispatch(setSido(e.target.value));
    dispatch(setSigungu(""));
  };

  const handleSigunguChange = (e) => {
    dispatch(setSigungu(e.target.value));
  };

  const handleEupmyeonChange = (e) => {
    dispatch(setEupmyeon(e.target.value));
  };

  const handleAddFavorite = () => {
    dispatch(addFavoriteLocation(currentLocation));
  };

  const handleSetCurrentLocation = (location) => {
    dispatch(setCurrentLocation(location));
  };

  console.log(locationDatas);

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalContainer}>
        <div className={styles.header}>
          <div className={styles.title}>지역 선택</div>
          <FiX className={styles.closeButton} />
        </div>

        <select name="sido" className={styles.selectBox} value={sido} onChange={handleSidoChange}>
          <option value="">시/도 선택</option>
          {locationDatas.map((data) => (
            <option value={data.name}>{data.name}</option>
          ))}
        </select>

        <select name="sigungu" className={styles.selectBox} value={sigungu} onChange={handleSigunguChange}>
          <option value="">시/군/구 선택</option>
          {locationDatas.map((data) =>
            data.name === sido
              ? data.subArea.map((subAreaData) => (
                  <option onClick={handleSetCurrentLocation(`${sido} ${sigungu}`)} value={subAreaData}>
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
              <TiStarFullOutline className={styles.starFilledIcon} />
            </div>
          ))}
        </div>

        {/* minheight, ★ - onclick */}
        <div className={styles.currentLocationArea}>
          <div className={styles.subTitle}>현재 위치</div>
          <div className={styles.locationItem}>
            {currentLocation}
            <TiStarOutline className={styles.starEmptyIcon} onClick={handleAddFavorite} />
          </div>
        </div>
        <button className={styles.okButton}>확인</button>
      </div>
    </div>
  );
};

export default LocationModal;
