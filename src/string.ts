/** 字符串转义 */
export const stringEscape = (str: string): string => {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
};

/** 首字母大写 */
export const firstCapitalize = (str: string): string => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

export const isURL = (str: string): boolean => /^(https?:\/\/|data:)/.test(str);

export const isEmail = (email: string): boolean => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

export const isPhone = (phone: unknown): boolean => typeof phone === 'string' && /^((\+|00)86)?1[3-9]\d{9}$/.test(phone);
// /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/ // 最严格的判断方式
// /^((\+|00)86)?1[3-9]\d{9}$/
// /^((\+|00)86)?1\d{10}$/ // 最宽松的判断方式

/**
 * 返回隐藏中间四位的手机号
 * 内部调用了isPhone
 *
 * @private
 * @param {string} phone
 * @returns {string}
 */
export const displayPhone = (phone: string): string | void => {
    if (!isPhone(phone)) {
        return;
    }
    const reverseString = (str: string): string => str.split('').reverse().join('');
    const reverse = reverseString(phone);
    const startReverse = reverse.substring(8);
    const endReverse = reverse.substring(0, 4);

    return `${reverseString(startReverse)}****${reverseString(endReverse)}`;
};

/**
 * 返回11位长度的手机号
 * 内部调用了isPhone
 *
 * @private
 * @param {string} phone
 * @returns {string}
 */
export const getPhone = (phone: string): string | void => {
    if (!isPhone(phone)) {
        return;
    }
    if (phone.length === 11) {
        return phone;
    }
    return phone.split('').reverse().splice(0, 11).reverse().join('');
};

/**
 * randomBy
 *
 * @param {number} charsCount 要生成字符串的长度
 * @param {string} alphabet 随机来源数据，如：从123123123中随机抽取组成一个字符串
 * @returns {string}
 */
export const randomBy = (charsCount: number, alphabet: string): string => {
    const digits = [];

    for (let i = 0; i < charsCount; i++) {
        digits[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return digits.join('');
};

/** 随机生成11位由数字和小写字母组成的字符串 */
export const random = () => Math.random().toString(36).substring(2);
