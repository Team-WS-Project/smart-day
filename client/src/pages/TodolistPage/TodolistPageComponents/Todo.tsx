import { toggleTodoScheduleModal } from "../../../store/modalStore";
import { checkBox, descriptionArea, dueDateArea, todoContainer } from "./Todo.css";

type TodoProps = {
  completed: boolean;
  description: string;
  dueDate: Date;
  onCheckboxChange: () => void; // 부모에서 전달된 체크박스 변경 핸들러
};

const Todo = ({ completed, description, dueDate, onCheckboxChange }: TodoProps) => {
  return (
    <div className={todoContainer}>
      <input
        type="checkbox"
        className={checkBox}
        checked={completed} // 부모에서 전달된 completed 상태 사용
        onChange={onCheckboxChange} // onChange로 처리
      />
      <div className={descriptionArea} onClick={toggleTodoScheduleModal}>
        {description}
      </div>
      <div
        className={dueDateArea}
      >{`${String(dueDate.getMonth() + 1).padStart(2, "0")}-${String(dueDate.getDate()).padStart(2, "0")}`}</div>
    </div>
  );
};

export default Todo;
