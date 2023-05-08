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

interface Project {
  projectTItle: string;
  projectDescription: string;
  favorite: boolean;
  done: boolean;
  dateCreated: Date;
  cards: Card[];
}

export interface User {
  username: string;
  profileImageLink: string;
  userID: number;

  // Projects
  projects?: Project[];
  favoriteProjects?: Project[];
  doneProjects?: Project[];
}

/**** DETECTED USERS Types ****/
interface DetectedUsers {
  detectedUsers: Array<User>;
}

interface NavButtons {
  centerButtons: { text: string; path: string; display: string }[];
}
