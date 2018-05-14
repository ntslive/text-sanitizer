[ ![Codeship Status for ntslive/text-sanitizer](https://app.codeship.com/projects/eb4a67e0-be67-0135-79fa-7a3b297a5cf0/status?branch=master)](https://app.codeship.com/projects/259879)

# NTS Text Sanitizer

Text Sanitizer used by NTS in their Node applications.
Sanitizes text blocks, including removal of HTML tags (excluding whitelisted tags) and transformation of Markdown into HTML.

## Installation

Include as dependency in `package.json`:

`"text-sanitizer": "github:ntslive/text-sanitizer#0.0.3"`

Note that this requires the Git tag `0.0.3` to be present.

Then run `npm install` as usual.

## Usage

```Javascript
const textSanitizer = require('text-sanitizer');
let plainTextName = textSanitizer.stripMarkdownTags(obj.name);
let descriptionHtml = textSanitizer.sanitizeText(obj.description);
let excerpt = textSanitizer.createExcerpt(obj.description);
```

## Testing

Run `npm test`

To run eslint with `fix` flag, run `bin/eslint`
