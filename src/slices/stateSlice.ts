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
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setUrlIDs(state, action: PayloadAction<SetIDsParams>) {
      const url = action.payload;
      if (url === undefined) return;

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

      console.log(current(state.urlID));
    },

    setCustomUrlID(state, action: PayloadAction<SetCustomUrlIDParams>) {
      const { key, value } = action.payload;
      state.urlID[key] = value;
    },
  },
});

export const { setUrlIDs, setCustomUrlID } = stateSlice.actions;

export const getUrlIDs = (state: RootState) => state.stateReducer.urlID;
export const getIndices = (state: RootState) => state.stateReducer.indices;

export default stateSlice.reducer;
