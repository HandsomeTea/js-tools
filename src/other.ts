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
                console.debug(`${classTarget} instance ia already exist! still use it.`);
            }
            return ins;
        }
    });

    classTarget.prototype.constructor = proxy;
    return proxy;
};
