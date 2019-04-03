const assert = require('assert');
const textSanitizer = require('../text-sanitizer.js');

describe('Text Sanitizer', function() {

    describe('stripMarkdownTags', function() {
        it('stripts all tags', function() {
            const strippedString = textSanitizer.stripMarkdownTags('<p>My <strong>important</strong> & fun <a href="#">show</a><p>');
            assert.equal(strippedString, 'My important & fun show');
        });

        it('strips markdown markup', function() {
            const strippedString = textSanitizer.stripMarkdownTags('My **important** & fun [show](#)');
            assert.equal(strippedString, 'My important & fun show');
        });

        it('handles nil description', function() {
            const strippedString = textSanitizer.stripMarkdownTags(undefined);
            assert.equal(strippedString, '');
        });

        it('handles empty description', function() {
            const strippedString = textSanitizer.stripMarkdownTags('');
            assert.equal(strippedString, '');
        });

        it('handles null description', function() {
            const strippedString = textSanitizer.stripMarkdownTags(null);
            assert.equal(strippedString, '');
        });

        it('replaces br tags with linebreaks', function(){
            const strippedString = textSanitizer.stripMarkdownTags('<p>My <strong>important</strong><br>fun<br />funny <a href="#">show</a><p>');
            assert.equal(strippedString, 'My important\nfun\nfunny show');
        });
    });

    describe('sanitizeText', function() {
        it('adds a h3 tag for plain strings', function() {
            const sanitizedDescription = textSanitizer.sanitizeText('My important & fun show');
            assert.equal(sanitizedDescription, '<h3>My important & fun show</h3>');
        });

        it('leaves html intact', function() {
            const sanitizedDescription = textSanitizer.sanitizeText('<h3>My important & fun show</h3>');
            assert.equal(sanitizedDescription, '<h3>My important & fun show</h3>');
        });

        it('it converts multi line description into h3 and p tags', function() {
            const sanitizedDescription = textSanitizer.sanitizeText("First para\r\n\r\nSecond para\r\n& more");
            assert.equal(sanitizedDescription, '<h3>First para</h3>\n<p>Second para\n& more</p>');
        });

        it('it strips markdown tags not whitelisted', function() {
            const sanitizedDescription = textSanitizer.sanitizeText("First para\r\n\r\n##Second para\r\n> & more");
            assert.equal(sanitizedDescription, '<h3>First para</h3>\n<p>Second para</p>\n\n  <p>& more</p>\n');
        });

        it('it strips html tags not whitelisted and adds self-closing markup', function() {
            // Self closing markup is not really what we want, but it seems it's not possible to disable.
            const sanitizedDescription = textSanitizer.sanitizeText("First para\r\n\r\n<h2>Second<br>para</h2>\r\n> & more");
            assert.equal(sanitizedDescription, '<h3>First para</h3>\n<p>Second<br />para</p>\n\n  <p>& more</p>\n');
        });

        it('it converts links and other inline markup', function() {
            const sanitizedDescription = textSanitizer.sanitizeText('My [link](http://example.com) is _important_');
            assert.equal(sanitizedDescription, '<h3>My <a href="http://example.com" target="_blank">link</a> is <em>important</em></h3>');
        });
    });

    describe('createExcerpt', function() {
        it('returns full biography when word limit is greater than word length of text', function() {
            const sanitizedDescription = textSanitizer.createExcerpt('one two three four', 5);
            assert.equal(sanitizedDescription, 'one two three four');
        });

        it('returns excerpt with ellipsis when world limit is less than word length of text', function() {
            const sanitizedDescription = textSanitizer.createExcerpt('one two three four five six', 5);
            assert.equal(sanitizedDescription, 'one two three four five...');
        });
    });
});
