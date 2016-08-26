# Clever Front End Components

**Jump to** [Modal](#modal), [Button](#button), [ModalButton](#modalbutton), [ConfirmationButton](#confirmationbutton), [TextInput](#textinput), [Select](#select), [SegmentedControl](#segmentedcontrol)

## Install

Install the NPM package and save it to your project using

```
npm install --save clever-components
```

To use a component, you'll need to be working with React and Webpack. Components that include their own styles may require you to install Webpack's style loaders. If this is configured correctly, you can simply `require` these components like any other package:

```javascript
var Modal = require('clever-components').Modal; // ES5

import {Modal} from 'clever-components'; // ES6
```

This library uses ES6 features not supported in Internet Explorer such as [`String.startsWith`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith). To support use of this library in IE, include `babel-polyfill` in the entrypoint to your application. See the [docs](https://babeljs.io/docs/usage/polyfill/).

## Contributing

### How to add a component
* Run `./bin/new_component <your component>` to autogenerate source and test stubs
* Document your component in the readme with PropTypes and a usage example
* Add a working example of your component in /docs
* To run locally, `npm run-script dev-server` and open http://localhost:8080/
* Open a PR and assign it to someone in [@frontend](https://github.com/orgs/Clever/teams/front-end)

#### When to add a component

* Rule of 3: Copy and pasting it more than once? Is it being used in a few places? Yes, componentize it!
* It's in our desired components list
  * **Definitely Want**: ~~Buttons~~, ~~Modals~~, form elements, flash messages, alerts, tables
  * **Eventually**: Header, Navbar, Breadcrumbs, Pagination

## Testing
Run the entire test suite with `make test` or a single component with `make test/<component>_test.jsx`

## Component Reference

Check out our [live examples](http://clever.github.io/components)!

### Modal

This component wraps your content and displays it in a modal with a shadow box.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| title            | String   | Header text for the modal             | None
| closeModal       | Function | Called when user clicks outside modal | None
| width (optional) | Number   | Width of the modal                    | 400px


**Usage Example**

```jsx
{this.state.showModal &&
  <Modal title="My Modal" closeModal={myCloseHandler}>
    <div>My Modal Content</div>
  </Modal> }
```
In this example, the function `myCloseHandler` could hide the modal by updating the state of your component:

```javascript
var myCloseHandler = function() {
  this.setState({showModal: false});
}
```

### Button

This is a set of button components with various sizes and types.

**Options**

| Prop                | Type     | Description                                          | Default
|---------------------|----------|------------------------------------------------------|---------
| value               | String   | The text that appears on the button                  | None
| type                | String   | One of `primary`, `secondary`, `destructive`, `link` | `secondary`
| size                | String   | One of "large", "regular", "small"                   | `regular`
| onClick (optional)  | Function | Called when the user clicks on the button            | None
| href (optional)     | String   | If provided, causes the button to behave as a link   | None
| target (optional)   | String   | For links, either "_self" or "_blank"                | "_blank"
| disabled (optional) | Bool     | User interaction is disabled when true               | false
| submit (optional)   | Bool     | Behaves as a submit button when true                 | false
| style (optional)    | Object   | Add custom styles (e.g. margin) if you must          | None

**Usage Example**

```jsx
<Button value="Go Back" type="secondary" href="/previousPage" />
<Button value="Save Changes" type="primary" size="regular" onClick={saveChanges} />
```

### ModalButton

This component is a `Button` that triggers the appearance of a `Modal` when clicked.

**Options**

Inherits all options from `Button` and `Modal`, except for `closeModal`. `Modal`'s properties have
the string `"modal"` prepended to them (i.e. `modalWidth`, `modalTitle`).

| Prop                             | Type     | Description                                          | Default
|----------------------------------|----------|------------------------------------------------------|---------
| onClick (optional)               | Function | Called when the user clicks the button               | None
| onClose (optional)               | Function | Called when the user closes the modal                | None
| value                            | String   | The text that appears on the button                  | None
| type                             | String   | One of `primary`, `secondary`, `destructive`, `link` | `secondary`
| size                             | String   | One of "large", "regular", "small"                   | `regular`
| href (optional)                  | String   | If provided, causes the button to behave as a link   | None
| target (optional)                | String   | For links, either "_self" or "_blank"                | "_blank"
| disabled (optional)              | Bool     | User interaction is disabled when true               | false
| submit (optional)                | Bool     | Behaves as a submit button when true                 | false
| style (optional)                 | Object   | Add custom styles on the button if you must          | None
| modalTitle                       | String   | Header text for the modal                            | None
| modalWidth (optional)            | Number   | Width of the modal                                   | 400px

**Usage Example**

```jsx
<ModalButton
  type="primary" size="regular" value="More info" modalTitle="Helpful info"
  onClick={() => console.log("ModalButton: modal opened!")}
  onClose={() => console.log("ModalButton: modal closed!")}
>
  <p>Further information about what you just clicked</p>
</ModalButton>
```

### ConfirmationButton

This component is a `Button` that triggers the appearance of a `Modal` with "Confirm" and "Cancel"
buttons when clicked.

**Options**

Inherits all options from `ModalButton` and `Button`. `Button`'s properties have the string
`"confirmButton"` prepended to them (i.e. `confirmButtonType`, `confirmButtonHref`.

| Prop                             | Type     | Description                                                 | Default
|----------------------------------|----------|-------------------------------------------------------------|---------
| onClick (optional)               | Function | Called when the user clicks the button                      | None
| onClose (optional)               | Function | Called when the user closes the modal                       | None
| onConfirm (optional)             | Function | Called when the user clicks the Confirm button              | None
| modalTitle                       | String   | Header text for the modal                                   | None
| modalWidth (optional)            | Number   | Width of the modal                                          | 400px
| confirmButtonValue               | String   | The text that appears on the Confirm button                 | None
| confirmButtonType                | String   | One of `primary`, `secondary`, `destructive`, `link`        | `secondary`
| confirmButtonSize                | String   | One of "large", "regular", "small"                          | `regular`
| confirmButtonHref (optional)     | String   | If provided, causes the Confirm button to behave as a link  | None
| confirmButtonTarget (optional)   | String   | For links, either "_self" or "_blank"                       | "_blank"
| confirmButtonDisabled (optional) | Bool     | User interaction is disabled when true                      | false
| confirmButtonSubmit (optional)   | Bool     | Behaves as a submit button when true                        | false
| confirmButtonStyle (optional)    | Object   | Add custom styles (e.g. margin) if you must                 | None

**Usage Example**

```jsx
<ConfirmationButton
  type="destructive" size="regular" value="Submit for confirmation" modalTitle="Please confirm"
  confirmButtonType="destructive"
  onClick={() => console.log("ConfirmationButton: modal opened!")}
  onClose={() => console.log("ConfirmationButton: modal closed!")}
  onConfirm={() => console.log("ConfirmationButton: confirmed!")}
>
  <p>This action requires confirmation. Please confirm!</p>
</ConfirmationButton>
```


### TextInput

This component is a `text input`.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| name (required) | String | Name for input element | None
| label (optional) | String | Label for modal | None
| value (optional) | Node | Value of input | None
| placeholder (optional) | Node | Placeholder node for input | None
| type (optional) | String   | The type of control to display, tested 'number' and 'text' | 'text'
| error (optional) | String | Adds indicator and error text to element. | None
| onChange (optional) | Function | Called when value of input changes. | None
| required (optional) | Bool   | Marks input as required and adds indicator. | false
| disabled (optional) | Bool   | Sets element as disabled. | false
| readOnly (optional) | Bool   | Sets element as read only. | false
| enableShow (optional) | Bool  | Displays a show/hide link that reveals passwords | false

**Usage Example**

```jsx
  <TextInput
    label="Form Input"
    name="TextInputName"
    placeholder="placeholder"
    onChange={this.onChangeText}
    value={this.state.inputValue}
    isRequired=true
    error={this.state.error}
  />
```

In this example, the function `onChangeText` is called on component value change and updates the state of your component:

```javascript
var onChangeText = function(event) {
  // do some validation
  var errorMessage = "";
  if (notValid) errorMessage = "Please enter a valid value";
  this.setState({
    inputValid: event.target.value,
    error: errorMessage,
  });
}
```

### CopyableInput

This is a special [TextInput](#textinput) that allows the user to show/hide the value of the input and copy to clipboard. Ideal for passwords.

**Options (in addition to TextInput props)**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| enableCopy (optional) | Bool | Display a Copy link | True

### Select

Component to allow selecting options from a list. Right now this only supports a basic dropdown with
a fixed list of options.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| id (required) | String | ID for the select element to be used by the label. Must be unique | None
| name (required) | String | Name for select element | None
| label (optional) | String | Label for select element | None
| onChange (optional) | Function | Called with new value when it changes | None
| options (optional) | Array | Possible options. Must contain objects with label and value attributes | None
| placeholder (optional) | String | Placeholder text | ""
| value (optional) | Object | Selected value. Must be updated by caller in the onChange | None

**Usage Example**

```jsx
<Select
  id="BasicSelect"
  label="Basic Select"
  name="BasicSelect"
  onChange={onBasicSelectChange}
  options={[
    {label: "Option 1", value: "opt1"},
    {label: "Option 2", value: "opt2"},
    {label: "Option 3", value: "opt3"},
  ]}
  placeholder="placeholder for select"
  value={this.state.basicSelectValue}
/>
```

```js
function onBasicSelectChange(value) {
  this.setState({basicSelectValue: value});
}
```

### SegmentedControl

This component is a `segmented control`.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| selectableItems (required) | Object   | Map from keys => Display strings for each item in control. | None
| selected (optional)    | String   | Key of the selectableItem to initalize as selected, defaults to null | None
| onSelect (optional)        | Function | Called with key of selected item on select | None

**Usage Example**

```jsx
  <SegmentedControl
    selectableItems={{one: "Option 1", two: "Option 2"}}
    selected="two"
    onSelect={this.onSelect}
  />
```

In this example, the function `onSelect` is called on component value change and updates the state of your component:

```javascript
var onSelect = function(selected) {
  // do some validation
  var errorMessage = "";
  if (notValid) errorMessage = "Please enter a valid value";
  this.setState({
    selected: selected,
    error: errorMessage,
  });
}
```

### Table

Table component supporting sorting and filtering.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| className (optional) | String | Additional classname to apply to the table. | None
| data (required) | Array | The array of data items, each corresponding to a single potential table row | None
| filter (optional) | Function | Called with data for a single row. Should return `false` if the row should be filtered out, or `true` otherwise. | None
| fixed (optional) | Boolean | Whether or not table column widths should be fixed (vs fluid). | False
| initialSortState (optional) | `{columnID: String, direction: Table.sortDirection}` | The initial sort state of the table. | None
| onSortChange (optional) | Function | Callback function for the sort state change event. | None
| rowIDFn (required) | Function | Called with data for a single row. Should return the unique ID for that row. | None

#### Table.Column
The `Table` component requires child components of type `Table.Column`, which provide configuration for the table header and row cells.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| header (optional) | `{className: String (optional), content: Any (optional)}` | Configuration for the header cell of this column. | None
| cell (required) | `{className: String (optional), renderer: Function}` | Configuration for the table body cell for this column. `renderer` will be called with data for a single row and should return content that can be rendered by the React DOM renderer. | None
| id (optional) | String | Unique identifier for the column. Can be used in referencing columns for sorting. | None
| noWrap (optional) | Boolean | Prevents the column content from wrapping. In the non-fixed mode, the table column will automatically expand to fit all content in the column on a single line. | False
| sortable (optional) | Boolean | Enables sorting for the column. | False
| sortValueFn (optional) | Function | Called with data for a single row. Should return a sortable value for row. | None

**Usage Example**

[Source Code](https://github.com/Clever/components/tree/master/docs/TableExample.jsx) ([Live Demo](http://clever.github.io/components/#table))
