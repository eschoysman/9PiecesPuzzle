import {createAppSlice} from "@/app/createAppSlice";
import type {RootState} from '@/app/store';
import {EMPTY_SOLUTION, Solution} from "@/app/model/Solution";
import * as challengeService from "@/app/hooks/challenge-hook";
import {createSelectorIdentity} from "@/app/hooks/hooksSelectors";


// Define a type for the slice state
export interface SolutionState {
    status: string;
    value: Solution;
}

// Define the initial state using that type
const initialState: SolutionState = {
    status: "",
    value: EMPTY_SOLUTION,
}

const {challengeByKeyId} = challengeService.useGetChallengeByKeyId();

export const puzzleSolutionSlice = createAppSlice({
    name: 'puzzleSolution',
    initialState,
    reducers: create => ({
        fetchSolutionAsync: create.asyncThunk(
            async (keyId: number) => {
                let result: Solution = EMPTY_SOLUTION;
                await challengeByKeyId(keyId).then(response => result = response);
                return result;
            },
            {
                pending: state => {
                    state.status = "loading";
                    // console.log("fetchSolutionAsync pending",{...state});
                },
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.value = action.payload;
                    // console.log("fetchSolutionAsync fulfilled",{...state});
                },
                rejected: state => {
                    state.status = "failed";
                    // console.log("fetchSolutionAsync rejected",{...state});
                },
            },
        ),
    }),
})

// Action creators are generated for each case reducer function
export const { fetchSolutionAsync } = puzzleSolutionSlice.actions
export default puzzleSolutionSlice.reducer

// Other code such as selectors can use the imported `RootState` type
const selectPuzzleSolution = (state:RootState):SolutionState => state.puzzleSolution;
export const puzzleSolutionSelector = createSelectorIdentity(selectPuzzleSolution);
