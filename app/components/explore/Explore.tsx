import {Box, Stack, useMediaQuery} from '@mui/material';
import FilterInput from '@/app/components/filters/input/FilterInput';
import Detail from '@/app/components/explore/details/Detail';
import Result from '@/app/components/explore/result/Result';

import "./explore.css";

export default function Explore() {

    const notSmallScreen = useMediaQuery('(min-width:500px)');

    return (
        <Stack direction="column" spacing={2} divider={<hr/>}>
            <Box sx={notSmallScreen ? {px: 3} : {}}><FilterInput/></Box>
            <Box sx={notSmallScreen ? {px: 3} : {}}><Detail/></Box>
            <Box sx={notSmallScreen ? {px: 3} : {}}><Result/></Box>
        </Stack>
    );

}
