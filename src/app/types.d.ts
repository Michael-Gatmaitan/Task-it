import React from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

export interface AppState {
  activeUser: User;
  accounts: User[];

  userInputError: boolean;
  loggedIn: boolean;
}

/**** USER Types *****/
interface Todo {
  title: string;
  checked: boolean;
}

interface Card {
  cardTitle: string;
  cardDescription: string;
  todos: Todo[];
}

export interface Project {
  projectTitle: string;
  projectDescription?: string;
  favorite?: boolean;
  dateCreated: string;
  dueDate?: string;
  id: number;
  done?: boolean;
  cards?: Card[];
}

export interface User {
  username: string;
  profileImageLink: string;
  userID: number;

  // Projects
  projects: Project[];
  favoriteProjects?: Project[];
  doneProjects?: Project[];
}

/**** DETECTED USERS Types ****/
interface DetectedUsers {
  detectedUsers: User[];
}

export interface NavButton {
  text: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}

interface NavButtons {
  centerButtons: NavButton[];
}
