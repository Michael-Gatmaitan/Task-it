import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import type { Project, AppState, EditableProjectValues } from "../../app/types";

interface EditProjectPayload {
  editedProject: EditableProjectValues;
  editedProjectID: number;
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
      (project) => project.id === editedProjectID
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
      (e) => e.projectTitle === action.payload.projectTitle
    );

    if (indexOfProjectToDelete === -1) {
      // Perfom deletion of item
      console.error("Project to delete cannot find");
      return;
    }

    state.activeUser.projects.splice(indexOfProjectToDelete, 1);
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
