import { changeCompleted } from "../../../apis/todolistAPIs";
import { toggleTodoScheduleModal } from "../../../store/modalStore";
import useTodoScheduleStore from "../../../store/todoScheduleStore";
import { checkBox, descriptionArea, dueDateArea, todoContainer } from "./Todo.css";

type TodoProps = {
  id: number;
  completed: boolean;
  title: string;
  dueDate: string;
  onCheckboxChange: () => void;
};

const Todo = ({ id, completed, title, dueDate, onCheckboxChange }: TodoProps) => {
  const { setSelectedTodoId } = useTodoScheduleStore();

  return (
    <div className={todoContainer}>
      <input
        type="checkbox"
        className={checkBox}
        checked={completed}
        onChange={async () => {
          try {
            await changeCompleted(id);
            onCheckboxChange();
          } catch (error) {
            alert("서버로의 요청이 실패했습니다.");
          }
        }}
      />
      <div
        className={descriptionArea}
        onClick={() => {
          toggleTodoScheduleModal();
          setSelectedTodoId(id);
        }}
      >
        {title}
      </div>
      <div
        className={dueDateArea}
        onClick={() => {
          toggleTodoScheduleModal();
          setSelectedTodoId(id);
        }}
      >
        {dueDate.slice(-5)}
      </div>
    </div>
  );
};

export default Todo;
