import Stack from '@mui/material/Stack';
import "./detail.css"
import {useAppSelector} from "@/app/hooks/hooksSelectors";
import {puzzleSolutionDetailSelector} from "@/app/store/puzzleSolution/PuzzleSolutionSelector";


export default function Detail() {

    const solutionDetail = useAppSelector(puzzleSolutionDetailSelector);

    return (
        <>
            {solutionDetail && <Stack>
                <div>Solution di tipo: {solutionDetail.type}</div>
                {solutionDetail.type==="DATE" && <div>Data: {solutionDetail.dayOfWeek} {solutionDetail.dayOfMonth} {solutionDetail.month}</div>}
                <div>Numero di soluzioni: {solutionDetail.numberOfSolutions}</div>
            </Stack>
            }
        </>
    );

}
