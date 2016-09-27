/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";

import GridExample from "./GridExample";
import TableExample from "./TableExample";
import {
  Button,
  ConfirmationButton,
  CopyableInput,
  Modal,
  ModalButton,
  SegmentedControl,
  Select,
  TextInput,
} from "../src/";

require("./docs.less");

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      inputValues: {
        placeholderInput: "",
        requiredInput: "testing",
        errorInput: "hello@gmail",
        passwordInput: "surprise!",
        copyableInput: "1234-1234-1234-1234",
        copyablePwd: "🙈 🙉 🙊",
      },
      selectValues: {
        basicSelect: null,
        disabledBasicSelect: {label: "Selected Option", value: "selected_opt"},
        disabledMultiSelect: [{label: "1", value: "1"}, {label: "9", value: "9"}],
        multiSelect: [{label: "3", value: "3"}],
      },
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  onChangeText(event, inputElem) {
    var newInputValues = Object.assign({}, this.state.inputValues);
    newInputValues[inputElem] = event.target.value;
    this.setState(
      {inputValues: newInputValues, selectValues: this.state.selectValues}
    );
  }
  onSelectChange(attribute, value) {
    const newSelectValues = Object.assign({}, this.state.selectValues);
    newSelectValues[attribute] = value;
    this.setState(
      {inputValues: this.state.inputValues, selectValues: newSelectValues}
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
        <footer>
          <Button value="Never mind" type="link" onClick={this.closeModal} />
          <Button value="Sounds good" type="primary" onClick={this.closeModal} />
        </footer>
      </Modal>);
    }

    return (
      <div style={{fontFamily: "Proxima Nova", marginBottom: "50px"}}>
        <h1>TextInputs</h1>
        <div style={{width: "300px"}}>
          <TextInput
            label="Form Input Placeholder"
            name="TextInputName"
            placeholder="placeholder goes here"
            onChange={(event) => this.onChangeText(event, "placeholderInput")}
            value={this.state.inputValues.placeholderInput}
          />
          <br />
          <TextInput
            label="Required Form Input"
            name="TextInputName"
            placeholder="placeholder"
            onChange={(event) => this.onChangeText(event, "requiredInput")}
            value={this.state.inputValues.requiredInput}
            required
          />
          <br />
          <TextInput
            label="Required Form Error"
            name="TextInputName"
            onChange={(event) => this.onChangeText(event, "errorInput")}
            value={this.state.inputValues.errorInput}
            error="Enter a valid email address"
            required
          />
          <br />
          <TextInput
            label="Form Readonly"
            name="TextInputName"
            value="Readonly value"
            readOnly
          />
          <br />
          <TextInput
            label="Form Disabled"
            name="TextInputName"
            value="Disabled value"
            disabled
          />
          <br />
          <TextInput
            label="Password Form Input"
            name="TextInputName"
            type="password"
            onChange={(event) => this.onChangeText(event, "passwordInput")}
            value={this.state.inputValues.passwordInput}
            enableShow
          />
          <br />
          <CopyableInput
            label="Copyable Text Input"
            name="CopyableInput"
            onChange={(event) => this.onChangeText(event, "copyableInput")}
            value={this.state.inputValues.copyableInput}
            enableCopy
          />
          <br />
          <CopyableInput
            label="Copyable Password"
            name="CopyablePassword"
            onChange={(event) => this.onChangeText(event, "copyablePwd")}
            value={this.state.inputValues.copyablePwd}
            type="password"
            enableCopy
            enableShow
          />
          <br />
        </div>
        <h1>Selects</h1>
        <div style={{width: "300px"}}>
          <Select
            id="BasicSelect"
            label="Basic Select"
            clearable
            name="BasicSelect"
            onChange={(val) => this.onSelectChange("basicSelect", val)}
            options={[
              {label: "Option 1", value: "opt1"},
              {label: "Option 2", value: "opt2"},
              {label: "Option 3", value: "opt3"},
            ]}
            placeholder="Select one option"
            value={this.state.selectValues.basicSelect}
          />
          <br />
          <Select
            id="MultiSelect"
            label="Multi Select"
            multi
            name="MultiSelect"
            onChange={(val) => this.onSelectChange("multiSelect", val)}
            options={[
              {label: "1", value: "1"},
              {label: "2", value: "2"},
              {label: "3", value: "3"},
              {label: "4", value: "4"},
              {label: "5", value: "5"},
            ]}
            placeholder="Select at least one option"
            value={this.state.selectValues.multiSelect}
          />
          <br />
          <Select
            id="DisabledBasicSelect"
            name="DisabledBasicSelect"
            label="Disabled Basic Select"
            disabled
            value={this.state.selectValues.disabledBasicSelect}
          />
          <br />
          <Select
            id="DisabledMultiSelect"
            name="DisabledMultiSelect"
            label="Disabled Multi Select"
            disabled
            multi
            value={this.state.selectValues.disabledMultiSelect}
          />
        </div>
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
        <Button type="link" href="http://clever.com" value="Link" />
        <Button disabled type="link" href="http://clever.com" value="Disabled Link" />
        <br />
        <p>
          Here is a <Button type="linkPlain" href="//google.com" value="plain link" /> with no margin/padding.
          <br />
          Better suited for inline links than the
          regular <Button type="link" href="//google.com" value="link button" />, which doesn't automatically
          match the text around it.
        </p>
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
        <h1>SegmentedControl</h1>
        <SegmentedControl
          onSelect={(option) => console.log(`Option ${option} selected`)}
          options={[{
            content: "Option 1",
            value: "one",
          }, {
            content: "Option 2",
            value: "two",
          }]}
        />
        <br />
        <SegmentedControl
          defaultValue="two"
          onSelect={(option) => console.log(`Option ${option} selected`)}
          options={[{
            content: "Option 1",
            value: "one",
          }, {
            content: "2 - Default",
            value: "two",
          }, {
            content: "3 - Option Disabled",
            disabled: true,
            value: "three",
          }]}
        />
        <br />
        <SegmentedControl
          defaultValue="two"
          disabled
          onSelect={(option) => console.log(`Option ${option} selected`)}
          options={[{
            content: "1 - Control Disabled",
            value: "one",
          }, {
            content: "2 - Selected and Control Disabled",
            value: "two",
          }, {
            content: "3 - Control Disabled",
            value: "three",
          }]}
        />
        <br />
        <SegmentedControl
          onSelect={(option) => console.log(`Option ${option} selected`)}
          options={[{
            content: (
              <span>
                1 - HTML Content <span className="fa fa-question-circle" />
              </span>
            ),
            value: "one",
          }, {
            content: "2 - Plain Text",
            value: "two",
          }, {
            content: (
            <span>
              3 - HTML Content <span className="fa fa-spinner fa-spin" />
            </span>
            ),
            value: "three",
          }]}
        />
        <TableExample />
        <GridExample />
        {/* Enable scrolling past the bottom for convenience. */}
        <div style={{margin: "0 0 600px"}} />
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
