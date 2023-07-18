import type { AppState } from "../../types/types";

interface SearchIndicesProps {
  state: AppState;
  projectID: string | number;
  boardID: string | number;
  cardID: string | number;
}

export const searchIndices = (params: SearchIndicesProps) => {
  const { state, projectID, boardID, cardID } = params;

  const pID = typeof projectID === "number" ? projectID : parseInt(projectID);
  const bID = typeof boardID === "number" ? boardID : parseInt(boardID);
  const cID = typeof cardID === "number" ? cardID : parseInt(cardID);

  if (pID === -1 || bID === -1 || cID === -1)
    throw new Error(`Search index cannot be -1. ${pID} ${bID} ${cID}`);

  const userProjects = state.activeUser.projects;

  const projectIDX = userProjects.findIndex((p) => p.projectID === pID);
  const { boards } = userProjects[projectIDX];
  const boardIDX = boards.findIndex((b) => b.boardID === bID);
  const { cards } = userProjects[projectIDX].boards[boardIDX];
  const cardIDX = cards.findIndex((c) => c.cardID === cID);

  return { projectIDX, boardIDX, cardIDX };
};
