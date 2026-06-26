import {useEffect, useState} from "react";
import {Box, Stack, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import * as challengeService from "@/app/hooks/challenge-hook";
import {Solution} from "@/app/model/Solution";
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

    const theme = useTheme();
    const notSmallScreen = useMediaQuery('(min-width:500px)');

    return (
        <Stack direction="column" spacing={2} divider={<hr/>}>
            <Box sx={notSmallScreen ? {px: 3} : {}}><FilterInput updateSearchKey={setSearchKey}/></Box>
            <Box sx={notSmallScreen ? {px: 3} : {}}><Detail solution={detailValue.solution!}/></Box>
            <Box sx={notSmallScreen ? {px: 3} : {}}><Result solution={detailValue.solution!}/></Box>
        </Stack>
    );

}
