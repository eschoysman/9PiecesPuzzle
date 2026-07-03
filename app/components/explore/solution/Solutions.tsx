import {useState} from "react";
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';

import {Solution} from "@/app/model/Solution";
import {Grid, GridInput} from "@/app/components/common/grid/Grid";
import {useAppSelector} from "@/app/hooks/SelectorsHook";
import {
    puzzleCombinationsSelector,
    puzzleSolutionSelector,
    puzzleTemplateSelector
} from "@/app/store/puzzleSolution/PuzzleSolutionSelector";
import {Combination} from "@/app/model/Combination";

export interface SolutionsProps {
    showSolutions:boolean,
    solution?: Solution,
    cellSize:number,
    colorToShow:Record<string,string|undefined>,
    filter?:string|undefined
}

export default function Solutions({showSolutions,cellSize,colorToShow,filter}: SolutionsProps) {

    const {status,value: solution} = useAppSelector(puzzleSolutionSelector);
    const puzzleTemplate = useAppSelector(puzzleTemplateSelector);
    const combinations = useAppSelector(puzzleCombinationsSelector);

    const [subKey, setSubKey] = useState<number|null>();
    // const [cells ,setCells] = useState<Record<string,JSX.Element>>({});

    // useEffect(()=>setCells({
    //     '0': <Cell key={'0'}  size={cellSize} color={colorToShow['0'] || blockColors.UNKNOWN.color} />,
    //     '1': <Cell key={'1'}  size={cellSize} color={colorToShow['1'] || blockColors.UNKNOWN.color} />,
    //     '2': <Cell key={'2'}  size={cellSize} color={colorToShow['2'] || blockColors.UNKNOWN.color} />,
    //     '3': <Cell key={'3'}  size={cellSize} color={colorToShow['3'] || blockColors.UNKNOWN.color} />,
    //     '4': <Cell key={'4'}  size={cellSize} color={colorToShow['4'] || blockColors.UNKNOWN.color} />,
    //     '5': <Cell key={'5'}  size={cellSize} color={colorToShow['5'] || blockColors.UNKNOWN.color} />,
    //     '6': <Cell key={'6'}  size={cellSize} color={colorToShow['6'] || blockColors.UNKNOWN.color} />,
    //     '7': <Cell key={'7'}  size={cellSize} color={colorToShow['7'] || blockColors.UNKNOWN.color} />,
    //     '8': <Cell key={'8'}  size={cellSize} color={colorToShow['8'] || blockColors.UNKNOWN.color} />,
    //     '9': <Cell key={'9'}  size={cellSize} color={colorToShow['9'] || blockColors.UNKNOWN.color} />,
    //     'X': <Cell key={'10'} size={cellSize} color={colorToShow['X'] || blockColors.UNKNOWN.color} />,
    //     '?': <Cell key={'11'} size={cellSize} color={colorToShow['?'] || blockColors.UNKNOWN.color} />
    // }),[cellSize,colorToShow]);

    function applyFilter(combination: Combination) {
        return solutionFilter(combination.combination) && (!subKey || combination.subKey === subKey);
    }
    
    function solutionFilter(solution: string): boolean {
        if(filter === undefined) {
            return true;
        }
        for(let i=0; i<filter.length; i++) {
            if(filter[i] !== '?' && filter[i] !== solution[i]) {
                return false;
            }
        }
        return true;
    }

    const listSolutions = combinations.filter(applyFilter)
                                                .map((combination) => {
                                                    const params = {
                                                            id: combination.id,
                                                            solution: combination.combination,
                                                            squareSize: cellSize,
                                                            colorToShow: colorToShow,
                                                            // cells: cells
                                                        } as GridInput;

                                                        return <Grid key={"grid_"+combination.id} gridData={params}/>
                                                });

    const hasSolutions = (listSolutions?.length||0) > 0;

    function targetSolution() {
        const params = {
            solution: puzzleTemplate,
            squareSize: cellSize,
            colorToShow: colorToShow,
            // cells: cells
        } as GridInput;
        return <Grid gridData={params}/>
    }

    return (
            showSolutions ? (
                hasSolutions ? (
                    <Stack >
                        {solution.detail.numberOfSolutions>1 && <div>Filter for Index Key: <Input size="small" type="number"  style={{width:'3.5em'}} placeholder="KeyId" value={subKey} onChange={(e)=>setSubKey(Number(e.target.value))}/> (in range 0-{solution.detail.numberOfSolutions})</div>}
                        <div className="solutionsGrid">{listSolutions}</div>
                    </Stack>
                ) : (
                    <div>No solutions found with the current filter</div>
                )
            ) : (
                targetSolution()
            )
        );

}