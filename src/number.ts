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

/** 数字千分 */
export const numberThousandth = (num: number | string) => `${num}`.replace(/(?=(\B)(\d{3})+$)/g, ',');

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

/**
 * 大整数相加
 *
 * @param {(number | string)} num1
 * @param {(number | string)} num2
 * @returns {string}
 */
export const add = (num1: number | string, num2: number | string): string => {
    let num1Str = num1.toString();
    let num2Str = num2.toString();

    if (num1Str.includes('.') || num2Str.includes('.')) {
        const part1 = num1Str.split('.')[1]?.length || 0;
        const part2 = num2Str.split('.')[1]?.length || 0;

        if (!num1Str.includes('.')) {
            num1Str = num1Str + '.' + new Array(part2).fill('0').join('');
        } if (!num2Str.includes('.')) {
            num2Str = num2Str + '.' + new Array(part1).fill('0').join('');
        } else {
            const count = Math.abs(part1 - part2);

            if (count > 0) {
                if (part1 > part2) {
                    num2Str = num2Str + new Array(count).fill('0').join('');
                } else {
                    num1Str = num1Str + new Array(count).fill('0').join('');
                }
            }
        }
    }
    const num1Arr = num1Str.split('');
    const num2Arr = num2Str.split('');
    const resultArr: Array<string> = [];
    let carry = 0;

    while (num1Arr.length || num2Arr.length || carry) {
        const num1Item = num1Arr.length ? num1Arr.pop() : '0';
        const num2Item = num2Arr.length ? num2Arr.pop() : '0';

        if (num1Item === '.') {
            resultArr.unshift('.');
            continue;
        }
        const sum = Number(num1Item) + Number(num2Item) + carry;

        resultArr.unshift(`${sum % 10}`);
        carry = Math.floor(sum / 10);
    }

    return resultArr.join('');
};

/**
 * 相乘，大数相乘
 *
 * @param {(number | string)} num1 如果为number类型的小数，小数点最多取前4位
 * @param {(number | string)} num2 如果为number类型的小数，小数点最多取前4位
 * @returns {string}
 */
export const multiply = (num1: number | string, num2: number | string): string => {
    const count = (num1.toString().split('.')[1]?.length || 0) + (num2.toString().split('.')[1]?.length || 0);
    const num1Arr = num1.toString().replace('.', '').split('').reverse();
    const num2Arr = num2.toString().replace('.', '').split('').reverse();
    const strArr: Array<string> = [];

    for (let i = 0; i < num1Arr.length; i++) {
        let resStr = '';
        let carry = 0;

        for (let j = 0; j < num2Arr.length; j++) {
            const resultItem = Number(num1Arr[i]) * Number(num2Arr[j]) + carry;

            carry = Math.floor(resultItem / 10);
            resStr = `${resultItem % 10}` + resStr;
        }
        if (carry) {
            resStr = `${carry}` + resStr;
        }
        strArr.push(resStr);
    }
    // console.log('strArr', strArr);
    let mark = false;
    const resultArr: Array<number> = [];

    for (let i = 0; ; i++) {
        const add = strArr.map((a, index) => {
            const res = (a + new Array(index).fill('0').join('')).split('').reverse()[i];

            if (res) {
                mark = true;
                return Number(res);
            }
            mark = false;
            return 0;
        }).reduce((a, b) => a + b, 0);

        if (!mark) {
            break;
        }
        resultArr.unshift(add);
    }
    // console.log('resultArr', resultArr);
    let result = '';
    let carry = 0;

    for (let i = 0; ; i++) {
        const num = resultArr.pop();

        if (!carry && typeof num === 'undefined') {
            break;
        }
        result = `${((num || 0) + carry) % 10}` + result;
        if (count && result.length === count) {
            result = '.' + result;
        }
        carry = Math.floor(((num || 0) + carry) / 10);
    }
    if (result[0] === '0' && result[1] !== '.') {
        result = result.substr(1);
    }
    return result;
};
