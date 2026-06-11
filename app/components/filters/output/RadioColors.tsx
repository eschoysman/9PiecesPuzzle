import {useEffect, useRef, useState} from "react";
import Stack from '@mui/material/Stack';
import {allColorsState} from "@/app/components/result/ResultColorFilter";
import * as blockColors from "@/app/enumeration/BlockColor";
import {BlockColor, getBlockColor} from "@/app/enumeration/BlockColor";
import {Cell} from "@/app/components/cell/Cell";
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import backgroundImage from "@/public/img/allColorBackground.png";


export interface RadioColorsProps {
    updateBlock: (blockColor:BlockColor)=>void;
}

export default function RadioColors({updateBlock}: RadioColorsProps) {

    const [blockValue,setBlockValue] = useState<string>(blockColors.RED.value);

    useEffect(() => {
        updateBlock(getBlockColor(blockValue));
    }, [blockValue]);

    const sxParams = (colorValue:string)=> ({
        color: colorValue,
        '&.Mui-checked': {
            color: colorValue
        }
    });

    const isChecked = (blockColor:string) => {
        return blockValue == blockColor;
    }

    const handleClick = (value:string) => {
        setBlockValue(value);
    };

    const customCellCss = {
        "--chamfer": "0px",
        borderRadius:'5px'
    } as React.CSSProperties;
    const cleanButton = <Cell key={"allNoneColors"} size={160/3} borderColor={blockColors.WHITE.color} backgroundImage={backgroundImage.blurDataURL} style={customCellCss}>
        <Tooltip describeChild title="Emtpty cell" arrow>
            <Radio id="radioColor_${index}"
                   checked={isChecked(blockColors.UNKNOWN.value)}
                   onChange={(event)=>handleClick(event.target.value)}
                   value={blockColors.UNKNOWN.value}
                   name="radio-buttons"
                   sx={sxParams(blockColors.UNKNOWN.color)}
                   style={{ width: "30px", padding:0, paddingTop:'8px', paddingLeft:'10px' }}
            />
        </Tooltip>
    </Cell>

    const createRadio = (value:string,index:number) => {
        const color = allColorsState[value];
        const blockColor = getBlockColor(value);
        return <Cell key={index} size={40} color={color}>
                   <Tooltip describeChild title={blockColor.name} arrow>
                       <Radio id="radioColor_${index}"
                              checked={isChecked(blockColor.value)}
                              onChange={(event)=>handleClick(event.target.value)}
                              value={blockColor.value}
                              name="radio-buttons"
                              sx={sxParams(blockColors.UNKNOWN.color)}
                              style={{ width: "30px", padding:0, paddingTop:'5px' }}
                       />
                   </Tooltip>
               </Cell>
    }

    const buttons = <Stack direction="row">
                        {'123456789'.split('').map((value,index) => createRadio(value,index))}
                    </Stack>

    return (
        <Stack direction="row" spacing={2}>
            {cleanButton}
            {buttons}
        </Stack>
    )
}
