/**
 * 延迟多少毫秒
 *
 * @param {number} [time=1000] 单位为毫秒
 * @returns {Promise<void>}
 */
export const delay = async (time = 1000): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};


type AllType = 'string' | 'number' | 'bigint' | 'nan' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'date' | 'function' | 'array' | 'null'

export function typeIs<T>(input: T, target: AllType): boolean
export function typeIs<T>(input: T): AllType

export function typeIs<T>(input: T, target?: AllType) {
    if (Array.isArray(input)) {
        return !target ? 'array' : target === 'array';
    } else if (input === null) {
        return !target ? 'null' : target === 'null';
    } else if (typeof input === 'number' && isNaN(input)) {
        return !target ? 'nan' : target === 'nan';
    } else if (input instanceof Date) {
        return !target ? 'date' : target === 'date';
    }

    return !target ? typeof input : target === typeof input;
}

// class Test {
//     private static _ins: Test;
//     private constructor() {

//     }
//     public static getInstance() {
//         if (!this._ins) {
//             this._ins = new Test();
//         }
//         return this._ins;
//     }
// }

/**
 * 把一个class转换为单例模式
 *
 * @template Class
 * @param {Class} classTarget 要转换的class对象
 * @returns 返回传入的class
 */
export const singledInstance = <Class extends { new(...args: unknown[]): unknown }>(classTarget: Class) => {
    let ins: (new (...args: unknown[]) => unknown) | null = null;

    const proxy = new Proxy(classTarget, {
        construct(_target, args) {
            if (!ins) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ins = new classTarget(...args);
            } else {
                // eslint-disable-next-line no-console
                // console.debug(`${classTarget} instance ia already exist! still use it.`);
            }
            return ins;
        }
    });

    classTarget.prototype.constructor = proxy;
    return proxy;
};

/**
 * 深度克隆
 *
 * @template T
 * @param {T} input
 * @returns {T}
 */
export const deepClone = <T>(input: T): T => {
    const cache = new WeakMap();
    const fn = (value: T): T => {
        if (typeof value !== 'object' || value === null || typeof value === 'function') {
            return value as T;
        }

        if (cache.has(value)) {
            return cache.get(value);
        }
        const result = Array.isArray(value) ? [] : {};

        Object.setPrototypeOf(result, Object.getPrototypeOf(value));
        cache.set(value, result);

        for (const key in value) {
            // eslint-disable-next-line no-prototype-builtins
            if (value.hasOwnProperty(key)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                result[key] = deepClone(value[key]);
            }
        }

        return result as T;
    };

    return fn(input) as T;
};

/**
 * 将一个函数放入微队列执行
 *
 * @param {() => void} fn
 * @returns
 */
export const runInMicroTasks = (fn: () => void) => {
    if (typeof fn !== 'function') {
        return;
    }
    if (typeof Promise !== 'undefined') {
        Promise.resolve().then(fn);
        return;
    }
    if (typeof MutationObserver !== 'undefined') {
        // eslint-disable-next-line no-undef
        const observer = new MutationObserver(fn);
        // eslint-disable-next-line no-undef
        const textNode = document.createTextNode('');

        observer.observe(textNode, {
            characterData: true
        });
        textNode.data = '1';
        return;
    }
    if (process && typeof process.nextTick === 'function') {
        process.nextTick(fn);
        return;
    }
    setTimeout(fn, 0);
};
