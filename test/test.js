const assert = require('assert');
const bHelp = require('../src/server/blog-helper.js');
const Util = require('../src/client/global/Util.js');

describe('blog-helper.js', () => {
    describe('#slugify', () => {
        it('should convert letters to lowercase, and spaces into hyphens', () => {
            assert.equal(bHelp.slugify('OneWordTITLE'), 'onewordtitle');
            assert.equal(bHelp.slugify('Multi WORD Title'), 'multi-word-title');
        });

        it('should ignore symbols', () => {
            assert.equal(bHelp.slugify(' #$@# Symbols Before'), 'symbols-before');
            assert.equal(bHelp.slugify('Symbols After #$@# '), 'symbols-after');
            assert.equal(bHelp.slugify('Symbols $##@ Within'), 'symbols-within');
            assert.equal(bHelp.slugify('Some Special Characters ćčđďèé'), 'some-special-characters-ccddee');
        });

        it('can handle blanks', () => {
            assert.equal(bHelp.slugify(''), '');
            assert.equal(bHelp.slugify('    '), '');
            assert.equal(bHelp.slugify('$##@'), '');
        });
    });
});
describe('Util.js', () => {
    describe('#writeGibberish', () => {
        let testCases = [
            { numChars: 'k', throws: true },
            { numChars: 'faidsjfoè', throws: true },
            { numChars: 0.432432, throws: true },
            { numChars: -1, throws: true },
            { numChars: 0 },
            { numChars: 100 },
            { numChars: 300 },
            { numChars: 530000 },
        ];
        testCases.forEach(test => {
            if (test.throws) {
                it(`should throw error when passed a ${test.numChars}`, () => {
                    assert.throws(
                        () => {
                            Util.writeGibberish(test.numChars)
                        },
                        {
                            name: 'RangeError',
                            message: 'writeGibberish requires an integer greater than 0',
                        }
                    );
                });
            }
            else {
                it(`should write gibberish with ${test.numChars} characters`, () => {
                    assert.equal(test.numChars, Util.writeGibberish(test.numChars).length);
                });
            }
        });
    });
    describe('#excerptify', () => {
        it('should trim text to the specified charLength', () => {
            let charLength = 300;
            let truncatedLength = charLength + 3; // add 3 chars for ellipsis
            assert(Util.excerptify('Something', charLength).length <= truncatedLength);
        });
    });
    describe('#getEmailAddress', () => {
        it('should display my contact email', () => {
            const SYMBOL = '@';
            const L = 'libel';
            const end = '.me';
            assert.equal(Util.getEmailAddress(), 'con' + 'tact' + SYMBOL + 'brand' + L + end)
        });
    });
});