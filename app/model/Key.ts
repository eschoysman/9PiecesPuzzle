export interface Key {
    code: number;
    key1: number;
    key2: number;
    key3: number;
}

export function createKeyFromCode(keys: number[]): number {
    const sorted = keys.sort((a,b)=>a-b);
    return (sorted[2] - 2) * (sorted[2] - 1) * sorted[2] / 6 + (sorted[1] - 1) * sorted[1] / 2 + sorted[0] + 1;
}
