/** 判断是否为手机号 */
export const isPhone = (phone: unknown): boolean => typeof phone === 'string' && /^((\+|00)86)?1[3-9]\d{9}$/.test(phone);
// /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/ // 最严格的判断方式
// /^((\+|00)86)?1[3-9]\d{9}$/
// /^((\+|00)86)?1\d{10}$/ // 最宽松的判断方式

/**
 * 返回隐藏中间四位的手机号
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
