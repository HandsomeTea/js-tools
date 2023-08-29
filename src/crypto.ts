import crypto, { BinaryToTextEncoding } from 'crypto';
import * as string from './string';

/**
 * sha256
 *
 * @param {string} string 需要做sha256的字符串
 * @param {BinaryToTextEncoding} [encode='hex'] 最终需要的编码，默认hex
 * @returns {string}
 */
export const sha256 = (string: string, encode: BinaryToTextEncoding = 'hex'): string => crypto.createHash('sha256').update(string).digest(encode);

export const sha1 = (string: string, encode: BinaryToTextEncoding = 'hex'): string => crypto.createHash('sha1').update(string).digest(encode);


/**
 * hmacSha256
 *
 * @param {string} string 需要做hmacSha256的字符串
 * @param {string} secret hmacSha256加密的secret
 * @param {BinaryToTextEncoding} [encode='hex'] 最终需要的编码，默认hex
 * @returns {string}
 */
export const hmacSha256 = (string: string, secret: string, encode: BinaryToTextEncoding = 'hex'): string => crypto.createHmac('sha256', secret).update(string).digest(encode);

/**
 * hmacSha1
 *
 * @param {string} string 需要做hmacSha1的字符串
 * @param {string} secret hmacSha1加密的secret
 * @param {BinaryToTextEncoding} [encode='hex'] 最终需要的编码，默认hex
 * @returns {string}
 */
export const hmacSha1 = (string: string, secret: string, encode: BinaryToTextEncoding = 'hex'): string => crypto.createHmac('sha1', secret).update(string).digest(encode);

export const base64 = (string: string): string => Buffer.from(string).toString('base64');

export const passwordEncrypted = (password: string, algorithm: PasswordAlgorithm = 'sha-256') => {
    const algorithmMap: Record<PasswordAlgorithm, (...args) => string> = {
        'sha-256': sha256,
        'sha-1': sha1
    };
    const _algorithm = algorithmMap[algorithm] ? algorithm : 'sha-256';
    const hashPwd = algorithmMap[_algorithm](password, 'hex');
    const randomStr = string.randomString(10, '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz');

    return {
        encrypted: sha256(`${hashPwd}${randomStr}`) + randomStr,
        algorithm: _algorithm
    };
}

export const passwordVerify = (password: string, encryptedPwd: string, algorithm: PasswordAlgorithm = 'sha-256') => {
    const algorithmMap: Record<PasswordAlgorithm, (...args) => string> = {
        'sha-256': sha256,
        'sha-1': sha1
    };
    const _algorithm = algorithmMap[algorithm] ? algorithm : 'sha-256';
    const formattedPassword = algorithmMap[_algorithm](password);
    const randomStr = encryptedPwd.split('').reverse().splice(0, 10).reverse().join('');

    return sha256(`${formattedPassword}${randomStr}`) + randomStr === encryptedPwd;
}
