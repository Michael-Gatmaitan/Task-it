import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type SetIDsParams = string | undefined;

interface URLTypes {
  projectID: number;
  boardID: number;
  cardID: number;
}

interface StateTypes {
  urlID: URLTypes;
}

const initialState: StateTypes = {
  urlID: {
    projectID: -1,
    boardID: -1,
    cardID: -1,
  },
  // projectIndex: 0
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

    setCustomUrlID(
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) {
      const { key, value } = action.payload;

      state.urlID[key as keyof typeof state.urlID] = value;
    },
  },
});

export const { setUrlIDs, setCustomUrlID } = stateSlice.actions;

export const getUrlIDs = (state: RootState) => state.stateReducer.urlID;

export default stateSlice.reducer;
