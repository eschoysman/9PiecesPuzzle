import {JSX} from "react";
import {Cell} from "@/app/components/common/cell/Cell";
import * as blockColors from "@/app/enumeration/BlockColor";
import "./grid.css"

export interface GridInput {
    id?: string;
    solution: string;
    squareSize?: number;
    onCellClick?: (index:number)=>void;
    colorToShow: Record<string,string|undefined>;
    cells?: Record<string,JSX.Element>;
}

export const Grid = ({gridData}:{gridData:GridInput}) => {

    const defaultValues = ["Gen","Feb","Mar", "1", "2", "3", "4", "5","Lun","Mar",
                           "Apr","Mag",  "6", "7", "8", "9","10","11", "12","Mer",
                           "Giu","Lug", "13","14","15","16","17","18", "19","Gio",
                           "Ago","Set", "20","21","22","23","24","25", "26","Ven",
                           "Ott","Nov","Dic","27","28","29","30","31","Sab","Dom"];

    const handleCellClick = (index: number) => {
        return ()=>gridData.onCellClick && gridData.onCellClick(index);
    }

    const getColor = (value: string):string => {
        return gridData.colorToShow[value] || blockColors.UNKNOWN.color;
    }

    const cellSize = gridData.squareSize || 25;

    const listCells = gridData.solution ? Array.from(gridData.solution).map((value,index) =>
        <Cell key={"cell_"+index} size={cellSize} color={getColor(value) || "transparent"} onClick={handleCellClick(index)} />
    ) : [];
    return (
        <>
            <div>
                <div className="solutionGrid" style={{
                    maxWidth: (10*cellSize)+"px",
                }}>
                    {listCells}
                </div>
                {gridData.id && <span>ID: {gridData.id}</span>}
            </div>
        </>
    );

}