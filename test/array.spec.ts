import * as array from '../src/array';

describe('array', () => {
    test('oneOf', () => {
        for (let s = 0; s < 100; s++) {
            const arr = [1, 2, 3, null, undefined, 'test', true, false, NaN, ''];
            const res = array.oneOf(arr);

            expect(arr.includes(res)).toBe(true);
        }
    });

    test('arrayToObject', () => {
        const arr1 = [
            { test: 'test1', filed: '123' },
            { test: 'test2', filed: 'sss' },
            { test: 'test1', filed: '789' },
            { filed: '456' }
        ];
        const result1 = array.arrayToObject(arr1, { keyOf: 'test' });
        const result2 = array.arrayToObject(arr1, { keyOf: 'test', valOf: 'filed' });
        const result3 = array.arrayToObject(arr1, { keyOf: 'test', valOf: 'filed', unique: true });

        expect(result1.result).toEqual({ test1: { test: 'test1', filed: '123' }, test2: { test: 'test2', filed: 'sss' } });
        expect(result1.invalid).toEqual([{ filed: '456' }]);
        expect(result2.result).toEqual({ test1: '123', test2: 'sss' });
        expect(result2.repeat).toEqual([{ test: 'test1', filed: '789' }]);
        expect(result3.result).toEqual({ test1: '789', test2: 'sss' });
        expect(result3.repeat).toBe(undefined);
        expect(array.arrayToObject([], { keyOf: 'test' })).toEqual({ result: {} });
    });
});
