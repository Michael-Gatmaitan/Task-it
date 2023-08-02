import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type SetIDsParams = string | undefined;

interface SetCustomUrlIDParams {
  key: "projectID" | "boardID" | "cardID";
  value: number;
}

interface URLTypes {
  projectID: number | undefined;
  boardID: number | undefined;
  cardID: number | undefined;
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
    projectID: undefined,
    boardID: undefined,
    cardID: undefined,
  },

  indices: {
    projectIndex: undefined,
    boardIndex: undefined,
    cardIndex: undefined,
  },

  showCardModal: false,
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setUrlIDs(state: StateTypes, action: PayloadAction<SetIDsParams>) {
      const url = action.payload;
      if (url === undefined || state.showCardModal) return;

      const urlTemp = url;

      // const temp = new Array(3).fill(undefined);

      const urlTempArr: string[] = urlTemp.split("/");
      const filtered: string[] = urlTempArr.filter((str) => {
        const isNotNaN = parseInt(str).toString() !== "NaN";
        return isNotNaN;
      });
      const ids: number[] = filtered.map((n) => parseInt(n));

      Object.keys(state.urlID).forEach((key, i) => {
        // USER ID IS NOT BELONG HERE
        state.urlID[key as keyof typeof state.urlID] = ids[i + 1];
      });

      console.log("From state slice: ", current(state.urlID));
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
