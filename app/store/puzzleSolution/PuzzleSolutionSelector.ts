import type {RootState} from '@/app/store/Store';
import {createSelectorIdentity} from "@/app/hooks/SelectorsHook";
import {SolutionState} from "@/app/store/puzzleSolution/PuzzleSolutionSlice";
import {Detail} from "@/app/model/Solution";
import {Combination} from "@/app/model/Combination";

// Other code such as selectors can use the imported `RootState` type
const selectPuzzleSolution = (state:RootState):SolutionState => state.puzzleSolution;
export const puzzleSolutionSelector = createSelectorIdentity(selectPuzzleSolution);

const selectPuzzleSolutionDetail = (state:RootState):Detail => puzzleSolutionSelector(state).value.detail;
export const puzzleSolutionDetailSelector = createSelectorIdentity(selectPuzzleSolutionDetail);

const selectPuzzleTemplate = (state:RootState):string => state.puzzleSolution.value.template;
export const puzzleTemplateSelector = createSelectorIdentity(selectPuzzleTemplate);

const selectPuzzleCombinations = (state:RootState):Combination[] => {
    const solution = state.puzzleSolution.value;
    return solution.detail.type === 'UNMAKEABLE' ? [] : solution.combinations;
}
export const puzzleCombinationsSelector = createSelectorIdentity(selectPuzzleCombinations);