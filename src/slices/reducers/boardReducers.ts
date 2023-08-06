import { PayloadAction as PA } from "@reduxjs/toolkit";
import type { AppState } from "../../types/types";

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

    const boardID: number =
      projectBoards_STATE.length === 0
        ? 0
        : projectBoards_STATE[projectBoards_STATE.length - 1].boardID + 1;

    projectBoards_STATE.push({
      boardTitle: boardTitle.trim(),
      boardID: boardID,
      showBoardOptions: false,
      cards: [],
    });

    console.log(projectBoards_STATE);
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

      boardTitleInputEl.value = currentTitle;

      console.log(
        "Board title is leave empty, title previous title retrieving.",
        boardTitleInputEl
      );
    }
  },

  // Delete board

  // Board mover
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveBoard(state: AppState, action: PA<MoveBoardArgs>) {
    const { projectID, boardID, direction } = action.payload;

    const projectIndex = state.activeUser.projects.findIndex(
      (pr) => pr.projectID === projectID
    );

    const project = state.activeUser.projects[projectIndex];

    if (project !== undefined) {
      const { boards } = project;

      const boardIndex = boards.findIndex((br) => br.boardID === boardID);

      if (boardIndex === 0 && direction === "left") {
        console.log("Board already on the left-most");
        return;
      }

      if (boardIndex === boards.length - 1 && direction === "right") {
        console.log("Board already on the right-most");
        return;
      }

      if (direction === "left") {
        const temp =
          state.activeUser.projects[projectIndex].boards[boardIndex - 1];
        state.activeUser.projects[projectIndex].boards[boardIndex - 1] =
          state.activeUser.projects[projectIndex].boards[boardIndex];
        state.activeUser.projects[projectIndex].boards[boardIndex] = temp;
      }

      if (direction === "right") {
        const temp =
          state.activeUser.projects[projectIndex].boards[boardIndex + 1];
        state.activeUser.projects[projectIndex].boards[boardIndex + 1] =
          state.activeUser.projects[projectIndex].boards[boardIndex];
        state.activeUser.projects[projectIndex].boards[boardIndex] = temp;
      }

      // if (board !== undefined) {
      //   console.log(board, direction);
      // }
    }

    console.log(direction);
  },
};

export default boardReducers;
