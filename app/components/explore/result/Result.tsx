import {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Solutions from '@/app/components/explore/solution/Solutions';
import ResultColorFilter, {noColorState} from "@/app/components/filters/output/ResultColorFilter";
import FilterResultModal from '@/app/components/modal/FilterResultModal'
import {useMediaQuery} from "@mui/material";
import {useAppSelector} from "@/app/hooks/SelectorsHook";
import {puzzleSolutionSelector} from "@/app/store/puzzleSolution/PuzzleSolutionSelector";

export default function Result() {

    const {status,value: solution} = useAppSelector(puzzleSolutionSelector);

    const [cellSize, setCellSize] = useState<number>(25);
    const [showSolutions, setShowSolutions] = useState(false);
    const [colorShown, setColorShown] = useState<Record<string,string>>(noColorState);
    const [solutionFilter, setSolutionFilter] = useState<string|undefined>();

    const wideScreen = useMediaQuery('(min-width:845px)');

    useEffect(() => {
        setCellSize(wideScreen ? 25 : 40);
    }, [wideScreen]);

    return (
        <Stack>
            <div>
                <FilterResultModal solutionTemplate={solution.template} onCloseAction={setSolutionFilter}/>
                <ResultColorFilter setShowSolutions={setShowSolutions} customColorFilter={solutionFilter}/>
                <br/>
                {wideScreen &&
                <Stack direction="row" spacing={2}>
                    <Box>Size</Box>
                    <Box sx={{ width: 300 }}>
                        <Slider step={5}
                                min={10}
                                max={110}
                                marks
                                defaultValue={cellSize}
                                valueLabelDisplay="auto"
                                onChange={(event: Event, value: number, activeThumb: number)=>setCellSize(value)}/>
                    </Box>
                </Stack>
                }
            </div>
            <Solutions showSolutions={showSolutions} cellSize={cellSize} colorToShow={colorShown} filter={solutionFilter}/>
        </Stack>
    );

}