import { FC } from "react";
import List from "../List/List";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { arrowIcon, dailyTaskContainer, divArrow } from "./ListContainer.css";

const ListContainer : FC = () => {
    const temp = [1, 2, 3, 4];

    return (
        <div>
            <div className={dailyTaskContainer}>
                <div className={divArrow}>
                    <IoArrowBackCircleOutline className={arrowIcon} />
                </div>
                {
                    temp.map(() => (
                        <List />
                    ))
                }
                <div className={divArrow}>
                    <IoArrowForwardCircleOutline className={arrowIcon} />
                </div>
            </div>
        </div>
    );
}

export default ListContainer;
