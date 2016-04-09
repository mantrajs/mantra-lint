# mantra-lint

Check your code against the official Mantra spec.


## Installation

    npm install mantra-lint


## Documentation

mantra-lint is a library of functions that you can run against your code. All
functions return an object like the following:

```js
{
  status: // either 'passing' or 'failing',
  violations: // an array of objects representing violations
}
```

A violation is represented by an object like the following:

```js
{
  path: // path to the file where to violation occurred
  messages: // array of violation messages
}
```

### Rules

Here is the list of the lint functions:

#### lintDirStructure(appPath)

Validates the structure of the `/client` directory. Checks all the subdirectories
of the modules.

*params*

**appPath**

* Type: `String`
* an absolute path to your application root

*Relevant section: [Directory Layout](https://kadirahq.github.io/mantra/#sec-Directory-Layout)*

#### lintNamingConvention(appPath)

Validates the naming convention of the files under `/client`.

*params*

**appPath**

* Type: `String`
* an absolute path to your application root

*Relevant section: [File Naming Conventions]
(https://kadirahq.github.io/mantra/#sec-Appendix-File-Naming-Conventions)*

## License

MIT
