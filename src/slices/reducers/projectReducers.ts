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

    const indexOfProjectToDelete = state.activeUser.projects.findIndex(
      (e) => e.projectTitle === action.payload.projectTitle
    );

    if (indexOfProjectToDelete !== -1) {
      // Perfom deletion of item
      state.activeUser.projects.splice(indexOfProjectToDelete, 1);
    }
  },

  // addTag(state: AppState, action: PA<string[]>) {

  // }

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
