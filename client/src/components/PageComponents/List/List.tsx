import { FC } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { title, task, icon1, text2, text1, div1, icon2, div2, button1 } from "./List.css";

const List : FC = () => {
    return (
        <div className={div1}>
            <div className={title}>
                <text className={text1}>날짜</text>
                <text className={text2}>요일</text>
                <TiWeatherWindyCloudy className={icon1}/>
            </div>
            <div className={div2}>
                <div className={task}>
                    09:00 ~ 11:00
                    <br/>
                    운동
                </div>
                <FaRegTrashAlt className={icon2} />
            </div>
            <button className={button1}> + 새 일정 추가 </button>
        </div>
    );
}

export default List;
