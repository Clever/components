/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";

import {Button} from "../src/Button/Button";
import {Modal} from "../src/Modal/Modal";

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
