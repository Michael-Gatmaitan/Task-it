import { PayloadAction as PA } from "@reduxjs/toolkit";

import {
  Card,
  HandleTodoProps,
  CardTagPayloadProps,
  CardTag,
  AppState,
} from "../../types/types";

const cardReducers = {
  // Card reducers

  addCard(
    state: AppState,
    action: PA<{
      projectID: number;
      boardID: number;
      newCard: Card;
    }>
  ) {
    const { projectID, boardID, newCard } = action.payload;

    if (projectID === -1) {
      console.error("Add card: projectID has value of ", projectID);
      return;
    }
    const { projects } = state.activeUser;
    const projectIdx = projects.findIndex((prj) => prj.projectID === projectID);
    const boardIdx = projects[projectIdx].boards.findIndex(
      (brd) => brd.boardID === boardID
    );
    // Change the cardID value
    const cardOfBoards = projects[projectIdx].boards[boardIdx].cards;
    newCard.cardID =
      cardOfBoards.length === 0
        ? 0
        : cardOfBoards[cardOfBoards.length - 1].cardID + 1;
    // Setting card values from payload
    const newCardToAdd: Card = {
      cardTitle: newCard.cardTitle,
      cardTags: newCard.cardTags,
      cardID: newCard.cardID,
      todos: newCard.todos,
    };
    state.activeUser.projects[projectIdx].boards[boardIdx].cards.push(
      newCardToAdd
    );
  },

  handleCardTag(state: AppState, action: PA<CardTagPayloadProps>) {
    const { type: actionType, idPaths } = action.payload;
    const { projectID, boardID, cardID } = idPaths;

    const PARAMS_NOT_UNDEFINED =
      projectID !== undefined && boardID !== undefined && cardID !== undefined;

    if (PARAMS_NOT_UNDEFINED) {
      const { projects } = state.activeUser;
      const projectIDX = projects.findIndex(
        (p) => p.projectID === parseInt(projectID)
      );
      const boardIDX = projects[projectIDX].boards.findIndex(
        (b) => b.boardID === parseInt(boardID)
      );
      const cardIDX = projects[projectIDX].boards[boardIDX].cards.findIndex(
        (c) => c.cardID === parseInt(cardID)
      );

      const { cardTags: cardTags_STATE } =
        projects[projectIDX].boards[boardIDX].cards[cardIDX];

      const cardTagActions = {
        add() {
          if (actionType !== "add") return;

          const cardTagsLen = cardTags_STATE.length;
          const customCardTagID =
            cardTagsLen === 0
              ? 0
              : cardTags_STATE[cardTagsLen - 1].cardTagID + 1;

          const newCardTag: CardTag = {
            cardTagTitle: action.payload.cardTagTitle,
            cardTagID: customCardTagID,
          };

          cardTags_STATE[cardTagsLen] = newCardTag;

          console.log("Add card");
        },
        delete() {
          if (actionType !== "delete") return;

          const idxOfCardTagToDelete = cardTags_STATE.findIndex(
            (ct) =>
              actionType === "delete" &&
              ct.cardTagID === action.payload.cardTagID
          );

          cardTags_STATE.splice(idxOfCardTagToDelete, 1);
        },
      };

      switch (actionType) {
        case "add": {
          cardTagActions.add();

          break;
        }
        case "delete": {
          cardTagActions.delete();
          break;
        }
      }
    }
  },

  // Todo reducers
  handleTodo(state: AppState, action: PA<HandleTodoProps>) {
    const { todo, boardID, cardID, projectID, mode } = action.payload;
    const { projects } = state.activeUser;
    const project = projects.findIndex((p) => p.projectID === projectID);
    const board = projects[project].boards.findIndex(
      (b) => b.boardID === boardID
    );
    const card = projects[project].boards[board].cards.findIndex(
      (c) => c.cardID === cardID
    );

    const cardTodos_STATE =
      state.activeUser.projects[project].boards[board].cards[card].todos;

    // mode: 'add'
    const addTodo = () => {
      cardTodos_STATE.push(todo);
    };

    // mode: 'edit'
    const editTodo = () => {
      // Assume that todo.todoID is not Number.MAX_INT
      const todoIndex = cardTodos_STATE.findIndex(
        (t) => t.todoID === todo.todoID
      );

      cardTodos_STATE[todoIndex] = todo;

      console.log("Todo edited with: ", todo);
    };

    // mode: 'delete'
    const deleteTodo = () => {
      const indexOfTodoToDelete = cardTodos_STATE.findIndex(
        (t) => t.todoID === todo.todoID
      );

      console.log(todo.todoID, indexOfTodoToDelete);

      if (indexOfTodoToDelete === -1) {
        console.log("Cannot find todo to delete.");
        return;
      }

      cardTodos_STATE.splice(indexOfTodoToDelete, 1);

      console.log("From delete todo reducers:", todo.todoID);
    };

    // Mode: 'add' | 'edit' | 'delete'
    switch (mode) {
      case "add": {
        addTodo();
        break;
      }
      case "edit": {
        editTodo();
        break;
      }
      case "delete": {
        deleteTodo();
        break;
      }
      default: {
        console.error("card's todo action type mode is not valid");
      }
    }
  },
};

export default cardReducers;
