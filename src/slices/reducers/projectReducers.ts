import { PayloadAction as PA, current } from "@reduxjs/toolkit";
import type { Project, AppState, EditProjectPayload } from "../../types/types";

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
};

export default projectReducers;
