import * as string from '../src/string';

describe('string', () => {
    test('stringEscape', () => {

    });

    test('firstCapitalize', () => {

    });

    test('isURL', () => {

    });

    test('isEmail', () => {

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

    });

    test('random', () => {

    });
});
