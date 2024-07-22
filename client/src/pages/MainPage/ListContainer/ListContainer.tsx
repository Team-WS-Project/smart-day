import List from "../List/List";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { arrowIcon, dailyTaskContainer, divArrow } from "./ListContainer.css";
import useMainStore, { changeDateAfter, changeDateBefore } from "../../../store/mainStore";
import { useEffect } from "react";
import dayjs from "dayjs";
import { getTaskListsAPI } from "../../../apis/mainPageAPI";

const ListContainer = () => {
  const { standardDate, dailyTaskLists, actions } = useMainStore();

  const startDate = dayjs(standardDate).format("YYYY-MM-DD");
  // const endDate = dayjs(standardDate).add(3, "day").format("YYYY-MM-DD");
  // console.log(startDate, endDate);

  const fetchTaskLists = async () => {
    try {
      const res = await getTaskListsAPI(startDate);

      console.log(res.data);
      const newTasks = res.data; // res.data는 array[0]~[3] 형태

      const updatedDailyTaskLists = dailyTaskLists.map((list) => {
        // 임시 작성 코드, 수정 필요!
        const tasksToSet = newTasks.filter((task) => task.listIndex === list.listIndex);
        return {
          ...list,
          tasks: tasksToSet,
        };
      });

      // 상태 업데이트
      actions.changeTaskLists(updatedDailyTaskLists);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   fetchTaskLists(startDate);
  // }, [standardDate]);

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
          <List key={index} listIndex={item.listIndex} tasks={item.tasks} />
        ))}
        <div className={divArrow}>
          <IoArrowForwardCircleOutline className={arrowIcon} onClick={clickRightArrow} />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
