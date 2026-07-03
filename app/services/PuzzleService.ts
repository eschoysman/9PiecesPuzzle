import dateSolutions from "../../public/json/dateSolutions.json";
import unmakeableSolutions from "../../public/json/unmakeableSolutions.json";

import {random, randomNumber} from "@/app/utils/Utilities";
import {Combination} from "@/app/model/Combination";
import {getSolutionTemplateFromKey} from "@/app/model/Key";
import {Solution} from "@/app/model/Solution";

export const getByKeyId = (keyID: number) => fetch(`json/solutions/Solution${keyID}.json`).then(response => response.json())
    .then(solutionResponse => {
        return {
            key: solutionResponse.key,
            detail: {
                type: solutionResponse.type,
                dayOfWeek: solutionResponse.dayOfWeek,
                dayOfMonth: solutionResponse.dayOfMonth,
                month: solutionResponse.month,
                numberOfSolutions: solutionResponse.numberOfSolutions
            },
            combinations: solutionResponse.combinations.map((comb: Omit<Combination,'id'>, index:number) => ({...comb,id:solutionResponse.key.code+'/'+(index+1),subKey:index+1} as Combination)),
            template: getSolutionTemplateFromKey(solutionResponse.key)
        } as Solution
    });

export const getRandomChallenge = () =>  randomNumber(19601, unmakeableSolutions)
export const getRandomDateChallenge = () => random(dateSolutions,unmakeableSolutions)
