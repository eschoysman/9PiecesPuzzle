import {useEffect, useState} from "react";
import {Box, Button, Modal, Stack, Typography} from '@mui/material';
import {Grid, GridInput} from "@/app/components/common/grid/Grid";
import {createKeyFromCode, getSolutionTemplateFromKeys} from "@/app/model/Key";
import {allColorsState} from "@/app/components/filters/output/ResultColorFilter";

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
        setSolution(getSolutionTemplateFromKeys(key1,key2,key3));
    },[key1,key2,key3]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(key1!=null && key2 && key3) {
            onCloseAction(createKeyFromCode([key1,key2,key3]).code);
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
        <>
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
        </>
    );
}
