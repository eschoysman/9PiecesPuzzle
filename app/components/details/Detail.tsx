import {Solution} from "@/app/model/Solution";
import Stack from '@mui/material/Stack';
import "./detail.css"


export default function Detail({solution}: {solution: Omit<Solution, "solutions">}) {

    return (
        <>
            {solution && <Stack>
                <div>Solution di tipo: {solution.type}</div>
                {solution.type==="DATE" && <div>Data: {solution.dayOfWeek} {solution.dayOfMonth} {solution.month}</div>}
                <div>Numero di soluzioni: {solution.numberOfSolutions}</div>
            </Stack>
            }
        </>
    );

}
