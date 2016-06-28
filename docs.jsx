/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";

import {
  Button,
  ConfirmationButton,
  TextInput,
  Modal,
  ModalButton,
} from "../src/";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      inputValues: {
        placeholderInput: "",
        requiredInput: "testing",
        errorInput: "hello@gmail",
        passwordInput: "",
      },
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }
  onChangeText(event, inputElem) {
    var newInputValues = Object.assign({}, this.state.inputValues);
    newInputValues[inputElem] = event.target.value;
    this.setState(
      {inputValues: newInputValues}
    );
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  render() {
    let modalElement;
    if (this.state.modalIsOpen) {
      modalElement = (<Modal title="Hello Modal" closeModal={this.closeModal}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu felis non risus accumsan euismod sit amet in dolor. Proin nec massa enim. Vestibulum posuere nulla non leo aliquet pulvinar. Pellentesque id augue a nunc mollis pharetra eu quis enim. Aenean rhoncus fermentum mauris, id euismod tortor semper at. Morbi viverra lectus non risus facilisis, a blandit urna gravida. Suspendisse mollis convallis sapien, et fermentum justo tristique sed. In sit amet lacus dui. </p>
        <p>Curabitur tincidunt congue mi vel pretium. Etiam semper ut tortor ac feugiat. Fusce maximus id lacus gravida aliquet. Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse eros ante, vehicula in dictum eu, luctus sit amet dui. Ut quam libero, cursus sit amet tortor eget, feugiat laoreet turpis. Praesent nec nulla ut urna feugiat pulvinar eget eu enim.</p>
      </Modal>);
    }

    return (
      <div>
        <h1>TextInputs</h1>
        <TextInput
          label="Form Input Placeholder"
          name="TextInputName"
          placeholder="placeholder goes here"
          onChange={(event) => this.onChangeText(event, "placeholderInput")}
          value={this.state.inputValues.placeholderInput}
        />
        <br></br>
        <TextInput
          label="Required Form Input"
          name="TextInputName"
          placeholder="placeholder"
          onChange={(event) => this.onChangeText(event, "requiredInput")}
          value={this.state.inputValues.requiredInput}
          required
        />
        <br></br>
        <TextInput
          label="Required Form Error"
          name="TextInputName"
          onChange={(event) => this.onChangeText(event, "errorInput")}
          value={this.state.inputValues.errorInput}
          error="Enter a valid email address"
          required
        />
        <br></br>
        <TextInput
          label="Form Readonly"
          name="TextInputName"
          value="Readonly value"
          readOnly
        />
        <br></br>
        <TextInput
          label="Form Disabled"
          name="TextInputName"
          value="Disabled value"
          disabled
        />
        <br></br>
        <TextInput
          label="Password Form Input"
          name="TextInputName"
          type="password"
          onChange={(event) => this.onChangeText(event, "passwordInput")}
          value={this.state.inputValues.passwordInput}
          required
        />
        <br></br>

        <h1>Button</h1>
        <h2>Button Sizing</h2>
        <Button type="primary" size="large" value="Large" />
        <Button type="primary" size="regular" value="Regular" />
        <Button type="primary" size="small" value="Small" />
        <h2>Button Styles</h2>
        <Button type="primary" size="regular" value="Primary" />
        <Button type="secondary" size="regular" value="Secondary" />
        <Button type="destructive" size="regular" value="Destructive" />
        <Button disabled size="regular" value="Disabled" />
        <h2>Button-as-Link</h2>
        <Button type="primary" size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button type="secondary" size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button type="destructive" size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <Button disabled size="regular" href="http://lmgtfy.com/?q=button-as-link" value="LMGTFY" />
        <h1>Modal</h1>
        <Button size="large" type="primary" onClick={this.openModal} value="Open Modal" />
        {modalElement}
        <h1>ModalButton</h1>
        <ModalButton
          type="primary" size="regular" value="More info" modalTitle="Helpful info"
          onClick={() => console.log("ModalButton: modal opened!")}
          onClose={() => console.log("ModalButton: modal closed!")}
        >
          <p>This is so interesting!</p>
        </ModalButton>
        <h1>ConfirmationButton</h1>
        <ConfirmationButton
          type="destructive" size="regular" value="Submit for confirmation" modalTitle="Please confirm"
          confirmButtonType="destructive"
          onClick={() => console.log("ConfirmationButton: modal opened!")}
          onClose={() => console.log("ConfirmationButton: modal closed!")}
          onConfirm={() => console.log("ConfirmationButton: confirmed!")}
        >
          <p>This action requires confirmation. Please confirm!</p>
        </ConfirmationButton>
      </div>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <Demo />,
    document.getElementById("content")
  );
};
