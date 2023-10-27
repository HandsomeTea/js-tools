/**
 * 随机获取数组中某一项
 *
 * @template T
 * @param {Array<T>} arr
 * @returns {T}
 */
export const oneOf = <T>(arr: Array<T>): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};


/**
 * 将数组转化为以某个键值为key的对象
 *
 * @param {Array<O>} source 要被转化的数组
 * @param {{ keyOf: keyof O, valOf?: keyof O, unique?: boolean }} key keyOf表示要取哪个字段的值为key；valOf表示要取哪个字段的值为value；unique表示如果值重复，是否覆盖
 * @returns {({ result: Record<string, O | O[Okey]>, invalid?: Array<O>, repeat?: Array<O> })} result表示转化结果；invalid表示keyOf所代表的字段值为‘’，undefined或null的数组元素；repeat表示valOf所代表的字段值重复的数组项
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayToObject = <O extends Record<string, any>, Okey extends keyof O>(source: Array<O>, key: { keyOf: keyof O, valOf?: keyof O, unique?: boolean }): { result: Record<string, O | O[Okey]>, invalid?: Array<O>, repeat?: Array<O> } => {
    if (source.length === 0) {
        return {
            result: {}
        };
    }
    const { keyOf, valOf } = key;
    const unique = Boolean(key.unique);

    const result: Record<string, O> = {};
    const invalid: Array<O> = [];
    const repeat: Array<O> = [];

    for (let s = 0; s < source.length; s++) {
        if (typeof source[s][keyOf] !== 'undefined' && source[s][keyOf] !== null && source[s][keyOf] !== '') {
            if (typeof result[source[s][keyOf]] !== 'undefined' && unique === false) {
                repeat.push(source[s]);
            } else {
                result[source[s][keyOf]] = !valOf ? source[s] : source[s][valOf];
            }
        } else {
            invalid.push(source[s]);
        }
    }

    return {
        result,
        ...invalid.length > 0 ? { invalid } : {},
        ...repeat.length > 0 ? { repeat } : {}
    };
};
