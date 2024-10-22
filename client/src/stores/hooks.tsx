import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./configureStore";

// Custom hook for dispatching actions with the correct type.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for selecting state with the correct type.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
