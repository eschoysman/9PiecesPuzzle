import {createAppSlice} from "@/app/store/CreateAppSlice";
import {allColorsState, noColorState} from "@/app/components/filters/output/ResultColorFilter";
import {typeOf} from "uri-js/dist/esnext/util";


// Define a type for the slice state
export interface OutputFilter {
    cellsColor: Record<string,string>;
    solutionPattern: string;
}

// Define the initial state using that type
const initialState: OutputFilter = {
    cellsColor: noColorState,
    solutionPattern: '?'.repeat(50)
}

const outputFilterSlice = createAppSlice({
    name: 'outputFilter',
    initialState,
    reducers: {
        setColorToShow: (state, action:{payload:{value:string,color:string}}) => {
            state.cellsColor[action.payload.value] = action.payload.color || noColorState[action.payload.value];
        },
        updateColorToShow: (state, action:{payload:string|Record<string,string>|undefined,type:string}) => {
            if(action.payload === undefined) {
                return;
            }
            if(typeOf(action.payload) === 'string') {    // extract from pattern
                const customColorFilter = action.payload as string;
                if (customColorFilter) {
                    const newColorsShown = {...noColorState};
                    Array.from(customColorFilter).forEach((value) => {
                        newColorsShown[value] = allColorsState[value];
                    });
                    state.cellsColor = newColorsShown;
                }
            }
            else if(typeOf(action.payload) === 'object') {  // Record<string,string>
                console.log("Case object");
                state.cellsColor = action.payload as Record<string,string>;
            }
            // state.cellsColor = action.payload as Record<string,string>;
            // const colors = state.cellsColor as Record<string,string>;
            // console.log("[UPD] state.cellsColor");
            // Array.from('0123456789X').forEach((value) => {
            //     console.log("value_"+value,colors[value]);
            // });
        },
        setPatternFilter: (state, action) => {
            state.solutionPattern = action.payload || '?'.repeat(50);
        }
    },
})

// Action creators are generated for each case reducer function
export const { setColorToShow, updateColorToShow, setPatternFilter } = outputFilterSlice.actions
export default outputFilterSlice.reducer