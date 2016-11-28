import loremIpsum from "lorem-ipsum";
import React, {Component} from "react";

import Example from "./Example";
import View from "./View";
import {Button, Modal} from "src";


export default class ModalView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cssClass} = ModalView;

    return (
      <View className={cssClass.CONTAINER} title="Modal">
        <Example
          code={`
            <Button
              type="primary"
              onClick={() => this.setState({isModalOpen: true})}
              value="Open Modal"
            />
            {this.state.isModalOpen && (
              <Modal
                title="Hello Modal"
                closeModal={() => this.setState({isModalOpen: false})}
              >
                <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
                <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
                <footer>
                  <Button
                    value="Never mind"
                    type="link"
                    onClick={() => this.setState({isModalOpen: false})}
                  />
                  <Button
                    value="Sounds good"
                    type="primary"
                    onClick={() => this.setState({isModalOpen: false})}
                  />
                </footer>
              </Modal>
            )}
          `}
        >
          <Button
            type="primary"
            onClick={() => this.setState({isModalOpen: true})}
            value="Open Modal"
          />
          {this.state.isModalOpen && (
            <Modal
              title="Hello Modal"
              closeModal={() => this.setState({isModalOpen: false})}
            >
              <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
              <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
              <footer>
                <Button
                  value="Never mind"
                  type="link"
                  onClick={() => this.setState({isModalOpen: false})}
                />
                <Button
                  value="Sounds good"
                  type="primary"
                  onClick={() => this.setState({isModalOpen: false})}
                />
              </footer>
            </Modal>
          )}
        </Example>
      </View>
    );
  }
}

ModalView.cssClass = {
  CONTAINER: "ModalView",
};
