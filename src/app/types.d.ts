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

interface NavButtons {
  centerButtons: { text: string; path: string }[];
}
