export const delay = async (time = 1000): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};


type AllType = 'string' | 'number' | 'bigint' | 'nan' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'date' | 'function' | 'array' | 'null'

export const typeIs = <T>(input: T, target?: AllType) => {
    if (Array.isArray(input)) {
        return !target ? 'array' : target === 'array';
    } else if (input === null) {
        return !target ? 'null' : target === 'null';
    } else if (typeof input === 'number' && isNaN(input)) {
        return !target ? 'nan' : target === 'nan';
    } else if (input instanceof Date) {
        return !target ? 'date' : target === 'date';
    }

    return !target ? typeof input : target === typeof input;
};
