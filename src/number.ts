/**
 * 将数字补全为多少位字符串
 */
export const fixedNumString = (num: number | string, length?: number) => {
    if (!length || length < 2) {
        length = 2;
    }
    if (!num) {
        return '00';
    }
    const numStr = `${num}`.trim();
    const fixLen = length - numStr.length;

    if (fixLen <= 0) {
        return numStr;
    }

    return (0).toFixed(fixLen).substring(2) + num;
    // return Array(fixLen).fill('0').join('') + num;
};

export const numberThousandth = (num: number) => `${num}`.replace(/(?=(\B)(\d{3})+$)/g, ',');

// export function numberThousand(num: number | string): string {
//     // return `${num}`.replace(/(?=(\B)(\d{3})+$)/g, ',');
//     const mark = `${num}`.includes('-')
//     const arr = `${num}`.split('');
//     let number = 0;

//     for (let s = arr.length % 3 - 1; s < arr.length; s++) {
//         number++;

//         if (number === 3) {

//         }
//     }
// }


/**
 * 生成两个数字之间的数，包括小的，不包括大的
 *
 * @param {number} [m=0] 默认为0
 * @param {number} [n=0] 默认为0
 * @returns
 */
export const randomNum = (m = 0, n = 0) => {
    const split = Math.abs(n - m);

    return Math.floor(Math.random() * split) + (m > n ? n : m);
};
