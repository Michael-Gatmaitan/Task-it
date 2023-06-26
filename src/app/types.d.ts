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
  cardTag: string[];
  todos: Todo[];
}

interface Board {
  boardTitle: string;
  cards: Card[];
}

export interface Project {
  projectTitle: string;
  projectDescription: string;
  favorite: boolean;
  dateCreated: string;
  dueDate?: string;
  id: number;
  done: boolean;
  boards: Board[];
  tags: string[];
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
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
}

interface NavButtons {
  centerButtons: NavButton[];
}

// structure
const pr: Project[] = [
  {
    projectTitle: "UI design",
    projectDescription: "User Interface of the App",
    dateCreated: "6-26-23",
    dueDate: "7-26-23",
    id: 0,
    tags: ["A/B testing", "Modern"],
    favorite: false,
    done: false,
    boards: [
      {
        boardTitle: "On going",
        cards: [
          {
            cardTitle: "Design phase",
            cardTag: ["Wireframes", "Mockups"],
            todo: [
              {
                title: "Sketch of homepage",
                checked: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
