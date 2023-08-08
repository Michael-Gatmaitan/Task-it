import { useAppSelector } from "../../app/hooks";
import { getUrlIDs } from "../stateSlice";

export const useGetUrlIDs = () => useAppSelector(getUrlIDs);
