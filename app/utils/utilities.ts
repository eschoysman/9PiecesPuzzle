export const random = <T>(array:T[], except?:T|T[]):T => {

    const filter = innerFilter(except);

    const n = array.length;
    let result:T;

    do {
        result = array[Math.floor(n*Math.random())];
    } while(filter(result));

    return result as T;
}

export const randomNumber = (maxValueExcluded:number, except?:number|number[]):number => {

    const filter = innerFilter(except);

    let result:number;

    do {
        result = Math.floor(maxValueExcluded*Math.random());
    } while(filter(result));

    return result as number;
}

const innerFilter = <T>(except?:T|T[]):(elem:T)=>boolean => {
    if(Array.isArray(except)) {
        const exceptArray = except as T[];
        return (elem:T)=>exceptArray.includes(elem);
    }
    else if(except !== null) {
        const exceptElem = except as T;
        return (elem:T)=>exceptElem!==elem;
    }
    return (elem:T)=>true;
}
