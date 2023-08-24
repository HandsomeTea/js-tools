/** 字符串转义 */
export const escapeRegExp = (str: string): string => {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
};

/** 首字母大写 */
export const capitalize = (str: string): string => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

/**
 * 从alphabet中随机挑选charsCount个字符组成随机字符串
 */
export default (charsCount: number, alphabet: string): string => {
    const digits = [];

    for (let i = 0; i < charsCount; i++) {
        digits[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return digits.join('');
};

export const isURL = (str: string): boolean => /^(https?:\/\/|data:)/.test(str);

export const isEmail = (email: string): boolean => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);