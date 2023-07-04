import React, { useState, useMemo } from "react";
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
    [projectID, boardID, cardID, activeUser]
  );

  // Tags state
  const [newCardTag, setNewCardTag] = useState<string>("");

  const [initialTodo, setInitialTodo] = useState<Todo>({
    title: "",
    checked: false,
    todoID: 0,
  });

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleAddCardTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form className='add-card-tag' onSubmit={handleAddCardTag}>
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

        <form className='todo-list-form' onSubmit={handleAddTodo}>
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
            type='submit'
            variant='contained'
            disabled={initialTodo.title.trim() === ""}
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
  const params = useParams<ReactRouterParamsType>();
  const { projectID, boardID, cardID } = params;

  const [todoState, setTodoState] = useState<Todo>(todo);

  const onInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(`Changing todo state in ${projectID}/${boardID}/${cardID}`);
    // We need to edit todo data if checkbox value is changed
    if (name === "checked") {
      setTodoState((prevState) => ({
        ...prevState,
        checked: !prevState.checked,
      }));
    } else if (name === "title") {
      // valid title change
      setTodoState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // This fires when user leaves foccus on editing the todo's title
  // or checking and unchecking of check box.
  const onReadyEditTodo = () => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      // Check if title leaved is empty
      // reset the title to previous value
      // but do not update on redux store
      if (todoState.title.trim() === "") {
        setTodoState((prevState) => ({
          ...prevState,
          title: todo.title,
        }));

        console.warn("Empty title detected.");
        return;
      }

      // If nothing in state changed, do nothing or dont fire reducer editTodo
      if (todoState.title === todo.title && todoState.checked === todo.checked)
        return;

      const editTodoArgs: HandleTodoProps = {
        todo: todoState,
        projectID: parseInt(projectID),
        boardID: parseInt(boardID),
        cardID: parseInt(cardID),

        mode: "edit",
      };

      console.log("Dispatch runned");
      dispatch(handleTodo(editTodoArgs));
      return;
    }

    console.log("Editing not occured");
  };

  const onReadyDeleteTodo = () => {
    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
      // Perfoem todo deletion
      console.log("Delete");
      dispatch(
        handleTodo({
          todo: todoState,
          projectID: parseInt(projectID),
          boardID: parseInt(boardID),
          cardID: parseInt(cardID),

          mode: "delete",
        })
      );
    }
  };

  return (
    <div className='todo'>
      <input
        type='checkbox'
        name='checked'
        checked={todoState.checked}
        onChange={onInputChanges}
        onBlur={onReadyEditTodo}
      />

      <input
        type='text'
        name='title'
        value={todoState.title}
        className='todo-title body-text'
        onBlur={onReadyEditTodo}
        onChange={onInputChanges}
      />

      <div className='delete-todo' onClick={onReadyDeleteTodo}>
        <CloseRounded fontSize='small' />
      </div>
    </div>
  );
};

export default SelectedCardModal;
