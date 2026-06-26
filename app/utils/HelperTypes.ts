import {CSSProperties, ReactNode, StyleHTMLAttributes} from "react";
// import {SxProps, Theme} from "@mui/system";

export type WithChildren = { children?: ReactNode | undefined };
export type WithCustomCSS = { style?: CSSProperties | undefined };
export type WithHtmlAttributes<P = unknown> = StyleHTMLAttributes<P>;
// export type WithSxProps = {sx?: SxProps<Theme> | undefined }
