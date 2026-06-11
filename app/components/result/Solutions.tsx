import {JSX, useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';

import {Solution} from "@/app/model/Solution";
import {Grid, GridInput} from "@/app/components/grid/Grid";
import {Cell} from "@/app/components/cell/Cell";
import * as blockColors from "@/app/enumeration/BlockColor";

export interface SolutionsProps {
    showSolutions:boolean,
    solution: Solution,
    cellSize:number,
    colorToShow:Record<string,string|undefined>,
    filter?:string|undefined
}

export default function Solutions({showSolutions,solution,cellSize,colorToShow,filter}: SolutionsProps) {

    const [subKey, setSubKey] = useState<number|null>();
    const [cells ,setCells] = useState<Record<string,JSX.Element>>({});

    useEffect(()=>setCells({
        '0': <Cell key={'0'}  size={cellSize} color={colorToShow['0'] || blockColors.UNKNOWN.color} />,
        '1': <Cell key={'1'}  size={cellSize} color={colorToShow['1'] || blockColors.UNKNOWN.color} />,
        '2': <Cell key={'2'}  size={cellSize} color={colorToShow['2'] || blockColors.UNKNOWN.color} />,
        '3': <Cell key={'3'}  size={cellSize} color={colorToShow['3'] || blockColors.UNKNOWN.color} />,
        '4': <Cell key={'4'}  size={cellSize} color={colorToShow['4'] || blockColors.UNKNOWN.color} />,
        '5': <Cell key={'5'}  size={cellSize} color={colorToShow['5'] || blockColors.UNKNOWN.color} />,
        '6': <Cell key={'6'}  size={cellSize} color={colorToShow['6'] || blockColors.UNKNOWN.color} />,
        '7': <Cell key={'7'}  size={cellSize} color={colorToShow['7'] || blockColors.UNKNOWN.color} />,
        '8': <Cell key={'8'}  size={cellSize} color={colorToShow['8'] || blockColors.UNKNOWN.color} />,
        '9': <Cell key={'9'}  size={cellSize} color={colorToShow['9'] || blockColors.UNKNOWN.color} />,
        'X': <Cell key={'10'} size={cellSize} color={colorToShow['X'] || blockColors.UNKNOWN.color} />,
        '?': <Cell key={'11'} size={cellSize} color={colorToShow['?'] || blockColors.UNKNOWN.color} />
    }),[cellSize,colorToShow]);

    function solutionFilter(solution: string): boolean {
        let result = true;
        if(filter === undefined) {
            return true;
        }
        for(let i=0; i<filter.length; i++) {
            if(filter[i] !== '?' && filter[i] !== solution[i]) {
                return false;
            }
        }
        return result;
    }

    const listSolutions = solution?.type!=="UNMAKEABLE" ? solution?.combinations
        .map((value,index) => {
            const params = {
                    id: solution.key.code+"/"+(index+1),
                    solution: value.combination,
                    squareSize: cellSize,
                    colorToShow: colorToShow,
                    cells: cells
                } as GridInput;

            if(solutionFilter(value.combination) && (!subKey || index === subKey-1)) {
                return <Grid key={"grid_"+index} gridData={params}/>
            }
        }) : [];

    // const [targetSolutionParams,setTargetSolutionParams] = useState<GridInput>({solution: '?'.repeat(50), squareSize: cellSize, colorToShow: colorToShow, cells: cells});


    function targetSolution() {
        const params = {
            solution: '?'.repeat(solution?.key.key1) + '0' + '?'.repeat(solution?.key.key2 - solution?.key.key1 - 1) + '0' + '?'.repeat(solution?.key.key3 - solution?.key.key2 - 1) + '0' + '?'.repeat(50 - solution?.key.key3 - 1),
            squareSize: cellSize,
            colorToShow: colorToShow,
            cells: cells
        } as GridInput;
        return <Grid gridData={params}/>
    }

    return (
            showSolutions ? (
                <Stack >
                    {solution?.numberOfSolutions>1 && <div>Filter for Index Key: <Input size="small" type="number" placeholder="KeyId" value={subKey} onChange={(e)=>setSubKey(Number(e.target.value))}/> (in range 0-{solution?.numberOfSolutions})</div>}
                    <div className="solutionsGrid">{listSolutions}</div>
                </Stack>
            ) : (
                targetSolution()
            )
        );

}