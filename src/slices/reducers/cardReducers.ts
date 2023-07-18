import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import { searchIndices } from "./searchIndices";
import {
  Card,
  Todo,
  CardTagPayloadProps,
  CardTag,
  AppState,
} from "../../types/types";

interface AddCardPayload {
  projectID: number;
  boardID: number;
  newCard: Card;
}

interface DeleteCardPayload {
  projectID: string;
  boardID: string;
  cardID: string;
}

interface EditCardPropsPayload {
  editType: "card-title" | "card-description";
  value: string;
  projectID: string;
  boardID: string;
  cardID: string;
}

interface HandleTodoProps {
  todo: Todo;
  projectID: number;
  boardID: number;
  cardID: number;
  mode: "add" | "edit" | "delete";
}

const cardReducers = {
  // Card reducers

  addCard(state: AppState, action: PA<AddCardPayload>) {
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
      cardDescription: "",
      cardTags: newCard.cardTags,
      cardID: newCard.cardID,
      todos: newCard.todos,
    };
    state.activeUser.projects[projectIdx].boards[boardIdx].cards.push(
      newCardToAdd
    );
  },

  deleteCard(state: AppState, action: PA<DeleteCardPayload>) {
    const { projectID, boardID, cardID } = action.payload;

    const { projectIDX, boardIDX, cardIDX } = searchIndices({
      state,
      projectID,
      boardID,
      cardID,
    });

    const { cards } = state.activeUser.projects[projectIDX].boards[boardIDX];
    const cardIndexToDelete = cardIDX;

    if (cardIndexToDelete === -1) {
      console.log(
        `Card to delete cannot be found in value of index: ${cardIndexToDelete}`
      );
      return;
    }

    console.log("Card deletion performed.");
    cards.splice(cardIndexToDelete, 1);
  },

  // Edit card title
  editCardProperties(state: AppState, action: PA<EditCardPropsPayload>) {
    const { editType, value, projectID, boardID, cardID } = action.payload;
    const { projects } = state.activeUser;

    const { projectIDX, boardIDX, cardIDX } = searchIndices({
      state,
      projectID,
      boardID,
      cardID,
    });

    const card = projects[projectIDX].boards[boardIDX].cards[cardIDX];

    // We can assume that @value is not empty.

    if (editType === "card-title") {
      // Edit card title
      card.cardTitle = value;
      console.log("On edit card title reducer", value, current(card));
    } else if (editType === "card-description") {
      // Edit card description

      card.cardDescription = value;
    }
  },

  // For card's tags
  handleCardTag(state: AppState, action: PA<CardTagPayloadProps>) {
    const { type: actionType, idPaths } = action.payload;
    const { projectID, boardID, cardID } = idPaths;

    const PARAMS_NOT_UNDEFINED =
      projectID !== undefined && boardID !== undefined && cardID !== undefined;

    if (PARAMS_NOT_UNDEFINED) {
      const { projects } = state.activeUser;

      const { projectIDX, boardIDX, cardIDX } = searchIndices({
        state,
        projectID,
        boardID,
        cardID,
      });

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

          cardTags_STATE.push(newCardTag);

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
    const { todo, projectID, boardID, cardID, mode } = action.payload;
    const { projects } = state.activeUser;

    // const { } = search

    const { projectIDX, boardIDX, cardIDX } = searchIndices({
      state,
      projectID,
      boardID,
      cardID,
    });

    const cardTodos_STATE =
      projects[projectIDX].boards[boardIDX].cards[cardIDX].todos;

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

      /* splice,
        (
          *expected index*,
          *n element of deletion from that index*, 
          *value to replace on expected index*
        ); */
      cardTodos_STATE.splice(todoIndex, 1, todo);

      // state.activeUser.projects[project].boards[board].cards[card].todos[
      //   todoIndex
      // ] = todo;

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
