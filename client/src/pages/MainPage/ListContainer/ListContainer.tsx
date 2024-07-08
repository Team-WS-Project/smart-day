import List from "../List/List";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { arrowIcon, dailyTaskContainer, divArrow } from "./ListContainer.css";

const ListContainer = () => {
  return (
    <div>
      <div className={dailyTaskContainer}>
        <div className={divArrow}>
          <IoArrowBackCircleOutline className={arrowIcon} />
        </div>
        <List />
        <List />
        <List />
        <List />
        <div className={divArrow}>
          <IoArrowForwardCircleOutline className={arrowIcon} />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
