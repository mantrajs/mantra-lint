## Rules

Here is a list of rules for different types of code. The name of the rule is the
name of the function under `lib/rules/[type]`.

Feel free to add to this list by opening a PR. Newly suggested rules should have
empty checkbox. When implemented, the checkbox should be ticked.


#### action

- [ ] `noGlobalVariables`: No Global variables inside actions.
- [ ] `noOutOfScopeVariables`: Actions should only use dependency injected by
Application Context and other arguments, and libraries.
- [ ] `defaultExport`: An object with actions should be exported by default.


#### actionIndex

- [ ] `defaultExport`: An object with all action modules should be exported by
default.


#### appContext

- [x] `defaultExportAppContext`: A function that returns the app context should be
exported by default.


#### appEntryPoint

- [ ] `createApp`: An app should be created using `mantra-core` API.
- [ ] `initApp`: An app should be initiated using `mantra-core` API.


#### component

- [ ] `importPureFunctionOnly`: Any imported functions should be pure.


#### container

- [x] `exportComposer`: A composer function should be exported.
- [x] `defaultExportContainer`: A container should be exported by default.
- [x] `exportMappers`: If a mapper function is used to compose a component, it
should be exported.
- [ ] `noOutOfScopeVariables`: Composer functions should only use variables
coming via props.


#### moduleDefinition

- [ ] `defaultExportObject`: A module definition should export an object by
default
- [ ] `objectKeys`: A module definition object can have `load` and `routes`
method, and a property `actions` whose value is an object


#### route

- [ ] `noRedirect`: redirection should be done in an action rather than
FlowRouter's `triggersEnter`.
