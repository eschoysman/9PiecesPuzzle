import {useEffect, useState} from "react";
import {Solution} from "@/app/model/Solution";
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Solutions from '@/app/components/explore/solution/Solutions';
import ResultColorFilter, {noColorState} from "@/app/components/filters/output/ResultColorFilter";
import FilterResultModal from '@/app/components/modal/FilterResultModal'

export default function Result({solution}: {solution: Solution}) {

    const [cellSize, setCellSize] = useState<number>(25);
    const [showSolutions, setShowSolutions] = useState(false);
    const [colorShown, setColorShown] = useState<Record<string,string>>(noColorState);
    const [solutionFilter, setSolutionFilter] = useState<string|undefined>();
    const [solutionTemplate, setSolutionTemplate] = useState<string>();

    useEffect(()=>{
        let template = '?'.repeat(50);
        if(solution?.key) {
            const keys = [solution.key.key1,solution.key.key2,solution.key.key3];
            template = template.substring(0,keys[0])+'0'+template.substring(keys[0]+1);
            template = template.substring(0,keys[1])+'0'+template.substring(keys[1]+1);
            template = template.substring(0,keys[2])+'0'+template.substring(keys[2]+1);
            setSolutionTemplate(template);
            // console.log("solution template: "+solutionTemplate);
        }
    }, [solution]);

    return (
        <Stack>
            <div>
                <FilterResultModal solutionTemplate={solutionTemplate} onCloseAction={setSolutionFilter}/>
                <ResultColorFilter colorShown={colorShown} setColorShown={setColorShown} setShowSolutions={setShowSolutions} customColorFilter={solutionFilter}/>
                <br/>
                <Stack direction="row" spacing={2}>
                    <Box>Size</Box>
                    <Box sx={{ width: 300 }}>
                        <Slider step={5}
                                min={10}
                                max={110}
                                marks
                                defaultValue={cellSize}
                                onChange={(event: Event, value: number, activeThumb: number)=>setCellSize(value)}/>
                    </Box>
                </Stack>
            </div>
            <Solutions showSolutions={showSolutions} solution={solution} cellSize={cellSize} colorToShow={colorShown} filter={solutionFilter}/>
        </Stack>
    );

}