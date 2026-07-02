import type {RootState} from '@/app/store/store';
import {createSelectorIdentity} from "@/app/hooks/hooksSelectors";
import {SolutionState} from "@/app/store/puzzleSolution/puzzleSolutionSlice";
import {Detail} from "@/app/model/Solution";

// Other code such as selectors can use the imported `RootState` type
const selectPuzzleSolution = (state:RootState):SolutionState => state.puzzleSolution;
export const puzzleSolutionSelector = createSelectorIdentity(selectPuzzleSolution);

const selectPuzzleSolutionDetail = (state:RootState):Detail => puzzleSolutionSelector(state).value.detail;
export const puzzleSolutionDetailSelector = createSelectorIdentity(selectPuzzleSolutionDetail);
