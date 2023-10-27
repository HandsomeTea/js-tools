import * as crypto from '../src/crypto';

describe('crypto', () => {
    test('sha256', () => {
        expect(crypto.sha256('test123')).toBe('ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae');
    });

    test('sha1', () => {
        expect(crypto.sha1('test123')).toBe('7288edd0fc3ffcbe93a0cf06e3568e28521687bc');
    });

    test('hmacSha256', () => {
        expect(crypto.hmacSha256('test123', 'secret')).toBe('512c2c40c9a430e207dd720ce07ddd870a2094670f0f0049062d9712b1e38d2b');
    });

    test('hmacSha1', () => {
        expect(crypto.hmacSha1('test123', 'secret')).toBe('51133d4414f30159070308169d6941a9a69e3f80');
    });

    test('base64', () => {
        expect(crypto.base64('test123')).toBe('dGVzdDEyMw==');
    });

    test('passwordEncryptedAndVerify', () => {
        const password = '123456';
        const encrypted1 = crypto.passwordEncrypted(password);
        const encrypted2 = crypto.passwordEncrypted(password, 'sha-1');

        expect(crypto.passwordVerify(password, encrypted1.encrypted)).toEqual(true);
        expect(crypto.passwordVerify(password, encrypted2.encrypted, 'sha-1')).toEqual(true);
    });

    test('md5', () => {
        expect(crypto.md5('test123')).toBe('cc03e747a6afbbcbf8be7668acfebee5');
    });
});
