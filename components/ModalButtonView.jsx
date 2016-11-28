import loremIpsum from "lorem-ipsum";
import React, {Component} from "react";

import Example from "./Example";
import View from "./View";
import {ModalButton} from "src";


export default class ModalButtonView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {cssClass} = ModalButtonView;

    return (
      <View className={cssClass.CONTAINER} title="ModalButton">
        <Example
          code={`
            <ModalButton
              type="primary"
              modalTitle="Helpful info"
              onClick={() => console.log("ModalButton: modal opened!")}
              onClose={() => console.log("ModalButton: modal closed!")}
              value="More info"
            >
              <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
              <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
            </ModalButton>
          `}
        >
          <ModalButton
            type="primary"
            modalTitle="Helpful info"
            onClick={() => console.log("ModalButton: modal opened!")}
            onClose={() => console.log("ModalButton: modal closed!")}
            value="More info"
          >
            <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
            <p>{loremIpsum({count: 1, units: "paragraphs"})}</p>
          </ModalButton>
        </Example>
      </View>
    );
  }
}

ModalButtonView.cssClass = {
  CONTAINER: "ModalButtonView",
};
