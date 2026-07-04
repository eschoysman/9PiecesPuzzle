import type {RootState} from '@/app/store/Store';
import {createSelectorIdentity} from "@/app/hooks/SelectorsHook";
import {OutputFilter} from "@/app/store/outputFilter/OutputFilterSlice";

// Other code such as selectors can use the imported `RootState` type
const selectOutputFilter = (state:RootState):OutputFilter => {
    // const colors = state.outputFilter.cellsColor;
    // console.log("[SELECT] state.cellsColor");
    // Array.from('0123456789X').forEach((value) => {
    //     console.log("value_"+value,colors[value]);
    // });
    return state.outputFilter;
}
export const outputFilterSelector = createSelectorIdentity(selectOutputFilter);