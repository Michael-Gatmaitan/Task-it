import type { AppState } from "../../types/types";

interface SearchIndicesProps {
  state: AppState | undefined;
  projectID: string | number;
  boardID: string | number;
  cardID: string | number;
}

// interface ReturnTypes {}
// type ReturnType = <T extends number | string>;

export const searchIndices = (
  params: SearchIndicesProps = {
    state: undefined,
    projectID: -1,
    boardID: -1,
    cardID: -1,
  }
) => {
  const { state, projectID, boardID, cardID } = params;

  let projectIDX = -1,
    boardIDX = -1,
    cardIDX = -1;

  if (state !== undefined) {
    const userProjects = state.activeUser.projects;
    // let pID: number, bID: number, cID: number;
    // let projectIDX: number, boardIDX: number, cardIDX: number;

    const numTypeChecker = (n: number | string) =>
      typeof n === "number" ? n : parseInt(n);

    // if (projectID) {
    const pID = numTypeChecker(projectID);
    projectIDX = userProjects.findIndex((p) => p.projectID === pID);

    // if (!boardID && !cardID) return { projectIDX };

    // if (projectID && boardID) {
    const { boards } = userProjects[projectIDX];
    const bID = numTypeChecker(boardID);
    boardIDX = boards.findIndex((b) => b.boardID === bID);

    // if (!cardID) return { projectIDX, boardIDX };

    // if (projectID && boardID && cardID) {
    const { cards } = boards[boardIDX];
    const cID = numTypeChecker(cardID);
    cardIDX = cards.findIndex((c) => c.cardID === cID);
    // }
    // }
    // }
    // if (pID === -1 || bID === -1 || cID === -1)
    //   throw new Error(`Search index cannot be -1. ${pID} ${bID} ${cID}`);
  }

  if (projectIDX === -1 && boardIDX === -1 && cardIDX === -1) {
    throw Error(
      "All returned proerty has value of -1.\nMeans no argument is passed"
    );
  }

  return { projectIDX, boardIDX, cardIDX };
};
