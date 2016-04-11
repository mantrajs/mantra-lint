# mantra-lint

[![Build Status](https://travis-ci.org/sungwoncho/mantra-lint.svg?branch=master)](https://travis-ci.org/sungwoncho/mantra-lint)

Check your code against the official Mantra spec.


## Installation

    npm install mantra-lint


## Usage

Currently you can lint your code programmatically as follows:

```js
import {lint} from 'mantra-lint';
import fs from 'fs';
let code = fs.readFileSync('/client/modules/core/containers/my_container.js');

lint(code, 'container');
// => [{ message: `The mapper function 'depsMapper' should be exported` }]
```


## API

#### lint(code, type)

Lints the code against all the rules defined for the provided type.
Returns an array that contains violations.

If no violations are found, it returns an empty array.

**params**

`code`

* Type: `String`
* the code you want to lint

`type`

* Type: `String`
* the type of the code you are linting. The supported values are: `container`,
`appContext`.


## List of Rules

Please see [RULES.md](https://github.com/sungwoncho/mantra-lint/blob/master/RULES.md).


## Contributor guide

* Clone this repository and run `npm install`.
* Write your code under `/lib`.
* `npm run-script` compile compiles your ES2015 code in `/lib` into `/dist`.
* `npm test` compiles the code and runs the tests.


## License

MIT
