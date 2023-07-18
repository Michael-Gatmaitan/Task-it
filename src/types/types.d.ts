interface CardTag {
  cardTagTitle: string;
  cardTagID: number;
}

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
  todoID: number;
}

interface Card {
  cardTitle: string;
  cardDescription: string;
  cardTags: CardTag[];
  todos: Todo[];
  cardID: number;
}

export interface Board {
  boardTitle: string;
  cards: Card[];
  boardID: number;
}

export interface Project {
  projectTitle: string;
  projectDescription: string;
  favorite: boolean;
  dateCreated: string;
  dueDate?: string;
  projectID: number;
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

export type EditableProjectValues = Pick<
  Project,
  "projectTitle" | "projectDescription" | "tags" | "dueDate"
>;

// Reducer types and generics for payload
export interface EditProjectPayload {
  editedProject: EditableProjectValues;
  editedProjectID: number;
}

export type ReactRouterParamsType = {
  projectID?: string;
  cardID?: string;
  boardID?: string;
};

export type EditTodoProps = Required<AddTodoProps>;

export type CardTagPayloadProps = {
  idPaths: ReactRouterParamsType;
} & (DeleteCardTag | AddCardTag);

type AddCardTag = {
  type: "add";
  cardTagTitle: string;
};
type DeleteCardTag = {
  type: "delete";
  cardTagID: number;
};

// structure
// const pr: Project[] = [
//   {
//     projectTitle: "UI design",
//     projectDescription: "User Interface of the App",
//     dateCreated: "6-26-23",
//     dueDate: "7-26-23",
//     id: 0,
//     tags: ["A/B testing", "Modern"],
//     favorite: false,
//     done: false,
//     boards: [
//       {
//         boardTitle: "On going",
//         cards: [
//           {
//             cardTitle: "Design phase",
//             cardTag: ["Wireframes", "Mockups"],
//             todo: [
//               {
//                 title: "Sketch of homepage",
//                 checked: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];
