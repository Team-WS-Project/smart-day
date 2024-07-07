import { FC } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { task, text2, text1, newTaskButton, containerTitle, weatherIcon, trashIcon, taskListArea, taskListsContainerBox, taskDetail } from "./List.css";

const List : FC = () => {
    return (
        <div className={taskListsContainerBox}>
            <div className={containerTitle}>
                <text className={text1}>날짜</text>
                <text className={text2}>요일</text>
                <TiWeatherWindyCloudy className={weatherIcon}/>
            </div>
            <div className={taskListArea}>
                <div className={task}>
                    <div className={taskDetail}>
                        09:00 ~ 11:00
                        <br/>
                        운동
                    </div>
                    <FaRegTrashAlt className={trashIcon} />
                </div>
                <div className={task}>
                    <div className={taskDetail}>
                        09:00 ~ 11:00
                        <br/>
                        운동
                    </div>
                    <FaRegTrashAlt className={trashIcon} />
                </div>
                .<br/><br/>
                .<br/><br/>
                .<br/><br/>
                .<br/><br/>
                .<br/><br/>
                .<br/><br/>
                <div className={newTaskButton}>
                    + 새 일정 추가
                </div>
                
            </div>
        </div>
    );
}

export default List;