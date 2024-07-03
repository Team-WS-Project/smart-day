import { FC } from "react";
import List from "../List/List";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { div1, div2, div3, icon1 } from "./ListContainer.css";

const ListContainer : FC = () => {
    const temp = [1, 2, 3, 4];

    return (
        <div className={div1}>
            <div className={div2}>
                <div className={div3}>
                    <IoArrowBackCircleOutline className={icon1} />
                </div>
                {
                    temp.map(() => (
                        <div>
                            <List />
                        </div>
                    ))
                }
                <div className={div3}>
                    <IoArrowForwardCircleOutline className={icon1} />
                </div>
            </div>
        </div>
    );
}

export default ListContainer;
