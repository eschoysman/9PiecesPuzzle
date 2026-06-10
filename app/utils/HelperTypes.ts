import {CSSProperties, ReactNode, StyleHTMLAttributes} from "react";

export type WithChildren = { children?: ReactNode | undefined };
export type WithCustomCSS = { style?: CSSProperties | undefined };
export type WithHtmlAttributes<P = unknown> = StyleHTMLAttributes<P>;
