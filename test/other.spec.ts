import * as other from '../src/other';

describe('other', () => {
    test('delay', async () => {
        const timestamp = new Date().getTime();

        await other.delay(2000);
        expect(new Date().getTime() - timestamp).toBeGreaterThanOrEqual(2000);
    });

    test('typeIs', () => {
        expect(other.typeIs('sad')).toBe('string');
        expect(other.typeIs(812)).toBe('number');
        expect(other.typeIs(BigInt('0b11111111111111111111111111111111111111111111111111111'))).toBe('bigint');
        expect(other.typeIs(NaN)).toBe('nan');
        expect(other.typeIs(false)).toBe('boolean');
        expect(other.typeIs(Symbol())).toBe('symbol');
        expect(other.typeIs(undefined)).toBe('undefined');
        expect(other.typeIs({ test: 1 })).toBe('object');
        expect(other.typeIs(new Date())).toBe('date');
        expect(other.typeIs(() => ({}))).toBe('function');
        expect(other.typeIs([{ test: 1 }])).toBe('array');
        expect(other.typeIs(null)).toBe('null');
    });
});
