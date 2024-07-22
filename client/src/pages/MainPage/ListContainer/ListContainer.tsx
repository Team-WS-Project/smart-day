import List from "../List/List";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { arrowIcon, dailyTaskContainer, divArrow } from "./ListContainer.css";
import useMainStore, { changeDateAfter, changeDateBefore } from "../../../store/mainStore";

const ListContainer = () => {
  const { dailyTaskLists } = useMainStore();

  return (
    <div>
      <div className={dailyTaskContainer}>
        <div className={divArrow}>
          <IoArrowBackCircleOutline
            className={arrowIcon}
            onClick={changeDateBefore}
          />
        </div>
        {
          dailyTaskLists.map((item, index) => (
            <List
              key={index}
              listIndex={item.listIndex}
              tasks={item.tasks}
            />
          ))
        }
        <div className={divArrow}>
          <IoArrowForwardCircleOutline
            className={arrowIcon}
            onClick={changeDateAfter}
          />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
