import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import type { Project, AppState } from "../../app/types";

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

  deleteProject(state: AppState, action: PA<Project>) {
    console.log("Project to delete: ", action.payload);

    const duplicateOfProjectToDelete = state.activeUser.projects.find(
      (e) => e.projectTitle === action.payload.projectTitle
    );

    if (!duplicateOfProjectToDelete) {
      console.log("Project on workspace not found.");
      return;
    }

    const indexOfProjectToDelete = state.activeUser.projects.indexOf(
      duplicateOfProjectToDelete
    );

    // Perfom deletion of item
    state.activeUser.projects.splice(indexOfProjectToDelete, 1);
  },
};

export default projectReducers;
