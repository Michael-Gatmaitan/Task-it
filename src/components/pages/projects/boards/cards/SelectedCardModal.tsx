import React, { useState, useMemo, useDeferredValue, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Chip, Button } from "@mui/material";
import "../../../../styles/projects/boards/cards/SelectedCardModal.css";

import type {
  Card,
  Todo,
  HandleTodoProps,
  ReactRouterParamsType,
} from "../../../../../types/types";
import { handleTodo, getActiveUser } from "../../../../../slices/userSlice";
import { CloseRounded } from "@mui/icons-material";

const SelectedCardModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projectID, boardID, cardID } = useParams();

  const navigate = useNavigate();

  const activeUser = useAppSelector(getActiveUser);

  const selectedCard: Card | undefined = useMemo(
    () =>
      projectID !== undefined && boardID !== undefined && cardID !== undefined
        ? activeUser.projects
            .find((pr) => pr.projectID === parseInt(projectID))
            ?.boards.find((brd) => brd.boardID === parseInt(boardID))
            ?.cards.find((crd) => crd.cardID === parseInt(cardID))
        : undefined,
    [projectID, boardID, cardID, activeUser.projects]
  );

  // Tags state
  const [newCardTag, setNewCardTag] = useState<string>("");

  const [initialTodo, setInitialTodo] = useState<Todo>({
    title: "",
    checked: false,
    todoID: Number.MAX_VALUE,
  });

  const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      const addTodoArgs: HandleTodoProps = {
        todo: initialTodo,
        boardID: parseInt(boardID),
        cardID: parseInt(cardID),
        projectID: parseInt(projectID),

        mode: "add",
      };
      dispatch(handleTodo(addTodoArgs));

      setInitialTodo((prevState) => ({ ...prevState, title: "" }));
    }
  };

  return selectedCard !== undefined && projectID !== undefined ? (
    <div
      className='selected-card-modal-bg'
      onClick={() =>
        navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`)
      }
    >
      <div className='selected-card-modal' onClick={(e) => e.stopPropagation()}>
        <div className='selected-card-nav'>
          <div className='header2'>{selectedCard.cardTitle}</div>

          <div
            className='close-card-modal'
            onClick={() =>
              navigate(`/${activeUser.userID}/projects/${parseInt(projectID)}`)
            }
          >
            <CloseRounded fontSize='small' />
          </div>
        </div>

        <div className='card-description body-text'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia
          inventore, ut eligendi pariatur ipsam dolores consequatur molestias
          facere, dolorem provident alias sed ab atque a vel natus dignissimos
          nostrum incidunt! Suscipit quisquam illo deserunt, impedit autem
          cupiditate eos alias aliquam vel, mollitia, laudantium dicta soluta
          iure fugiat iste atque facere. Saepe deserunt incidunt aliquid
          repellat ratione dignissimos aut fugiat veritatis?
        </div>

        <div className='card-tags'>
          {selectedCard.cardTags.map((cardTag) => (
            <Chip label={cardTag} />
          ))}
        </div>

        {/* Submit : addCardTag */}
        <form className='add-card-tag'>
          <div className='header3'>Add Card Tag</div>

          <TextField
            variant='outlined'
            label='Add card tag'
            onChange={(e) => setNewCardTag(e.target.value)}
          />

          <Button
            type='submit'
            disabled={newCardTag.trim() === ""}
            variant='contained'
          >
            Add
          </Button>
        </form>

        <form className='todo-list-form'>
          <div className='header3'>Todo list</div>

          <div className='todo-list-container'>
            {selectedCard.todos.map((todo, i) => (
              <TodoComponent todo={todo} key={i} />
            ))}
          </div>

          <input
            type='text'
            value={initialTodo.title}
            onChange={(e) =>
              setInitialTodo((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Button
            variant='contained'
            disabled={initialTodo.title.trim() === ""}
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div>undefined selectedCard</div>
  );
};

const TodoComponent: React.FC<{ todo: Todo }> = ({ todo }) => {
  const dispatch = useAppDispatch();
  // const { projectID, boardID, cardID } = useParams();
  const { projectID, boardID, cardID } = useParams<ReactRouterParamsType>();

  const [todoState, setTodoState] = useState<Todo>(todo);

  const onTodoStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // We need to edit todo data if checkbox value is changed
    if (name === "checked") {
      setTodoState((prevState) => ({
        ...prevState,
        checked: !prevState.checked,
      }));
      todoTitleInputBlur();
      return;
    }

    setTodoState((prevState) => ({ ...prevState, [name]: value }));
  };

  const todoTitleInputBlur = () => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      if (todoState.title.trim() === "") {
        // If user blur but leaves empty input edit, set the
        // todoState.title to its original val which is todo.title
        setTodoState((prevState) => ({
          ...prevState,
          title: todo.title,
        }));
        return;
      }

      //
      if (todoState.title === todo.title) return;

      const editTodoArgs: HandleTodoProps = {
        todo: todoState,
        projectID: parseInt(projectID),
        boardID: parseInt(boardID),
        cardID: parseInt(cardID),

        mode: "edit",
      };
      dispatch(handleTodo(editTodoArgs));
    }
  };

  return (
    <div className='todo'>
      <input
        type='checkbox'
        name='checked'
        checked={todoState.checked}
        onChange={onTodoStateChange}
      />
      <input
        type='box'
        name='title'
        value={todoState.title}
        className='todo-title body-text'
        onBlur={todoTitleInputBlur}
        onChange={onTodoStateChange}
      />
    </div>
  );
};

export default SelectedCardModal;
