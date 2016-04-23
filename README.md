# Clever Front End Components

**Jump to** [Modal](#modal), [Button](#button)

## Install

Install the NPM package and save it to your project using

```
npm install --save-dev clever-components
```

To use a component, you'll need to be working with React and Webpack. Components that include their own styles may require you to install Webpack's style loaders. If this is configured correctly, you can simply `require` these components like any other package:

```javascript
var Modal = require('clever-components').Modal; // ES5

import {Modal} from 'clever-components'; // ES6
```

## Contributing

### How to add a component
* Run `./bin/new_component <your component>` to autogenerate source and test stubs
* Document your component in the readme with PropTypes and a usage example
* Add a working example of your component in /docs
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
