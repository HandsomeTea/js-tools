import { } from 'jest';

import * as phone from '../src/phone';

describe('phone', () => {
    test('isPhone', () => {
        expect(phone.isPhone(123)).toBe(false);
        expect(phone.isPhone([])).toBe(false);
        expect(phone.isPhone({})).toBe(false);
        expect(phone.isPhone('132')).toBe(false);
        expect(phone.isPhone('')).toBe(false);
        expect(phone.isPhone('13501194251')).toBe(true);
        expect(phone.isPhone('+8613501194251')).toBe(true);
        expect(phone.isPhone('+813501194251')).toBe(false);
    });

    test('displayPhone', () => {
        expect(phone.displayPhone('132')).toBe(undefined);
        expect(phone.displayPhone('')).toBe(undefined);
        expect(phone.displayPhone('13501194251')).toBe('135****4251');
        expect(phone.displayPhone('+8613501194251')).toBe('+86135****4251');
        expect(phone.displayPhone('+813501194251')).toBe(undefined);
    });
});
