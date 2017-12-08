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
