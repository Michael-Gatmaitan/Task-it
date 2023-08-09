import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import type { AppState, Board } from "../../types/types";

interface AddBoardPayload {
  boardTitle: string;
  projectID: number;
}

interface EditBoardTitleOnBlurProps {
  currentTitle: string;
  newBoardTitle: string;
  projectID: number;
  boardID: number;
}

interface MoveBoardArgs {
  projectID: number;
  boardID: number;
  direction: "left" | "right";
}

const boardReducers = {
  addBoard(state: AppState, action: PA<AddBoardPayload>) {
    const { boardTitle, projectID } = action.payload;

    const projectIndex = state.activeUser.projects.findIndex(
      (project) => project.projectID === projectID
    );

    if (projectIndex === -1) {
      console.log("Project to add the board cant find");
      return;
    }

    const projectBoards_STATE = state.activeUser.projects[projectIndex].boards;

    // const boardID: number =
    // projectBoards_STATE.length === 0
    //   ? 0
    //   : projectBoards_STATE[projectBoards_STATE.length - 1].boardID + 1;

    projectBoards_STATE.push({
      boardTitle: boardTitle.trim(),
      boardID: Date.now(),
      cards: [],
    });

    console.log(current(projectBoards_STATE));
  },

  editBoardTitleOnBlur(state: AppState, action: PA<EditBoardTitleOnBlurProps>) {
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

    const boardToEdit_STATE =
      state.activeUser.projects[projectIdx].boards[boardIdx];

    // If title is NOT empty or else
    if (newBoardTitle.trim() !== "") {
      boardToEdit_STATE.boardTitle = newBoardTitle.trim();
      console.log("Title overwrited");
    } else {
      boardToEdit_STATE.boardTitle = currentTitle;

      const boardTitleInputEl = document.getElementById(
        `board-title-input-pID${projectID}-bID${boardID}`
      ) as HTMLInputElement;

      console.log(boardTitleInputEl);

      boardTitleInputEl.value = currentTitle;

      console.log(
        "Board title is leave empty, title previous title retrieving.",
        boardTitleInputEl
      );
    }
  },

  // Delete board
  deleteBoard(
    state: AppState,
    action: PA<{ projectID: number; board: Board }>
  ) {
    const { projectID, board } = action.payload;
    const project = state.activeUser.projects.find(
      (pr) => pr.projectID === projectID
    );

    const indexOfBoardToDelete = project?.boards.findIndex(
      (br) => br.boardID === board.boardID
    );

    if (indexOfBoardToDelete !== undefined && indexOfBoardToDelete !== -1) {
      project?.boards.splice(indexOfBoardToDelete, 1);
      console.log("Board successfully deleted");
    }
  },

  // Board mover
  moveBoard(state: AppState, action: PA<MoveBoardArgs>) {
    const { projectID, boardID, direction } = action.payload;

    const projectIndex = state.activeUser.projects.findIndex(
      (pr) => pr.projectID === projectID
    );

    const project = state.activeUser.projects[projectIndex];

    if (project !== undefined) {
      const { boards } = project;

      const boardIndex = boards.findIndex((br) => br.boardID === boardID);
      console.log("Board index: ", boardIndex, boards.length - 1);

      if (direction === "left") {
        if (boardIndex === 0) {
          console.log("Board already on the left-most");
          return;
        }
        const temp =
          state.activeUser.projects[projectIndex].boards[boardIndex - 1];
        state.activeUser.projects[projectIndex].boards[boardIndex - 1] =
          state.activeUser.projects[projectIndex].boards[boardIndex];
        state.activeUser.projects[projectIndex].boards[boardIndex] = temp;
      }

      if (direction === "right") {
        if (boardIndex === boards.length - 1) {
          console.log("Board already on the right-most");
          return;
        }
        const temp =
          state.activeUser.projects[projectIndex].boards[boardIndex + 1];
        state.activeUser.projects[projectIndex].boards[boardIndex + 1] =
          state.activeUser.projects[projectIndex].boards[boardIndex];
        state.activeUser.projects[projectIndex].boards[boardIndex] = temp;
      }
    }

    console.log(direction);
  },
};

export default boardReducers;
