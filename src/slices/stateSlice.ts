import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type SetIDsParams = string | undefined;

interface SetCustomUrlIDParams {
  key: "projectID" | "boardID" | "cardID";
  value: number;
}

interface URLTypes {
  projectID: number;
  boardID: number;
  cardID: number;
}

interface IndicesTypes {
  projectIndex: number | undefined;
  boardIndex: number | undefined;
  cardIndex: number | undefined;
}

interface StateTypes {
  urlID: URLTypes;
  indices: IndicesTypes;

  showCardModal: boolean;
}

const initialState: StateTypes = {
  urlID: {
    projectID: Math.PI,
    boardID: Math.PI,
    cardID: Math.PI,
  },

  indices: {
    projectIndex: undefined,
    boardIndex: undefined,
    cardIndex: undefined,
  },

  // State for card modal
  showCardModal: false,
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setUrlIDs(state: StateTypes, action: PayloadAction<SetIDsParams>) {
      const url = action.payload;
      if (url === undefined || state.showCardModal) return;
      // Detects a group of numbers in string that has slash on left of it.
      const regex = /\/[0-9]/g;
      // ['/0', '/1'] nad slicing it to remove slashes then convert to number
      const res: number[] | undefined = url
        .match(regex)
        ?.map((n: string) => parseInt(n.slice(1)));

      if (res) {
        state.urlID.projectID = res[res.length - 1];
        console.log("From state slice: ", current(state.urlID));
      }
    },

    setCustomUrlID(
      state: StateTypes,
      action: PayloadAction<SetCustomUrlIDParams>
    ) {
      const { key, value } = action.payload;
      state.urlID[key] = value;
    },

    // Reducers for boolean states
    toggleShowCardModal(state: StateTypes, action: PayloadAction<boolean>) {
      state.showCardModal = action.payload;
    },
  },
});

export const { setUrlIDs, setCustomUrlID, toggleShowCardModal } =
  stateSlice.actions;

export const getUrlIDs = (state: RootState) => state.stateReducer.urlID;
export const getIndices = (state: RootState) => state.stateReducer.indices;

export const getShowCardModal = (state: RootState) =>
  state.stateReducer.showCardModal;

export default stateSlice.reducer;
