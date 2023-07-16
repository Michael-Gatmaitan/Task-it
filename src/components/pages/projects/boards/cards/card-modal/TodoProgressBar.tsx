import React, { useState, useEffect } from "react";
import { Todo } from "../../../../../../types/types";
import "../../../../../styles/projects/boards/cards/TodoProgressBar.css";

interface TodoProgressBarProps {
  selectedCardTodos: Todo[];
}

const TodoProgressBar: React.FC<TodoProgressBarProps> = (
  props: TodoProgressBarProps
) => {
  const { selectedCardTodos } = props;
  const [completed, setCompleted] = useState<number>(0);

  useEffect(() => {
    let completedCount = 0;
    selectedCardTodos.forEach((todo) => {
      if (todo.checked) {
        completedCount += 1;
      }
    });

    setCompleted(completedCount);
    console.log(
      completedCount,
      selectedCardTodos,
      `${(completedCount / selectedCardTodos.length) * 100}`
    );
  }, [selectedCardTodos]);

  const ProgressStyles: React.CSSProperties = {
    width: `${(completed / selectedCardTodos.length) * 100}%`,
  };

  return (
    <div className='todo-progress-container'>
      <div className='todo-progress-bar' style={ProgressStyles} />
    </div>
  );
};

export default TodoProgressBar;
