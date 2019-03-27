import React, { PureComponent } from "react";

import View from "./View";
import { Icon } from "src";
import { Grid } from "src";

import "./UITextView.less";

export default class UITextView extends PureComponent {
  render() {
    const { cssClass } = UITextView;
    const { Col, Row } = Grid;

    return (
      <View className={cssClass.CONTAINER} title="UI Text">
        <Grid>
          <Row grow className="justify--left margin--bottom--xl">
            <Col span={6} className="flexbox padding--right--l">
              <div>
                <h2>Interfaces are mostly text</h2>
                <p>
                  From buttons denoting actions to instructions for complex interfaces, the majority
                  of an interface is communicated through text. Writing clear and actionable text
                  takes practice.
                </p>
              </div>
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl justify--left">
            <Col span={12} className="flexbox self--start">
              <h2>The basics</h2>
            </Col>
            <Col span={6} className="flexbox self--start">
              <Row grow className="items--stretch">
                <Col span={12} className="flexbox uiText--block">
                  <div>
                    <Icon size={Icon.sizes.MEDIUM} name={Icon.names.GLASSES} />
                    <h3 className="display--inlineBlock padding--left--m">Write for all users</h3>
                    <p>
                      Some people will read every word you write. Others will just skim. Help
                      everyone read better by grouping related ideas together and using descriptive
                      headers and subheaders.
                    </p>
                  </div>
                </Col>
                <Col span={12} className="flexbox uiText--block">
                  <div>
                    <Icon size={Icon.sizes.MEDIUM} name={Icon.names.CHAT_HEART} />
                    <h3 className="display--inlineBlock padding--left--m">Be friendly</h3>
                    <p>
                      Write like a human. Don’t be afraid to break a few rules if it makes your
                      writing more relatable.
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={4} className="flexbox justify--left">
              <Row grow className="items--stretch">
                <Col span={8} className="flexbox uiText--block">
                  <div>
                    <Icon size={Icon.sizes.MEDIUM} name={Icon.names.LEADER} />
                    <h3 className="display--inlineBlock padding--left--m">Guide the user</h3>
                    <p>
                      Think of yourself as a tour guide for our readers. Communicate in a friendly
                      and helpful way.
                    </p>
                  </div>
                </Col>
                <Col span={8} className="flexbox uiText--block">
                  <div>
                    <Icon size={Icon.sizes.MEDIUM} name={Icon.names.PEN_PAPER} />
                    <h3 className="display--inlineBlock padding--left--m">Be concise</h3>
                    <p>Use short words and sentences. Avoid unnecessary modifiers.</p>
                  </div>
                </Col>
                <Col span={8} className="flexbox uiText--block">
                  <div>
                    <Icon size={Icon.sizes.MEDIUM} name={Icon.names.BULLSEYE} />
                    <h3 className="display--inlineBlock padding--left--m">Be specific</h3>
                    <p>Avoid vague language. Cut the fluff.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

UITextView.cssClass = {
  CONTAINER: "UITextView",
};
