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

*params*

**code**

* Type: `String`
* the code you want to lint

**type**

* Type: `String`
* the type of the code you are linting. The supported values are: `container`,
`appContext`.


## Rules

Here is the list of rules for each types.

#### appContext

* `defaultExportAppContext`

A function that returns the app context should be exported as default.

#### containers

* `exportComposer`

A composer function should be exported.

* `defaultExportContainer`

A container should be exported as default.

* `exportMappers`

If a mapper function is used to compose a component, it should be exported.


## License

MIT
