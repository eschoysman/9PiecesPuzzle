import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import {Grid, GridInput} from "@/app/components/common/grid/Grid";
import {allColorsState} from "@/app/components/filters/output/ResultColorFilter";
import * as blockColors from "@/app/enumeration/BlockColor";
import {BlockColor} from "@/app/enumeration/BlockColor";
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

export interface FilterResultModalProps {
    solutionTemplate?: string,
    onCloseAction?:(solutionFilter:string)=>void
}

export default function FilterResultModal({solutionTemplate, onCloseAction}: FilterResultModalProps) {

    const [open, setOpen] = useState(false);
    const [solutionFilter, setSolutionFilter] = useState(solutionTemplate || blockColors.UNKNOWN.value.repeat(50));
    const [selectedBlock, setSelectedBlock] = useState<BlockColor>(blockColors.RED);

    // useEffect(() => {
    //     console.log("Template:",solutionTemplate);
    // }, [solutionFilter]);

    useEffect(() => {
        handleCleanFilter();
    }, [solutionTemplate]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(onCloseAction) {
            onCloseAction(solutionFilter);
        }
        setOpen(false);
    }

    const handleCleanFilter = () => {
        setSolutionFilter(solutionTemplate || blockColors.UNKNOWN.value.repeat(50));
    }

    const handleCellClick = (index: number):void => {
        if (solutionFilter.charAt(index) !== '0') {
            setSolutionFilter(currentFilter => {
                    return currentFilter.substring(0,index)+selectedBlock.value+currentFilter.substring(index+1);
                }
            );
        }
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
            <Button variant="contained" size="large" key="customFilter" onClick={handleOpen}>Custom Filter</Button>
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
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" size="small" key="close" style={{width: "50%"}} onClick={handleCleanFilter}>Clean filter</Button>
                            <Button variant="contained" size="small" key="close" style={{width: "50%"}} onClick={handleClose}>Confirm</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
