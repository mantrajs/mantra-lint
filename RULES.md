## Rules

Here is a list of rules for different types of code. The name of the rule is the
name of the function under `lib/rules/[type]`.

Feel free to add to this list by opening a PR. Newly suggested rules should have
empty checkbox. When implemented, the checkbox should be ticked.


#### appContext

- [x] `defaultExportAppContext`: A function that returns the app context should be
exported as default.

#### containers

- [x] `exportComposer`: A composer function should be exported.
- [x] `defaultExportContainer`: A container should be exported as default.
- [x] `exportMappers`: If a mapper function is used to compose a component, it
should be exported.
- [ ] `composerDependencyInjected`: Composer functions should only use variables
coming via props.
