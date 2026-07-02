import {Key} from "@/app/model/Key";
import {Combination} from "@/app/model/Combination";

export interface Solution {
	key: Key;
	detail: Detail;
	combinations: Combination[];
	template: string;
}
export interface Detail {
	type: string;
	dayOfWeek?: string,
	dayOfMonth?: number,
	month?: string,
	numberOfSolutions: number,
}

export const EMPTY_SOLUTION: Solution = {
	key: {
		code: 0,
		key1: 0,
		key2: 0,
		key3: 0
	},
	detail: {
		type: "",
		dayOfWeek: "-",
		dayOfMonth: 0,
		month: "-",
		numberOfSolutions: 0,
	},
	combinations: [],
	template: '?'.repeat(50)
};