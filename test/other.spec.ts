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

    test('singledInstance', () => {
        class Test {
            constructor() {

            }
        }
        const T1 = other.singledInstance(Test);
        const t1 = new T1();
        const t2 = new T1();

        expect(t1).toBe(t2);
    });

    // test('deepClone', () => {
    //     expect(other.deepClone(() => { }) instanceof Function).toBe(true);
    //     class Test {
    //         public a: number;
    //         constructor() {
    //             this.a = 1;
    //         }
    //     }
    //     const test = new Test();

    //     expect(other.deepClone(test) instanceof Test).toBe(true);
    //     const obj = { a: 1, b: '213', c: new Date(), d: Symbol() };

    //     expect(other.deepClone(obj).c.getTime()).toEqual(obj.c.getTime());
    // });
});
