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
  firstName: string;
  lastName: string;
  profileImageLink: string;

  // Projects
  projects?: Project[];
  favoriteProjects?: Project[];
  doneProjects?: Project[];
}

/**** DETECTED USERS Types ****/
interface DetectedUsers {
  detectedUsers: Array<User>;
}
