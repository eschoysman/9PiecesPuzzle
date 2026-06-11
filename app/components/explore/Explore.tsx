import {useEffect, useState} from "react";
import * as challengeService from "@/app/hooks/challenge-hook";
import Stack from '@mui/material/Stack';
import {Solution, EMPTY_SOLUTION} from "@/app/model/Solution";
import FilterInput from '@/app/components/filters/input/FilterInput';
import Detail from '@/app/components/explore/details/Detail';
import Result from '@/app/components/explore/result/Result';

import "./explore.css";

export interface Detail {
    key?: number,
    solution?: Solution,
}

export default function Explore() {

    const [searchKey, setSearchKey] = useState<number>(0);
    const [detailValue, setDetailValue] = useState<Detail>({});

    const {challengeByKeyId} = challengeService.useGetChallengeByKeyId();

    useEffect(()=>{
        if(searchKey) {

            challengeByKeyId(searchKey).then(response => {
                setDetailValue({key: response.key.code, solution: response});

            });
        }
    },[searchKey]);

    return (
        <Stack direction="column" spacing={2} divider={<hr/>}>
            <FilterInput updateSearchKey={setSearchKey}/>
            <Detail solution={detailValue.solution!}/>
            <Result solution={detailValue.solution!}/>
        </Stack>
    );

}
