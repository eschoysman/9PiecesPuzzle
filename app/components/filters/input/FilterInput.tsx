import {useEffect, useState} from "react";
import * as challengeService from "@/app/hooks/ChallengeHook";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {Box, Button, ButtonGroup, Divider, Stack, useMediaQuery} from '@mui/material';
import Input from '@mui/material/Input';
import 'dayjs/locale/it';

import CustomChallengeModal from '@/app/components/modal/CustomChallengeModal'

import {createKeyFromCode} from "@/app/model/Key";
import {fetchSolutionAsync} from "@/app/store/puzzleSolution/PuzzleSolutionSlice";
import {useAppDispatch} from "@/app/hooks/SelectorsHook";


export default function FilterInput() {

    const dispatch = useAppDispatch();

    const [key, setKey] = useState<number>(0);
    const [dateInput, setDateInput] = useState<Dayjs | null>(dayjs());
    const [month, setMonth] = useState<number | null>();
    const [dateMonth, setDateMonth] = useState<number | null>();
    const [weekDay, setWeekDay] = useState<number | null>();

    const {randomChallenge} = challengeService.useGetRandomChallenge();
    const {randomDateChallenge} = challengeService.useGetRandomDateChallenge();

    const DAY_OF_WEEK = [49, 8, 9, 19, 29, 39, 48];
    const DAY_DATE = [-1, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 22, 23, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 37, 38, 43, 44, 45, 46, 47];
    const MONTH = [0, 1, 2, 10, 11, 20, 21, 30, 31, 40, 41, 42];

    useEffect(() => {
        extractFromDate();
    }, [dateInput, month, dateMonth, weekDay]);

    useEffect(() => {
        dispatch(fetchSolutionAsync(key));
    }, [key]);

    const extractFromDate = () => {
        if (dateInput) {
            setWeekDay(dateInput.day());
            setDateMonth(dateInput.get('date'));
            setMonth(dateInput.month());
            loadDate();
        }
    }

    const handleRandomChallenge = (dateOnly: boolean) => {
        setKey(dateOnly ? randomDateChallenge() : randomChallenge());
    }
    const easiestChallenges = [157, 1006, 19235, 19244]
    const hardestChallenges = [2247, 3594, 4128, 4283, 5181, 5258, 8168, 8174, 9284, 9535, 11167, 17982]
    const easiestDateChallenges = [10593, 18578]
    const hardestDateChallenges = [3506, 9539, 11894, 16624]
    const handelEasyRandomChallenge = (dateOnly: boolean) => {
        let num = key;
        const array = dateOnly ? easiestDateChallenges : easiestChallenges;
        const n = array.length;
        while (num == key) {
            num = array[Math.floor(n * Math.random())];
        }
        setKey(num);
    }
    const handelHardRandomChallenge = (dateOnly: boolean) => {
        let num = key;
        const array = dateOnly ? hardestDateChallenges : hardestChallenges;
        const n = array.length;
        while (num == key) {
            num = array[Math.floor(n * Math.random())];
        }
        setKey(num);
    }

    const loadDate = () => {
        const newKey = createKeyFromCode([MONTH[month!], DAY_DATE[dateMonth!], DAY_OF_WEEK[weekDay!]]).code;
        setKey(newKey);
    }

    const wideScreen = useMediaQuery('(min-width:845px)');

    const filters = {
        pickADate:  <Stack direction={wideScreen ? "column" : "row"} sx={wideScreen ? {height:'100px'} : {}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                            <DatePicker label="Pick a Date"
                                        showDaysOutsideCurrentMonth={true}
                                        value={dateInput}
                                        onChange={(value) => setDateInput(value)}
                                        sx={wideScreen ? {width: '100%'} : {}}
                            />
                        </LocalizationProvider>
                        <Button variant="outlined" size={wideScreen ? "large" : "small"} onClick={() => setDateInput(dayjs())} sx={{width: wideScreen ? '100%' : '15em'}}>Today</Button>
                    </Stack>,
        randomChallengeButtons: <ButtonGroup orientation="vertical" aria-label="Vertical button group" sx={{width:'100%'}}>
                                    <Button size="large" key="random" onClick={() => handleRandomChallenge(false)}>Random Challenge</Button>
                                    <Button size="small" key="randomEasy" onClick={() => handelEasyRandomChallenge(false)}>Easiest one (4 puzzles)</Button>
                                    <Button size="small" key="randomHard" onClick={() => handelHardRandomChallenge(false)}>Hardest one (12 puzzles)</Button>
                                </ButtonGroup>,
        randomDateChallengeButtons: <ButtonGroup orientation="vertical" aria-label="Vertical button group" sx={{width:'100%'}}>
                                        <Button size="large" key="randomDate" onClick={() => handleRandomChallenge(true)}>Random Date Challenge</Button>
                                        <Button size="small" key="randomDateEasy" onClick={() => handelEasyRandomChallenge(true)}>Easiest one (2 puzzles)</Button>
                                        <Button size="small" key="randomDateHard" onClick={() => handelHardRandomChallenge(true)}>Hardest one (4 puzzles)</Button>
                                    </ButtonGroup>,
        customChallenge: <CustomChallengeModal onCloseAction={setKey} />,
        inputKeyChallenge: <div>Solution Key: <Input size="small" type="number" style={{width: '4em'}} value={key.toString()} onChange={(e) => setKey(Number(e.target.value))}/> (in range 1-19600) </div>
    };

    return (
        wideScreen ? (
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                    <Box>{filters.pickADate}</Box>
                    <Box>{filters.customChallenge}</Box>
                </Stack>
                <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                    <Stack direction="row" spacing={2} style={{height:'100px'}}>
                        <Box>{filters.randomChallengeButtons}</Box>
                        <Box>{filters.randomDateChallengeButtons}</Box>
                    </Stack>
                    <Stack direction="row" spacing={2} style={{paddingTop: '0.5em'}}>
                        <Box>{filters.inputKeyChallenge}</Box>
                    </Stack>
                </Stack>
            </Stack>
        ) : (
            <Stack direction="column" spacing={2} sx={{width:'300px', px: 'auto'}}>
                <Box sx={{width:"300px"}}>{filters.pickADate}</Box>
                <Box sx={{width:"300px"}}>{filters.randomChallengeButtons}</Box>
                <Box sx={{width:"300px"}}>{filters.randomDateChallengeButtons}</Box>
                <Box sx={{width:"300px"}}>{filters.customChallenge}</Box>
                <Box sx={{width:"300px"}}>{filters.inputKeyChallenge}</Box>
            </Stack>
        )
    );

}