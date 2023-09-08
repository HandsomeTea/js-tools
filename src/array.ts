/**
 * 随机获取数组中某一项
 *
 * @template T
 * @param {Array<T>} arr
 * @returns {T}
 */
export const getOneOf = <T>(arr: Array<T>): T => {
    return arr[Math.floor(Math.random() * arr.length)];
}
