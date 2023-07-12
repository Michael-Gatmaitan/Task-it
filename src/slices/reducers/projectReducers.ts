import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import type {
  Project,
  AppState,
  Card,
  EditProjectPayload,
  AddBoardPayload,
  HandleTodoProps,
  CardTagPayloadProps,
  CardTag,
  // EditTodoProps
} from "../../types/types";

const projectReducers = {
  addProject(state: AppState, action: PA<Project>) {
    if (state.activeUser.projects === undefined) {
      state.activeUser.projects = [];
    }

    const newProject: Project = action.payload;

    console.log(current(state.activeUser.projects));

    const indexOfUserInDB = state.accounts.findIndex(
      (acc) => acc.userID === state.activeUser.userID
    );

    state.activeUser.projects.push(newProject);
    state.accounts[indexOfUserInDB] = state.activeUser;
  },

  editProject(state: AppState, action: PA<EditProjectPayload>) {
    /**
     * action: { payload: editedProject}
     */
    const { editedProject, editedProjectID } = action.payload;

    const userProjects: Project[] = state.activeUser.projects;

    const indexOfEditedProject = state.activeUser.projects.findIndex(
      (project) => project.projectID === editedProjectID
    );

    state.activeUser.projects[indexOfEditedProject] = {
      ...userProjects[indexOfEditedProject],
      ...editedProject,
    };

    console.log(
      "Project edited to",
      state.activeUser.projects[indexOfEditedProject]
    );
  },

  deleteProject(state: AppState, action: PA<Project>) {
    console.log("Project to delete: ", action.payload);

    const indexOfProjectToDelete = state.activeUser.projects.findIndex(
      (pr) => pr.projectID === action.payload.projectID
    );

    console.log("Project deleted");

    if (indexOfProjectToDelete === -1) {
      // Perfom deletion of item
      console.error("Project to delete cannot find");
      return;
    }

    state.activeUser.projects.splice(indexOfProjectToDelete, 1);
  },

  addBoard(state: AppState, action: PA<AddBoardPayload>) {
    const { boardTitle, projectID } = action.payload;

    const projectIndex = state.activeUser.projects.findIndex(
      (project) => project.projectID === projectID
    );

    if (projectIndex === -1) {
      console.log("Project to add the board cant find");
      return;
    }

    const projectBoards = state.activeUser.projects[projectIndex].boards;

    const boardID: number =
      projectBoards.length === 0
        ? 0
        : projectBoards[projectBoards.length - 1].boardID + 1;

    state.activeUser.projects[projectIndex].boards.push({
      boardTitle: boardTitle.trim(),
      boardID: boardID,
      cards: [],
    });

    console.log(state.activeUser.projects[projectIndex].boards);
  },

  // Delete board

  editBoardTitleOnBlur(
    state: AppState,
    action: PA<{
      currentTitle: string;
      newBoardTitle: string;
      projectID: number;
      boardID: number;
    }>
  ) {
    const { currentTitle, newBoardTitle, projectID, boardID } = action.payload;

    if (projectID === -1) {
      console.log("project cant find");
      return;
    }

    const { projects } = state.activeUser;

    const projectIdx = projects.findIndex((prj) => prj.projectID === projectID);

    const boardIdx = projects[projectIdx].boards.findIndex(
      (board) => board.boardID === boardID
    );

    if (newBoardTitle.trim() === currentTitle) {
      console.log("Same title");
      return;
    }

    // If title is NOT empty or else
    if (newBoardTitle.trim() !== "") {
      state.activeUser.projects[projectIdx].boards[boardIdx].boardTitle =
        newBoardTitle.trim();

      console.log("Title overwrited");
    } else {
      state.activeUser.projects[projectIdx].boards[boardIdx].boardTitle =
        currentTitle;

      const boardTitleInputEl = document.getElementById(
        `board-title-input-pID${projectID}-bID${boardID}`
      ) as HTMLInputElement;

      boardTitleInputEl.value = currentTitle;

      console.log(
        "Board title is leave empty, title previous title retrieving.",
        boardTitleInputEl
      );
    }
  },

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
    const { projectID, boardID, cardID } = action.payload.idPaths;

    if (
      projectID !== undefined &&
      boardID !== undefined &&
      cardID !== undefined
    ) {
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

      const cardTags =
        projects[projectIDX].boards[boardIDX].cards[cardIDX].cardTags;

      // const projectIdx = state.activeUser.projects.findIndex(p => p.projectID === parseInt(projectID));
      // const boardIdx =

      switch (action.payload.type) {
        case "add": {
          const newCardTag: CardTag = {
            cardTagTitle: action.payload.cardTagTitle,
            cardTagID:
              cardTags.length === 0
                ? 0
                : cardTags[cardTags.length - 1].cardTagID + 1,
          };

          state.activeUser.projects[projectIDX].boards[boardIDX].cards[
            cardIDX
          ].cardTags[cardTags.length] = newCardTag;

          console.log("Add card");

          break;
        }
        case "delete": {
          const idxOfCardTagToDelete = state.activeUser.projects[
            projectIDX
          ].boards[boardIDX].cards[cardIDX].cardTags.findIndex((ct) => {
            return action.payload.type === "delete"
              ? ct.cardTagID === action.payload.cardTagID
              : -1;
          });

          state.activeUser.projects[projectIDX].boards[boardIDX].cards[
            cardIDX
          ].cardTags.splice(idxOfCardTagToDelete, 1);
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

    // mode: 'add'
    const addTodo = () => {
      state.activeUser.projects[project].boards[board].cards[card].todos.push(
        todo
      );
    };

    // mode: 'edit'
    const editTodo = () => {
      // Assume that todo.todoID is not Number.MAX_INT
      const todoIndex = state.activeUser.projects[project].boards[board].cards[
        card
      ].todos.findIndex((t) => t.todoID === todo.todoID);

      state.activeUser.projects[project].boards[board].cards[card].todos[
        todoIndex
      ] = todo;

      console.log("Todo edited with: ", todo);
    };

    // mode: 'delete'
    const deleteTodo = () => {
      const indexOfTodoToDelete = state.activeUser.projects[project].boards[
        board
      ].cards[card].todos.findIndex((t) => t.todoID === todo.todoID);

      console.log(todo.todoID, indexOfTodoToDelete);

      if (indexOfTodoToDelete === -1) {
        console.log("Cannot find todo to delete.");
        return;
      }

      state.activeUser.projects[project].boards[board].cards[card].todos.splice(
        indexOfTodoToDelete,
        1
      );

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
        console.error("mode is not valid");
      }
    }
  },

  // editTodo(state: AppState, action: PA<EditTodoProps>) {
  //   const {  } = action.payload;
  // }
};

export default projectReducers;
