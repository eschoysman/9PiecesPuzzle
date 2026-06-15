import {useState} from "react";
import useEventListener from "@use-it/event-listener";
import * as blockColors from "@/app/enumeration/BlockColor";
import {BlockColor, getBlockColor} from "@/app/enumeration/BlockColor";

const keyboardNumberListener = (enable:boolean=true) => {
    const [block, setBlock] = useState<BlockColor>(blockColors.UNKNOWN);
    useEventListener(
        "keypress",
        (event:KeyboardEvent) => {
            if(enable) {
                const key = event.key;
                if(key >= '1' && key <= '9') {
                    setBlock(getBlockColor(key));
                }
                if(key === '0') {
                    setBlock(blockColors.UNKNOWN);
                }
            }
        },
    );
    return block;
};

export default keyboardNumberListener;
