import * as challengeService from "../services/challengeService";
import {Solution} from "@/app/model/Solution";

export const useGetChallengeByKeyId = () => {
    const challengeByKeyId = (keyID:number):Promise<Solution> => challengeService.getByKeyId(keyID);
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
