const assert = require('assert');
const stringHelper = require('../text-sanitizer.js');

describe('Text Sanitizer', function() {

    describe('stripMarkdownTags', function() {
        it('stripts all tags', function() {
            let strippedString = stringHelper.stripMarkdownTags('<p>My <strong>important</strong> & fun <a href="#">show</a><p>');
            assert.equal(strippedString, 'My important & fun show');
        });

        it('strips markdown markup', function() {
            let strippedString = stringHelper.stripMarkdownTags('My **important** & fun [show](#)');
            assert.equal(strippedString, 'My important & fun show');
        });

        it('handles nil description', function() {
            let strippedString = stringHelper.stripMarkdownTags(undefined);
            assert.equal(strippedString, '');
        });

        it('handles empty description', function() {
            let strippedString = stringHelper.stripMarkdownTags('');
            assert.equal(strippedString, '');
        });

        it('handles null description', function() {
            let strippedString = stringHelper.stripMarkdownTags(null);
            assert.equal(strippedString, '');
        });

        it('replaces br tags with linebreaks', function(){
            let strippedString = stringHelper.stripMarkdownTags('<p>My <strong>important</strong><br>fun<br />funny <a href="#">show</a><p>');
            assert.equal(strippedString, 'My important\nfun\nfunny show');
        });
    });

    describe('sanitizeText', function() {
        it('adds a h3 tag for plain strings', function() {
            let sanitizedDescription = stringHelper.sanitizeText('My important & fun show');
            assert.equal(sanitizedDescription, '<h3>My important & fun show</h3>');
        });

        it('leaves html intact', function() {
            let sanitizedDescription = stringHelper.sanitizeText('<h3>My important & fun show</h3>');
            assert.equal(sanitizedDescription, '<h3>My important & fun show</h3>');
        });

        it('it converts multi line description into h3 and p tags', function() {
            let sanitizedDescription = stringHelper.sanitizeText("First para\r\n\r\nSecond para\r\n& more");
            assert.equal(sanitizedDescription, '<h3>First para</h3>\n<p>Second para\n& more</p>');
        });

        it('it strips markdown tags not whitelisted', function() {
            let sanitizedDescription = stringHelper.sanitizeText("First para\r\n\r\n##Second para\r\n> & more");
            assert.equal(sanitizedDescription, '<h3>First para</h3>\n<p>Second para</p>\n\n  <p>& more</p>\n');
        });

        it('it strips html tags not whitelisted and adds self-closing markup', function() {
            // Self closing markup is not really what we want, but it seems it's not possible to disable.
            let sanitizedDescription = stringHelper.sanitizeText("First para\r\n\r\n<h2>Second<br>para</h2>\r\n> & more");
            assert.equal(sanitizedDescription, '<h3>First para</h3>\n<p>Second<br />para</p>\n\n  <p>& more</p>\n');
        });

        it('it converts links and other inline markup', function() {
            let sanitizedDescription = stringHelper.sanitizeText('My [link](http://example.com) is _important_');
            assert.equal(sanitizedDescription, '<h3>My <a href="http://example.com" target="_blank">link</a> is <em>important</em></h3>');
        });
    });
});
