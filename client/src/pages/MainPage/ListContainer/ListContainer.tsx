import List from "../List/List";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { arrowIcon, dailyTaskContainer, divArrow } from "./ListContainer.css";
import useMainStore, { changeDateAfter, changeDateBefore, clearMainTaskList } from "../../../store/mainStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import { getTaskListsAPI } from "../../../apis/mainPageAPI";
import { useUserInfoStore } from "../../../store/userInfoStore";
import useModalStore from "../../../store/modalStore";

interface Task {
  startTime: string;
  endTime: string;
}

const ListContainer = () => {
  const { standardDate, dailyTaskLists, actions } = useMainStore();
  const { userId } = useUserInfoStore();
  const { taskModal } = useModalStore();

  const fetchTaskLists = async () => {
    const startDate = dayjs(standardDate).format("YYYY-MM-DD");

    try {
      const res = await getTaskListsAPI(startDate);
      const newList = res?.data; // newList는 특정 객체 배열을 가진 배열

      newList.forEach((innerArray: Task[]) => {
        innerArray.forEach((item: Task) => {
          item.startTime = item.startTime.substring(0, 5);
          item.endTime = item.endTime.substring(0, 5);
        });
      });

      const updatedDailyTaskLists = dailyTaskLists.map((_, index) => ({
        tasks: newList[index], // tasks에 newList를 저장
      }));

      // 상태 업데이트
      actions.changeTaskLists(updatedDailyTaskLists);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      fetchTaskLists();
    }
  }, [standardDate, taskModal]);

  useEffect(() => {
    // setStandardDate();
    if (userId !== null) {
      fetchTaskLists();
    }
  }, [userId]);

  useEffect(() => {
    if (userId === null) {
      clearMainTaskList();
    }
  }, [userId]);

  const clickLeftArrow = () => {
    changeDateBefore();
  };

  const clickRightArrow = () => {
    changeDateAfter();
  };

  return (
    <div>
      <div className={dailyTaskContainer}>
        <div className={divArrow}>
          <IoArrowBackCircleOutline className={arrowIcon} onClick={clickLeftArrow} />
        </div>
        {dailyTaskLists.map((item, index) => (
          <List key={index} listIndex={index} tasks={item.tasks} />
        ))}
        <div className={divArrow}>
          <IoArrowForwardCircleOutline className={arrowIcon} onClick={clickRightArrow} />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
