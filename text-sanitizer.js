const sanitizeHtml = require('sanitize-html');
const he = require('he');
const showdown = require('showdown');

const converter = new showdown.Converter();
converter.setOption('openLinksInNewWindow', true);

/**
 * Strips all HTML tags from a string
 * ensures the string is decoded (example '&amp;' is transformed to '&')
 *
 * @param {string} text
 * @returns String
 */
module.exports.stripMarkdownTags = function(text) {
    if (!text) return '';

    text = converter.makeHtml(text);

    // to replace <br /> tag with line break \n char. Not sure how to do this with sanitize-html package
    text = text.replace(/<br ?\/?>/g, '\n');

    return he.decode(sanitizeHtml(text, {
        allowedTags: [],
    }));
};

/**
 * Parses a string to be used as text parameter in the show or episode detail view.
 * If no HTML tags, it wraps the string with a h3 tag.
 * Else it transform the first p tag into a H3 tag for SEO reasons.
 *
 * @param {string} text
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

/**
 * Creates an excerpt from text based upon word length.
 * Adds an ellipsis to end of excerpt if word limit is less than word length of text.
 *
 * @param {string} text  - Text to create excerpt from.
 * @param {string} wordLimit - Number of words to cut the text at. Default is 104 (13 words * 8 lines).
 * @return String
 */
module.exports.createExcerpt = function(text, wordLimit = 104) {
    if (!text || text.length === 0) return "";

    const textArray = text.split(" ");

    let succeedingModifier = "";
    if (textArray.length > wordLimit) succeedingModifier = "...";

    return textArray.slice(0,wordLimit).join(" ") + succeedingModifier;
};
