[ ![Codeship Status for ntslive/text-sanitizer](https://app.codeship.com/projects/eb4a67e0-be67-0135-79fa-7a3b297a5cf0/status?branch=master)](https://app.codeship.com/projects/259879)

# NTS Text Sanitizer

Text Sanitizer used by NTS in their Node applications.
Sanitizes text blocks.

## Installation

Include as dependency in `package.json`:

`"text-sanitizer": "ntslive/text-sanitizer#0.0.1",`

Note that this requires the Git tag `0.0.1` to be present.

Then run `npm install` as usual.

## Usage

```Javascript
const logger = require('text-sanitizer');
logger.error(errorMessage, errorInstance, { dataContext: dataObject });
```

## Testing

Run `npm test`

To run eslint with `fix` flag, run `bin/eslint`
