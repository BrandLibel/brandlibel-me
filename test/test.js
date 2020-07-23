var assert = require('assert');
var bHelp = require('../src/server/blog-helper.js');

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