import * as challengeService from "../services/PuzzleService";
import {EMPTY_SOLUTION, Solution} from "@/app/model/Solution";

const fetchNoSolution = (): Promise<Solution> => {
    return new Promise(resolve => resolve(EMPTY_SOLUTION));
};

export const useGetChallengeByKeyId = () => {
    const challengeByKeyId = (keyID?:number):Promise<Solution> => (typeof keyID !== "number" || keyID<=0 || keyID>19600) ? fetchNoSolution() : challengeService.getByKeyId(keyID);
    return { challengeByKeyId };
};

export const useGetRandomChallenge = () => {
    const randomChallenge = ():number => challengeService.getRandomChallenge();
    return { randomChallenge };
};

export const useGetRandomDateChallenge = () => {
    const randomDateChallenge = ():number => challengeService.getRandomDateChallenge();
    return { randomDateChallenge };
};
