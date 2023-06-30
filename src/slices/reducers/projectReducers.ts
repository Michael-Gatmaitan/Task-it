import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import type { Project, AppState, EditableProjectValues } from "../../app/types";

interface EditProjectPayload {
  editedProject: EditableProjectValues;
  editedProjectID: number;
}

interface AddBoardPayload {
  boardTitle: string;
  projectID: number;
}

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

    console.log(action.payload);

    const userProjects: Project[] = state.activeUser.projects;

    const indexOfEditedProject = state.activeUser.projects.findIndex(
      (project) => project.projectID === editedProjectID
    );

    console.log("Before", state.activeUser.projects[indexOfEditedProject]);

    state.activeUser.projects[indexOfEditedProject] = {
      ...userProjects[indexOfEditedProject],
      ...editedProject,
    };

    console.log(editedProject);

    console.log("After", state.activeUser.projects[indexOfEditedProject]);
  },

  deleteProject(state: AppState, action: PA<Project>) {
    console.log("Project to delete: ", action.payload);

    const indexOfProjectToDelete = state.activeUser.projects.findIndex(
      (e) => e.projectID === action.payload.projectID
    );

    if (indexOfProjectToDelete === -1) {
      // Perfom deletion of item
      console.error("Project to delete cannot find");
      return;
    }

    state.activeUser.projects.splice(indexOfProjectToDelete, 1);
  },

  addBoard(state: AppState, action: PA<AddBoardPayload>) {
    const { boardTitle, projectID: paramsProjectID } = action.payload;

    const projectIndex = state.activeUser.projects.findIndex(
      (project) => project.projectID === paramsProjectID
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

  // Prepare for EDIT project
  /* 
    * Features for EDIT PROJECT *

    * addTag, deleteTag, editTag?
    * rename project, edit project description
  */
  // addTags(state: AppState, action: PA<string[]>) {
  //   console.log("Tag to add: ", action.payload);

  //   // We will use array of tags for any quantity e.g 1, 2 ... n tags

  //   state.
  // }
};

export default projectReducers;
