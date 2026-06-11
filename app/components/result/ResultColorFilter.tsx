import Stack from "@mui/material/Stack";
import * as blockColors from "@/app/enumeration/BlockColor";
import {getBlockColor} from "@/app/enumeration/BlockColor";
import {useEffect, useState} from "react";
import {Cell} from "@/app/components/cell/Cell";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from '@mui/material/Tooltip';
import backgroundImage from '../../../public/img/allColorBackground.png';


export const allColorsState:Record<string,string> = {'0': blockColors.EMPTY.color,
                                                     '1': blockColors.RED.color,
                                                     '2': blockColors.GREEN.color,
                                                     '3': blockColors.BLUE.color,
                                                     '4': blockColors.BLACK.color,
                                                     '5': blockColors.WHITE.color,
                                                     '6': blockColors.YELLOW.color,
                                                     '7': blockColors.BROWN.color,
                                                     '8': blockColors.MARBLE.color,
                                                     '9': blockColors.NEBULAE.color,
                                                     'X': blockColors.BLOCKED.color};
export const noColorState:Record<string,string> = {'0': blockColors.EMPTY.color,
                                                   '1': blockColors.UNKNOWN.color,
                                                   '2': blockColors.UNKNOWN.color,
                                                   '3': blockColors.UNKNOWN.color,
                                                   '4': blockColors.UNKNOWN.color,
                                                   '5': blockColors.UNKNOWN.color,
                                                   '6': blockColors.UNKNOWN.color,
                                                   '7': blockColors.UNKNOWN.color,
                                                   '8': blockColors.UNKNOWN.color,
                                                   '9': blockColors.UNKNOWN.color,
                                                   'X': blockColors.BLOCKED.color};

export interface ResultColorFilter {
    colorShown: Record<string,string>,
    setColorShown: (newValue: Record<string,string>) => void,
    setShowSolutions: (newValue: boolean) => void,
    customColorFilter?: string
}

export default function ResultColorFilter({colorShown, setColorShown, setShowSolutions, customColorFilter}: ResultColorFilter) {

    const [isAllSelected, setAllSelected] = useState<boolean>(false);
    const [isIndeterminate, setIndeterminate] = useState<boolean>(false);

    useEffect(() => {
        setAllSelected(Object.keys(colorShown).slice(1,10).every(value => isChecked(value)));
        const values = Object.keys(colorShown).slice(1,10);
        setIndeterminate(values.some(value => isChecked(value)) && values.some(value => !isChecked(value)));
        setShowSolutions(!!Object.keys(colorShown).slice(1,10).find(value => isChecked(value)));
    }, [colorShown]);

    useEffect(() => {
        if(customColorFilter) {
            const newColorsShown = {...noColorState};
            Array.from(customColorFilter).forEach((value)=> {
                newColorsShown[value] = allColorsState[value];
            });
            setColorShown(newColorsShown);
        }
    }, [customColorFilter]);

    const sxParams = (colorValue:string)=> ({
        color: colorValue,
        '&.Mui-checked': {
            color: colorValue
        }
    });

    const isChecked = (value:string) => {
        return colorShown[value] !== noColorState[value];
    }
    const handleClick = (value:string, color:string, checked:boolean) => {
        const newColorsShown = {...colorShown};
        newColorsShown[value] = checked ? color : noColorState[value];
        setColorShown(newColorsShown);
    };
    const handleSelectAllNone = (checked:boolean) => {
        setColorShown(checked ? allColorsState : noColorState);
    };

    const createButton = (value:string,index:number) => {
        const color = allColorsState[value];
        const blockColor = getBlockColor(value);
        return <Cell key={index} size={40} color={color}>
                   <Tooltip describeChild title={blockColor.name} arrow>
                       <Checkbox id="showColor_${index}"
                                 checked={isChecked(value)}
                                 onChange={(event)=>handleClick(value,color,event.target.checked)}
                                 sx={sxParams(blockColors.UNKNOWN.color)}
                                 style={{ width: "30px", padding:0, paddingTop:'4px' }}/>
                   </Tooltip>
               </Cell>
    }

    const buttons = <Stack direction="row">
        {'123456789'.split('').map((value,index) => createButton(value,index))}
    </Stack>

    const customCellCss = {
        "--chamfer": "0px",
        borderRadius:'5px'
    } as React.CSSProperties;
    const conicGradientCssColor = "conic-gradient(rgb(255,0,0),rgb(0,255,0),rgb(0,77,255),rgb(66,67,121),rgb(0,0,0),rgb(254,198,0),rgb(215,212,212),rgb(157,67,44),rgb(255,0,0));";

    const checkAllNone = () => {
        const cssParams = {
            "--chamfer": "0px",
            borderRadius:'5px'
        } as React.CSSProperties;
        return <Stack direction="row" spacing={1}>
            <Cell key={"allNoneColors"} size={160/3} borderColor={blockColors.WHITE.color} backgroundImage={backgroundImage.blurDataURL} style={customCellCss}>
                <Tooltip describeChild title="All colors" arrow>
                    <Checkbox id="allNoneColors_id"
                              checked={isAllSelected}
                              indeterminate={isIndeterminate}
                              onChange={(event)=>handleSelectAllNone(event.target.checked)}
                              sx={sxParams(blockColors.WHITE.color)}
                              style={{ width: "30px", padding:0, paddingTop:'8px', paddingLeft:'10px' }}
                    />
                </Tooltip>
            </Cell>
        </Stack>
    };

    return (
        <Stack direction="column" spacing={1}>
            <span style={{"paddingTop": "0.7em"}}>Select color to display in the solutions:</span>
            <Stack direction="row" spacing={2}>
                {checkAllNone()}
                {buttons}
            </Stack>
        </Stack>
    );

}