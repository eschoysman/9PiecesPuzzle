import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Grid, GridInput} from "@/app/components/grid/Grid";
import {createKeyFromCode} from "@/app/model/Key";
import {allColorsState} from "@/app/components/result/ResultColorFilter";
import Stack from "@mui/material/Stack";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CustomChallengeModal({onCloseAction}: {onCloseAction:(newKey:number)=>void}) {

    const [open, setOpen] = useState(false);
    const [solution, setSolution] = useState<string>('?'.repeat(50));
    const [key1,setKey1] = useState<number|null>();
    const [key2,setKey2] = useState<number|null>();
    const [key3,setKey3] = useState<number|null>();

    useEffect(()=>{
        let emptySolution = '?'.repeat(50);
        if(key1!=null) { emptySolution = emptySolution.substring(0,key1)+'X'+emptySolution.substring(key1+1); }
        if(key2!=null) { emptySolution = emptySolution.substring(0,key2)+'X'+emptySolution.substring(key2+1); }
        if(key3!=null) { emptySolution = emptySolution.substring(0,key3)+'X'+emptySolution.substring(key3+1); }
        setSolution(newValue => emptySolution);
    },[key1,key2,key3]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(key1!=null && key2 && key3) {
            const newKey = createKeyFromCode([key1,key2,key3])
            onCloseAction(newKey);
        }
        else {
            alert("Too few cell selected, no challenge can be created");
        }
        setSolution('?'.repeat(50));
        setKey1(null);
        setKey2(null);
        setKey3(null);
        setOpen(false);
    }

    const handleCellClick = (index: number) => {
        if(key1!=null && index==key1 || key2 && index==key2 || key3 && index==key3) {
            console.log("Ignoring duplicate key:",index);
            return;
        }
        setKey1(key2);
        setKey2(key3);
        setKey3(index);
    }

    function emptySolution() {
        return {
            solution: solution,
            squareSize: 40,
            onCellClick: handleCellClick,
            colorToShow: allColorsState,
        } as GridInput;
    }

    return (
        <div>
            <Button variant="contained" size="large" key="customPuzzle" style={{width:"100%"}} onClick={handleOpen}>Custom Challenge</Button>
            <Modal  open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Stack direction="column" spacing={2} style={{textAlign: "center"}}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Customize your puzzle!
                        </Typography>
                        <Grid gridData={emptySolution()}/>
                        <Button variant="contained" size="small" key="close" onClick={handleClose}>Custom challenge</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
