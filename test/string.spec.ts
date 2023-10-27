import * as string from '../src/string';

describe('string', () => {
    test('escape', () => {
        expect(string.escape('.123"')).toEqual('\\.123"');
    });

    test('firstCapitalize', () => {
        expect(string.firstCapitalize('coco')).toBe('Coco');
    });

    test('isURL', () => {
        expect(string.isURL('www.baidu.com')).toEqual(false);
        expect(string.isURL('http://www.baidu.com')).toEqual(true);
        expect(string.isURL('https://www.baidu.com')).toEqual(true);
        expect(string.isURL('data:image/png;base64,iVBORw0KGgoAAAA...')).toEqual(true);
    });

    test('isEmail', () => {
        expect(string.isEmail('www.baidu.com')).toEqual(false);
        expect(string.isEmail('coco@baidu.com')).toEqual(true);
        expect(string.isEmail('coco@baidu.com.cn')).toEqual(true);
    });

    test('isPhone', () => {
        expect(string.isPhone(123)).toBe(false);
        expect(string.isPhone([])).toBe(false);
        expect(string.isPhone({})).toBe(false);
        expect(string.isPhone('132')).toBe(false);
        expect(string.isPhone('')).toBe(false);
        expect(string.isPhone('13501194251')).toBe(true);
        expect(string.isPhone('+8613501194251')).toBe(true);
        expect(string.isPhone('+813501194251')).toBe(false);
    });

    test('displayPhone', () => {
        expect(string.displayPhone('132')).toBe(undefined);
        expect(string.displayPhone('')).toBe(undefined);
        expect(string.displayPhone('13501194251')).toBe('135****4251');
        expect(string.displayPhone('+8613501194251')).toBe('+86135****4251');
        expect(string.displayPhone('+813501194251')).toBe(undefined);
    });

    test('getPhone', () => {
        expect(string.getPhone('132')).toBe(undefined);
        expect(string.getPhone('')).toBe(undefined);
        expect(string.getPhone('13501194251')).toBe('13501194251');
        expect(string.getPhone('+8613501194251')).toBe('13501194251');
        expect(string.getPhone('+813501194251')).toBe(undefined);
    });

    test('randomBy', () => {
        const len = 22;
        const str = '12345467890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST';
        const result = string.randomBy(len, str);

        expect(result.length).toEqual(len);
        for (let i = 0; i < len; i++) {
            expect(str.includes(result.charAt(i))).toEqual(true);
        }
    });

    test('random', () => {
        const result = string.random();

        expect(result.length).toEqual(11);
        expect(/[a-z0-9]/g.test(result)).toEqual(true);
    });
});
