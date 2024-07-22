import { changeCompleted } from "../../../apis/todolistAPIs";
import { toggleTodoScheduleModal } from "../../../store/modalStore";
import { checkBox, descriptionArea, dueDateArea, todoContainer } from "./Todo.css";

type TodoProps = {
  id: number;
  completed: boolean;
  title: string;
  dueDate: string;
  onCheckboxChange: () => void; // 부모에서 전달된 체크박스 변경 핸들러
};

const Todo = ({ id, completed, title, dueDate, onCheckboxChange }: TodoProps) => {
  return (
    <div className={todoContainer}>
      <input
        type="checkbox"
        className={checkBox}
        checked={completed} // 부모에서 전달된 completed 상태 사용
        onChange={async () => {
          try {
            await changeCompleted(id);
            onCheckboxChange();
          } catch (error) {
            alert("서버로의 요청이 실패했습니다.");
          }
        }} // onChange로 처리
      />
      <div className={descriptionArea} onClick={toggleTodoScheduleModal}>
        {title}
      </div>
      <div className={dueDateArea}>{dueDate.slice(-5)}</div>
    </div>
  );
};

export default Todo;
