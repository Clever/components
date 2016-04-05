# Clever Front End Components

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

## Components

### Modal

This component wraps your content and displays it in a modal with a shadow box.

**Options**

| Prop | Type | Description | Default |
|----|----|----|----|
| title | String | Header text for the modal | None |
| closeModal | Function | Called when user clicks outside modal |None
| width (optional) | Number | Width of the modal | 400px |


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

## Contributing

### When to add a component

* Rule of 3ish - Copy and pasting it more than once? Is it being used in a few places? Yes, componentize it!
* It's in our desired components list

#### Desired components

**Definitely Want**
* ~~Buttons~~ (done)
* ~~Modals~~ (done)
* Form elements - input, select, radio, checkbox, textarea
* Flash messages
* Alerts - sub type of Modal
* Tables

**Someday Want**

* Header
* Navbar
* Breadcrumbs
* Pagination

### How to add a component
* Add a new folder to `/src` with your component
* Add a test in `/test` named `[component]_test.js`
* Create an example of how to use your component in code
* Add a working/live example of your component to the docs
* Export your component in `index.js`
* Open a PR and assign it to someone in [@frontend](https://github.com/orgs/Clever/teams/front-end)

