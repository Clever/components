# Clever Front End Components

**Jump to** [Modal](#modal), [Button](#button), [ModalButton](#modalbutton), [ConfirmationButton](#confirmationbutton), [TextInput](#textinput), [Select](#select), [SegmentedControl](#segmentedcontrol), [Table](#table)

## Install

Install the NPM package and save it to your project using

```
npm install --save clever-components
```

Note: This library uses ES6 features not supported in Internet Explorer such as [`String.startsWith`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith). To support use of this library in IE, include `babel-polyfill` in the entrypoint to your application. See the [docs](https://babeljs.io/docs/usage/polyfill/).

## Usage

In order to maintain visual consistency across our product, we use the components and styles from this library whenever possible.

### Components

To use a component, you'll need to be working with React and Webpack. Components that include their own styles may require you to install Webpack's style loaders. If this is configured correctly, you can simply `require` these components like any other package:

```javascript
var Modal = require('clever-components').Modal; // ES5

import {Modal} from 'clever-components'; // ES6
```

### Styles

The components library exports a `less` file containing variables and classes for all of the styles outlined in the [Clever design system](http://clever.github.io/design-system/). To import these styles, just include the following line at the top of your `less` file:

    @import (reference) "~clever-components/dist/less/index";

Note that by using `(reference)`, you'll only import styles that you actually use, so it shouldn't bloat the resulting stylesheet.

To learn which styles are available, read through the [less code](https://github.com/Clever/components/tree/master/src/less).

## Contributing

### How to add a component
* Run `./bin/new_component <your component>` to autogenerate source and test stubs
* Document your component in the readme with PropTypes and a usage example
* Add a working example of your component in /docs
* To run locally, run `make dev-server` and open http://localhost:8080/
* Open a PR and assign it to someone in [@frontend](https://github.com/orgs/Clever/teams/front-end)

#### When to add a component

* Rule of 3: Copy and pasting it more than once? Is it being used in a few places? Yes, componentize it!
* It's in our desired components list
  * **Definitely Want**: ~~Buttons~~, ~~Modals~~, form elements, flash messages, alerts, tables
  * **Eventually**: Header, Navbar, Breadcrumbs, Pagination

### Publishing

First, increment the version in `package.json` according to [semver](http://semver.org/).

Then, when you merge your branch into `master`, Drone will automatically build and publish a new version to npm.

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
| type                | String   | One of `primary`, `secondary`, `destructive`, `link`, `linkPlain` | `secondary`
| size                | String   | One of "large", "regular", "small"                   | `regular`
| onClick (optional)  | Function | Called when the user clicks on the button            | None
| href (optional)     | String   | If provided, causes the button to behave as a link   | None
| target (optional)   | String   | For links, either "_self" or "_blank"                | "_blank"
| disabled (optional) | Bool     | User interaction is disabled when true               | false
| submit (optional)   | Bool     | Behaves as a submit button when true                 | false
| style (optional)    | Object   | Add custom styles (e.g. margin) if you must          | None
| className (optional)| String   | Additional classname to apply to the button          | None

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
| type                             | String   | One of `primary`, `secondary`, `destructive`, `link`, `linkPlain` | `secondary`
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
| confirmButtonType                | String   | One of `primary`, `secondary`, `destructive`, `link`, `linkPlain`        | `secondary`
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
| disabled (optional) | Bool   | Sets element as disabled. | false
| disableAutocomplete (optional) | Bool   | Sets `autocomplete="off"` on the input element to disable the default browser autocomplete functionality. | false
| enableShow (optional) | Bool  | Displays a show/hide link that reveals passwords | false
| error (optional) | String | Adds indicator and error text to element. | None
| label (optional) | String | Label for modal | None
| name (required) | String | Name for input element | None
| onChange (optional) | Function | Called when value of input changes. | None
| placeholder (optional) | Node | Placeholder node for input | None
| readOnly (optional) | Bool   | Sets element as read only. | false
| required (optional) | Bool   | Marks input as required and adds indicator. | false
| type (optional) | String   | The type of control to display, tested 'number' and 'text' | 'text'
| value (optional) | Node | Value of input | None

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
| clearable (optional) | Bool | Whether the selected value can be cleared | False
| disabled (optional) | Bool | Whether the select is disabled | False
| label (optional) | String | Label for select element | None
| multi (optional) | Bool | Whether a multiple options may be selected | False
| onChange (optional) | Function | Called with new value when it changes | None
| options (optional) | Array | Possible options. Must contain objects with label and value attributes | None
| placeholder (optional) | String | Placeholder text | ""
| searchable (optional) | Bool | Whether or not the values in the dropdown are searchable. | False
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

Table component supporting sorting, filtering and pagination.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| className (optional) | String | Additional classname to apply to the table. | None
| data (required) | Array | The array of data items, each corresponding to a single potential table row | None
| filter (optional) | Function | Called with data for a single row. Should return `false` if the row should be filtered out, or `true` otherwise. | None
| fixed (optional) | Boolean | Whether or not table column widths should be fixed (vs fluid). | False
| initialPage (optional) | Number | The 1-based index of the initial page to be displayed initially. | None
| initialSortState (optional) | `{columnID: String, direction: Table.sortDirection}` | The initial sort state of the table. | None
| onPageChange (optional) | Function | Callback function for the 1-based index displayed page change event. | None
| onSortChange (optional) | Function | Callback function for the sort state change event. | None
| pageSize (optional) | Number | The number of data rows to display on each page. | 10
| paginated (optional) | Boolean | Whether or not to enable pagination. See `pageSize` | false
| rowIDFn (required) | Function | Called with data for a single row. Should return the unique ID for that row. | None

**API**

- `setCurrentPage(page: Number)` - Explicitly sets the displayed page on the Table with the specified 1-based page. Useful for reacting to data or filter changes that warrant resetting the current page.
  - **NOTE:** The current page is automatically reset to the first page on every sort state change.

#### Table.Column
The `Table` component requires child components of type `Table.Column`, which provide configuration for the table header and row cells.

**Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| header (optional) | `{className: String (optional), content: Any (optional)}` | Configuration for the header cell of this column. | None
| cell (required) | `{className: String (optional), renderer: Function}` | Configuration for the table body cell for this column. `renderer` will be called with data for a single row and should return content that can be rendered by the React DOM renderer. | None
| id (required) | String | Unique identifier for the column. Can be used in referencing columns for sorting. | None
| noWrap (optional) | Boolean | Prevents the column content from wrapping. In the non-fixed mode, the table column will automatically expand to fit all content in the column on a single line. | False
| sortable (optional) | Boolean | Enables sorting for the column. | False
| sortValueFn (optional) | Function | Called with data for a single row. Should return a sortable value for row. | None

**Usage Example**

[Sample Code](https://github.com/Clever/components/tree/master/docs/TableExample.jsx) ([Live Demo](http://clever.github.io/components/#table))

### Grid

12-column grid component for consistent, simple and flexible layouts.

The `Grid` is a single column of any number of `Grid.Row`s, which contain any number of `Grid.Col`s.

`Grid.Col`s can have varying sizes, determined by the values of their `span` prop.
A single `Grid.Col` can have different span lengths for different viewport sizes to enable layouts that update dynamically based on available space in the viewport.

**NOTE:** A row of `Grid.Col`s is guaranteed to fit on a single line only if the sum of the `span`s add up to 12 in the current
viewport. Any additional `Grid.Col`s will wrap onto the following line.

**`<Grid />` Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| children (optional) | Array<Grid.Row> | The rows to render in the grid. | None
| className (optional) | String | Additional classname to apply to the grid. | None
| wrapperComponent (optional) | Any | The tagname or component class for the wrapper component to render for the grid | "div"

**`<Grid.Row />` Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| children (optional) | Array<Grid.Col> | The columns to render in the row. | None
| className (optional) | String | Additional classname to apply to the row. | None
| grow (optional) | Boolean | Fluidly grows the row to fill any available vertical space. The parent Grid should have an explicit height set for this to work. | False
| wrapperComponent (optional) | Any | The tagname or component class for the wrapper component to render for the row | "div"

**`<Grid.Col />` Options**

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| children (optional) | React Node | The content to render in the column. | None
| className (optional) | String | Additional classname to apply to the column. | None
| span (optional) | Number or Map<Grid.Size, Number> | The number of columns (1-12) that this column spans. Can optionally as a map of viewport size to column span in order to dynamically update the grid based on the user's viewport width. | 1
| wrapperComponent (optional) | Any | The tagname or component class for the wrapper component to render for the column | "div"

**Usage Examples**

[Sample Code](https://github.com/Clever/components/tree/master/docs/GridExample.jsx) ([Live Demo](http://clever.github.io/components/#grid))

### FlexBox and FlexItem

`FlexBox` provides a flex-enabled container as a convenience wrapper around the clever-components flex CSS classes.
A `FlexBox` may contain any other renderable elements, including other `FlexBox` components or `FlexItem`s.

`FlexItem` similarly provides a convenience wrapper around flex item-specific CSS classes and may in turn contain any combination of React-supported elements.

**NOTE:** Using a `FlexItem` properties have no effect on an element unless it is rendered within a `FlexBox` or other `display: flex` container.
However `FlexBox` can be used without `FlexItem` in many cases.

#### `<FlexItem />` Options

([Source code](https://github.com/Clever/components/tree/master/src/flex/FlexItem.jsx))

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| alignSelf (optional) | ItemAlign | Sets the cross-axis alignment of this flex item only. | ItemAlign.STRETCH
| children (optional) | React Node | The child items to render in the flex box. | None
| className (optional) | String | Additional classname to apply to the flex box. | None
| component (optional) | Any | The tagname or component class for the wrapper component to render for the flex item | "div"
| grow (optional) | Boolean | Fluidly grows the item to fill any available space along the main axis. | False

#### `<FlexBox />` Options

([Source code](https://github.com/Clever/components/tree/master/src/flex/FlexBox.jsx))

`FlexBox`es can be nested within one another, hence `FlexBox` supports all the above `FlexItem` props in addition to the following `FlexBox`-specific props:

| Prop             | Type     | Description                           | Default
|------------------|----------|---------------------------------------|---------
| alignContent (optional) | ContentAlign | Sets the cross-axis alignment of multi-line content. | ContentAlign.STRETCH
| alignItems (optional) | ItemAlign | Sets the cross-axis alignment of single-line content. | ItemAlign.STRETCH
| children (optional) | React Node | The child items to render in the flex box. | None
| className (optional) | String | Additional classname to apply to the flex box. | None
| column (optional) | Boolean | Switches the flex box to a column-direction main axis. Child items will flow vertically. | False
| inline (optional) | Boolean | Enables the inline-flex display mode for the flex box. The flex box container will fit the width of its content and share the line with any other inline elements. Similar to display: inline-block. | False
| justify (optional) | Justify | Sets the main-axis alignment of the flex box content. | ContentAlign.START
| wrap (optional) | Boolean | Causes child items to wrap if they are unable to fit on a single line. By default, flex items will shrink up to their minimum widths without wrapping, eventually causing them to overflow their container. `wrap` allows items to wrap to the multiple lines if necessary. | False

#### Usage Examples

[Sample Code](https://github.com/Clever/components/tree/master/docs/FlexExample.jsx) ([Live Demo](http://clever.github.io/components/#flex))
