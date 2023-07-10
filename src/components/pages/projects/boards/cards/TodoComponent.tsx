import React, { useRef, useEffect, memo } from "react";
import { useAppDispatch } from "../../../../../app/hooks";
import { useParams } from "react-router";
import { handleTodo } from "../../../../../slices/userSlice";

//  Types
import type { Todo, ReactRouterParamsType } from "../../../../../types/types";

// Mui
import { CloseRounded } from "@mui/icons-material";

// Style
import "../../../../styles/projects/boards/cards/TodoComponent.css";

// eslint-disable-next-line react-refresh/only-export-components
const TodoComponent: React.FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const params = useParams<ReactRouterParamsType>();
  const { projectID, boardID, cardID } = params;

  // const { projectID, boardID, cardID } = params;
  const { title, checked } = todo;
  // const [initialTitle, setInitialTitle] = useState<string>(title);

  const inputTitleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputTitleRef.current !== null) {
      inputTitleRef.current.value = title;
      console.log("Titleref changed");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const onEditTodo = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      if (e.target.name === "title") {
        if (e.target.value.trim() === "") {
          e.target.value = title;
        } else if (e.target.value === title) {
          // If nothing is changed in title, do nothing.
          return;
        }

        dispatch(
          handleTodo({
            todo: {
              title: e.target.value,
              checked: checked,
              todoID: todo.todoID,
            },
            projectID: parseInt(projectID),
            boardID: parseInt(boardID),
            cardID: parseInt(cardID),
            mode: "edit",
          })
        );

        e.target.style.width = `${e.target.value.length}ch`;
      } else if (e.target.name === "checked") {
        dispatch(
          handleTodo({
            todo: {
              title: title,
              checked: !checked,
              todoID: todo.todoID,
            },
            projectID: parseInt(projectID),
            boardID: parseInt(boardID),
            cardID: parseInt(cardID),
            mode: "edit",
          })
        );
      }
    }
  };

  const onDeleteTodo = () => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      dispatch(
        handleTodo({
          todo: {
            title: title,
            checked: checked,
            todoID: todo.todoID,
          },
          projectID: parseInt(projectID),
          boardID: parseInt(boardID),
          cardID: parseInt(cardID),
          mode: "delete",
        })
      );
    }
  };

  // const initializedTitle = useMemo(() => {

  // })

  return (
    <div className='todo'>
      <input
        type='checkbox'
        name='checked'
        defaultChecked={checked}
        // onChange={() => setTodoChecked(!checked)}
        onChange={onEditTodo}
      />

      <input
        type='text'
        name='title'
        defaultValue={title}
        ref={inputTitleRef}
        style={{
          width: `${title.length}ch`,
        }}
        onChange={(e) => {
          e.target.style.width = `${e.target.value.length}ch`;
        }}
        maxLength={50}
        // onChange={onEditTodo}
        onBlur={onEditTodo}
        className='todo-title body-text'
      />

      <div className='delete-todo' onClick={onDeleteTodo}>
        <CloseRounded fontSize='small' />
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(TodoComponent);
