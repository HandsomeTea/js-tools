import * as number from '../src/number';

describe('number', () => {
    test('fixedNumString', () => {
        expect(number.fixedNumString(123)).toBe('123');
        expect(number.fixedNumString('123')).toBe('123');
        expect(number.fixedNumString(1)).toBe('01');
        expect(number.fixedNumString('1')).toBe('01');
        expect(number.fixedNumString('')).toBe('00');
        expect(number.fixedNumString(0)).toBe('00');
        expect(number.fixedNumString(12)).toBe('12');
        expect(number.fixedNumString('12')).toBe('12');
        expect(number.fixedNumString('12', 3)).toBe('012');
        expect(number.fixedNumString(12, 3)).toBe('012');
    });

    test('numberThousandth', () => {
        expect(number.numberThousandth(1221312)).toBe('1,221,312');
        expect(number.numberThousandth(123)).toBe('123');
        expect(number.numberThousandth(13)).toBe('13');
        expect(number.numberThousandth(132132)).toBe('132,132');
    });

    test('randomNum', () => {
        for (let i = 0; i < 100; i++) {
            const res = number.randomNum(1, 20);

            expect(res).toBeLessThan(20);
            expect(res).toBeGreaterThanOrEqual(1);
        }
    });

    test('add', () => {
        expect(number.add(123, 123123213)).toBe('123123336');
        expect(number.add(11213239898943, 3434435787976530)).toBe('3445649027875473');
        expect(number.add(123.86789, 123123213)).toBe('123123336.86789');
        expect(number.add(123.86789, '12312.3213')).toBe('12436.18919');
        expect(number.add(123.86789, 0.3213)).toBe('124.18919');
    });

    test('multiply', () => {
        expect(number.multiply(7, 8)).toBe('56');
        expect(number.multiply(7.1, 8.5)).toBe('60.35');
        expect(number.multiply(7.98, 0.8)).toBe('6.384');
        expect(number.multiply(1231234456564, 978273488342)).toBe('1204484026789730959376888');
    });
});
