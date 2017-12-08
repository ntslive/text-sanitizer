const sanitizeHtml = require('sanitize-html');
const he = require('he');
const showdown = require('showdown');

const converter = new showdown.Converter();
/**
 * I had to disable the 'openLinksInNewWindow' as there is an issue if it
 * breaking the conversion of em tags see: https://github.com/showdownjs/showdown/issues/379
 * Once resolved we can uncomment the line below
 * (Note: we might need to update package.json to compile from github source)
 * converter.setOption('openLinksInNewWindow', true);
 */

/**
 * Strips all HTML tags from a string
 * ensures the string is decoded (example '&amp;' is transformed to '&')
 *
 * @param string - String
 * @returns String
 */
module.exports.stripMarkdownTags = function(string) {
    if (!string) return '';

    string = converter.makeHtml(string);

    // to replace <br /> tag with line break \n char. Not sure how to do this with sanitize-html package
    string = string.replace(/<br ?\/?>/g, '\n');

    return he.decode(sanitizeHtml(string, {
        allowedTags: [],
    }));
};

/**
 * Parses a string to be used as text parameter in the show or episode detail view.
 * If no HTML tags, it wrapps the string with a h3 tag.
 * Else it transform the first p tag into a H3 tag for SEO reasons.
 *
 * @param text - String
 * @returns String
 */
module.exports.sanitizeText = function(text) {
    text = converter.makeHtml(text);
    text = sanitizeHtml(text, {
        allowedTags: ['a', 'em', 'p', 'br'],
        transformTags: {
            'h1': 'p',
            'h2': 'p',
            'h3': 'p',
            'h4': 'p',
            'h5': 'p',
            'h6': 'p',
        },
    });
    /*
     * For SEO we want at least one H3 tag in the text block
     **/
    text = text.replace(/<p>/, '<h3>');
    text = text.replace(/<\/p>/, '</h3>');

    return he.decode(text);
};