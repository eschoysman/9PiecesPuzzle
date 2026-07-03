import {typeOf} from "uri-js/dist/esnext/util";

export interface Key {
    code: number;
    key1: number;
    key2: number;
    key3: number;
}

export function createKeyFromCode(keys: number[]): Key {
    const sorted = keys.sort((a,b)=>a-b);
    return {
        code: (sorted[2] - 2) * (sorted[2] - 1) * sorted[2] / 6 + (sorted[1] - 1) * sorted[1] / 2 + sorted[0] + 1,
        key1: keys[0],
        key2: keys[1],
        key3: keys[2],
    };
}

export function getSolutionTemplateFromKey(key: Key) {
    return getSolutionTemplateFromKeys(key.key1, key.key2, key.key3);
}

export function getSolutionTemplateFromKeys(key1: number|null|undefined, key2: number|null|undefined, key3: number|null|undefined) {
    let template = '?'.repeat(50);
    if(key1 && typeOf(key1) === 'number') template = template.substring(0, key1) + '0' + template.substring(key1 + 1);
    if(key2 && typeOf(key2) === 'number') template = template.substring(0, key2) + '0' + template.substring(key2 + 1);
    if(key3 && typeOf(key3) === 'number') template = template.substring(0, key3) + '0' + template.substring(key3 + 1);
    return template;
}
