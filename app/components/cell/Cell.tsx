import "./cell.css"
import {WithChildren, WithCustomCSS} from "@/app/utils/HelperTypes";

interface CellData {
    color?: string;
    borderColor?: string;
    backgroundImage?: string;
    size: number;
    onClick?: ()=>void;
}

export const Cell = ({children,style, size,color,borderColor,backgroundImage,onClick}:CellData & WithChildren & WithCustomCSS) => {

    const chamferSize = Math.round(size/8);
    const backgroundImageCss = !backgroundImage ? {} : {
                        backgroundImage: "url("+backgroundImage+")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      } as React.CSSProperties;
    const cssParams = {
                        "--size": (3/4)*size+"px",
                        "--color": color,
                        "--borderColor": borderColor,
                        "--chamfer": chamferSize+"px",
                        ...backgroundImageCss,
                        ...style,
                      } as React.CSSProperties;

    const classNames = "gridCell"+(color==="transparent" ? "" : " coloredCell");

    return (
        <>
            <div style={cssParams} className={classNames} onClick={onClick}>
                {children}
            </div>
        </>
    );

}