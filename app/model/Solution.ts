import {Key} from "@/app/model/Key";
import {Combination} from "@/app/model/Combination";

export interface Solution {
	key: Key;
	type: string;
	dayOfWeek?: string,
	dayOfMonth?: number,
	month?: string,
	numberOfSolutions: number,
	combinations: Combination[];
}

export const EMPTY_SOLUTION: Solution = {
	key: {
		code: 0,
		key1: 0,
		key2: 0,
		key3: 0
	},
	type: "",
	dayOfWeek: "-",
	dayOfMonth: 0,
	month: "-",
	numberOfSolutions: 0,
	combinations: []
};