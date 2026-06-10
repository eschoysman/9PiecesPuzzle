import {useEffect, useState} from "react";
import * as challengeService from "@/app/hooks/challenge-hook";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import CustomChallengeModal from '@/app/components/modal/CustomChallengeModal'
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import 'dayjs/locale/it';

import {createKeyFromCode} from "@/app/model/Key";


export default function FilterInput({updateSearchKey}: {updateSearchKey: (newType: number) => void}) {

    const [key,setKey] = useState<number>(0);
    const [dateInput, setDateInput] = useState<Dayjs|null>(dayjs());
    const [month, setMonth] = useState<number|null>();
    const [dateMonth, setDateMonth] = useState<number|null>();
    const [weekDay, setWeekDay] = useState<number|null>();

    const {randomChallenge} = challengeService.useGetRandomChallenge();
    const {randomDateChallenge} = challengeService.useGetRandomDateChallenge();

    const DAY_OF_WEEK = [49,8,9,19,29,39,48];
    const DAY_DATE = [-1,3,4,5,6,7,12,13,14,15,16,17,18,22,23,24,25,26,27,28,32,33,34,35,36,37,38,43,44,45,46,47];
    const MONTH = [0,1,2,10,11,20,21,30,31,40,41,42];

    useEffect(() => {
        extractFromDate();
    }, [dateInput,month,dateMonth,weekDay]);

    useEffect(()=>{
        updateSearchKey(key!);
    },[key]);

    const extractFromDate = () => {
        if(dateInput) {
            setWeekDay(dateInput.day());
            setDateMonth(dateInput.get('date'));
            setMonth(dateInput.month());
            loadDate();
        }
    }

    const handleRandomChallenge = (dateOnly: boolean) => {
        setKey(dateOnly ? randomDateChallenge() : randomChallenge());
    }
    const easiestChallenges = [157,1006,19235,19244]
    const hardestChallenges = [2247,3594,4128,4283,5181,5258,8168,8174,9284,9535,11167,17982]
    const easiestDateChallenges = [10593,18578]
    const hardestDateChallenges = [3506,9539,11894,16624]
    const handelEasyRandomChallenge = (dateOnly: boolean) => {
        let num = key;
        const array = dateOnly ? easiestDateChallenges : easiestChallenges;
        const n = array.length;
        while(num==key) {
            num = array[Math.floor(n*Math.random())];
        }
        setKey(num);
    }
    const handelHardRandomChallenge = (dateOnly: boolean) => {
        let num = key;
        const array = dateOnly ? hardestDateChallenges : hardestChallenges;
        const n = array.length;
        while(num==key) {
            num = array[Math.floor(n*Math.random())];
        }
        setKey(num);
    }

    const loadDate = () => {
        const newKey = createKeyFromCode([MONTH[month!],DAY_DATE[dateMonth!],DAY_OF_WEEK[weekDay!]])
        setKey(newKey);
    }

    return (
        <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                <Stack direction="column" style={{height:'100px'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                        <DatePicker label="Pick a Date"
                                    showDaysOutsideCurrentMonth={true}
                                    value={dateInput}
                                    onChange={(value)=>setDateInput(value)}
                        />
                    </LocalizationProvider>
                    <Button variant="outlined" size="large" onClick={()=>setDateInput(dayjs())} style={{width:'100%'}}>Today</Button>
                </Stack>
                <CustomChallengeModal onCloseAction={setKey}/>
            </Stack>
            <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                <Stack direction="row" spacing={2} style={{height:'100px'}}>
                    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                        <Button size="large" key="random" onClick={()=>handleRandomChallenge(false)}>Random Challenge</Button>
                        <Button size="small" key="randomEasy" onClick={()=>handelEasyRandomChallenge(false)}>Easiest one (4 puzzles)</Button>
                        <Button size="small" key="randomHard" onClick={()=>handelHardRandomChallenge(false)}>Hardest one (12 puzzles)</Button>
                    </ButtonGroup>
                    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
                        <Button size="large" key="randomDate" onClick={()=>handleRandomChallenge(true)}>Random Date Challenge</Button>
                        <Button size="small" key="randomDateEasy" onClick={()=>handelEasyRandomChallenge(true)}>Easiest one (2 puzzles)</Button>
                        <Button size="small" key="randomDateHard" onClick={()=>handelHardRandomChallenge(true)}>Hardest one (4 puzzles)</Button>
                    </ButtonGroup>
                </Stack>
                <Stack direction="row" spacing={2} style={{paddingTop: '0.5em'}}>
                    <div>Solution Key: <Input size="small" type="number" style={{width:'75px'}} value={key.toString()} onChange={(e)=>setKey(Number(e.target.value))}/> (in range 1-19600)</div>
                </Stack>
            </Stack>
        </Stack>
    );

}