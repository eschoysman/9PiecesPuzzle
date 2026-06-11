import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import {Grid, GridInput} from "@/app/components/grid/Grid";
import {createKeyFromCode} from "@/app/model/Key";
import {allColorsState} from "@/app/components/result/ResultColorFilter";
import keyboardNumberListener from "@/app/hooks/KeyboardNumberHandler";
import {BlockColor,getBlockColor} from "@/app/enumeration/BlockColor";
import * as blockColors from "@/app/enumeration/BlockColor";
import {Cell} from "@/app/components/cell/Cell";
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioColors from "@/app/components/filters/output/RadioColors";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FilterResultModal({solutionTemplate, onCloseAction}: {solutionTemplate?: string; onCloseAction?:(solutionFilter:string)=>void}) {

    const [open, setOpen] = useState(false);
    const [solutionFilter, setSolutionFilter] = useState(solutionTemplate || blockColors.UNKNOWN.value.repeat(50));
    const [selectedBlock, setSelectedBlock] = useState<BlockColor>(blockColors.RED);

    const block:BlockColor = keyboardNumberListener(open);

    useEffect(() => {
        console.log("Template:",solutionTemplate);
    }, [solutionFilter]);

    useEffect(() => {
        setSelectedBlock(block);
    }, [block]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(onCloseAction) {
            onCloseAction(solutionFilter);
        }
        setOpen(false);
    }

    const handleCellClick = (index: number):void => {
        setSolutionFilter(currentFilter => {
            return currentFilter.substring(0,index)+selectedBlock.value+currentFilter.substring(index+1); }
        );
    }

    function emptySolution() {
        return {
            solution: solutionFilter,
            squareSize: 40,
            colorToShow: allColorsState,
            onCellClick: handleCellClick
        } as GridInput;
    }

    return (
        <div>
            <Button variant="contained" size="large" key="customFilter" style={{width:"100%"}} onClick={handleOpen}>Custom Filter</Button>
            <Modal  open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="column" spacing={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign: "center"}}>
                            Customize your filter!
                        </Typography>
                        <RadioColors updateBlock={setSelectedBlock}/>
                        <Grid gridData={emptySolution()}/>
                        <Button variant="contained" size="small" key="close" onClick={handleClose}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
