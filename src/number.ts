/**
 * 将数字补全为多少位字符串
 */
export function fixedNumString(num: number, length: number): string
export function fixedNumString(num: string, length: number): string
export function fixedNumString(num: number): string
export function fixedNumString(num: string): string
export function fixedNumString(num: number | string, length?: number) {
    if (!length || length < 2) {
        length = 2;
    }
    const numStr = `${num}`.trim();
    const fixLen = length - numStr.length;

    if (fixLen <= 0) {
        return numStr;
    }

    return (0).toFixed(fixLen).substring(2) + num;
    // return Array(fixLen).fill('0').join('') + num;
}

export const numberThousandth = (num: number) => `${num}`.replace(/(?=(\B)(\d{3})+$)/g, ',')
