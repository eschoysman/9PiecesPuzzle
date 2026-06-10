import {api} from "../adapters/apiJson";

const basePath = "challenge";

export const today = () =>
    api.get(`${basePath}/today`);

export const getByKeyId = (keyID: number) =>
    api.get(`${basePath}/${keyID}`);

export const getByKeyIdAndSubKey = (keyID: number, subKey:number) =>
    api.get(`${basePath}/${keyID}/${subKey}`);

export const getRandomChallenge = () =>
    api.get(`${basePath}/random`);

export const getRandomDateChallenge = () =>
    api.get(`${basePath}/random/date`);
