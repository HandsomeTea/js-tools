import * as crypto from '../src/crypto';

describe('crypto', () => {
    test('sha256', () => {
        expect(crypto.sha256('test123')).toBe('ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae');
    });

    test('sha1', () => {

    });

    test('hmacSha256', () => {

    });

    test('hmacSha1', () => {

    });

    test('base64', () => {

    });

    test('passwordEncrypted', () => {

    });

    test('passwordVerify', () => {

    });

    test('md5', () => {

    });
});
