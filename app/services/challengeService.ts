import dateSolutions from "../../public/json/dateSolutions.json";
import unmakeableSolutions from "../../public/json/unmakeableSolutions.json";

import {random, randomNumber} from "@/app/utils/utilities";


export const getByKeyId = (keyID: number) => fetch(`json/solutions/Solution${keyID}.json`).then(response => response.json());
export const getRandomChallenge = () =>  randomNumber(19601, unmakeableSolutions)
export const getRandomDateChallenge = () => random(dateSolutions,unmakeableSolutions)
