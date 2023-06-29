import crypto, { BinaryToTextEncoding } from 'crypto';

/**
 * sha256
 *
 * @param {string} string 需要做sha256的字符串
 * @param {BinaryToTextEncoding} [encode='hex'] 最终需要的编码，默认hex
 * @returns {string}
 */
export const sha256 = (string: string, encode: BinaryToTextEncoding = 'hex'): string => crypto.createHash('sha256').update(string).digest(encode);


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
