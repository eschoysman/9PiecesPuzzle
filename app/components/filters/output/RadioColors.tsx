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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RadioColors({selectedBlock,setSelectedBlock}: {selectedBlock: BlockColor, setSelectedBlock:(blockColor:BlockColor)=>void}) {

    const block:BlockColor = keyboardNumberListener(open);

    const sxParams = (colorValue:string)=> ({
        color: colorValue,
        '&.Mui-checked': {
            color: colorValue
        }
    });

    const isChecked = (blockColor:BlockColor) => {
        return selectedBlock == blockColor;
    }

    const handleClick = (value:string, blockColor:BlockColor) => {
        setSelectedBlock(block => blockColor);
        console.log("Selected block:", selectedBlock);
    };

    const createRadio = (value:string,index:number) => {
        const color = allColorsState[value];
        const blockColor = getBlockColor(value);
        return <Cell key={index} size={45} color={color}>
                   <Tooltip describeChild title={blockColor.name} arrow>
                       <Radio id="radioColor_${index}"
                              checked={isChecked(blockColor)}
                              onChange={(event)=>handleClick(blockColor)}
                              value={blockColor}
                              name="radio-buttons"
                              sx={sxParams(blockColors.UNKNOWN.color)}
                              style={{ width: "33px", padding:0, paddingTop:'5px' }}
                       />
                   </Tooltip>
               </Cell>
    }

    const buttons = <Stack direction="row">
                        {'123456789'.split('').map((value,index) => createRadio(value,index))}
                    </Stack>

    return ({buttons});
}
