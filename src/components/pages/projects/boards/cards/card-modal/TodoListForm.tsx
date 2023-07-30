import React, { useState } from "react";
import { Button } from "@mui/material";

// Redux
import { useAppDispatch, useAppSelector } from "../../../../../../app/hooks";
import { handleTodo } from "../../../../../../slices/userSlice";
import { getUrlIDs } from "../../../../../../slices/stateSlice";

// Components
import TodoComponent from "./TodoComponent";

// Style
import "../../../../../styles/projects/boards/cards/TodoListForm.css";

import { HandleTodoProps, Todo } from "../../../../../../types/types";
interface TodoListFormProps {
  todos: Todo[];
}

const TodoListForm: React.FC<TodoListFormProps> = (
  props: TodoListFormProps
) => {
  const dispatch = useAppDispatch();
  const { todos } = props;
  const [todoTitleState, setTodoTitleState] = useState<string>("");
  const { projectID, boardID, cardID } = useAppSelector(getUrlIDs);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      const addTodoArgs: HandleTodoProps = {
        todo: {
          title: todoTitleState,
          checked: false,
          todoID: todos.length === 0 ? 0 : todos[todos.length - 1].todoID + 1,
        },
        boardID: boardID,
        cardID: cardID,
        projectID: projectID,

        mode: "add",
      };
      dispatch(handleTodo(addTodoArgs));
    }

    setTodoTitleState("");
  };

  return (
    <form className='todo-list-form' onSubmit={handleAddTodo}>
      <div className='header3'>Todo list</div>

      <div className='todo-list-container'>
        {todos.map((todo, i) => (
          <TodoComponent todo={todo} key={i} />
        ))}
      </div>

      <div className='create-todo-container'>
        <input
          type='text'
          value={todoTitleState}
          placeholder='Add todo'
          aria-placeholder='Add todo'
          maxLength={50}
          onChange={(e) => setTodoTitleState(e.target.value)}
        />
        <Button
          type='submit'
          variant='contained'
          disabled={todoTitleState.trim() === ""}
        >
          Add
        </Button>
      </div>
    </form>
  );
};

export default TodoListForm;
