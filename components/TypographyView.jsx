import React, {PureComponent} from "react";

import Example from "./Example";
import View from "./View";
import {Grid} from "src";

export default class TypographyView extends PureComponent {
  render() {
    const {cssClass} = TypographyView;
    const {Col, Row} = Grid;


    return (
      <View className={cssClass.CONTAINER} title="Typography">
        <Grid>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox self--start">
              <div>
                <h2>Typeface</h2>
                <p>We use Proxima Nova as our primary typeface. It is an intelligent and friendly typeface that
                   is used for its clarity and ease-of-legibility.</p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow>
                <Col span={12} className="flexbox margin--bottom--l">
                  <div>
                    <h3 className="text--line-height-4 text--regular">
                      A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
                      <br />
                      a b c d e f g h i j k l m n o p q r s t u v w x y z
                      <br />
                      0 1 2 3 4 5 6 7 8 9</h3>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox self--start">
              <div>
                <h2>Type Scale</h2>
                <p>We use a rem based type scale set at its base to 16px. There are seven different font sizes.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox">
              <Example
                title=""
                code={`
                  <p className="text--colossal">Colossal</p>
                  <p className="text--gargantuan">Gargantuan</p>
                  <p className="text--huge">Huge</p>
                  <p className="text--large">Large</p>
                  <p className="text--medium">Medium</p>
                  <p className="text--small">Small</p>
                  <p className="text--tiny">Tiny</p>
                `}
              >
                <p className="text--colossal margin--none">Colossal</p>
                <p className="text--gargantuan margin--none">Gargantuan</p>
                <p className="text--huge margin--none">Huge</p>
                <p className="text--large margin--none">Large</p>
                <p className="text--medium margin--none">Medium</p>
                <p className="text--small margin--none">Small</p>
                <p className="text--tiny margin--none">Tiny</p>
              </Example>
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox self--start">
              <div>
                <h2>Type Weight</h2>
                <p>There are five different type weights. The most commonly used should be text--regular,
                   while semi-bold and light are secondary weights. Bold and heavy are for special cases.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox">
              <Example
                title=""
                code={`
                  <p className="text--light">Proxima Nova Light</p>
                  <p className="text--regular">Proxima Nova Regular</p>
                  <p className="text--semi-bold">Proxima Nova Semibold</p>
                  <p className="text--bold">Proxima Nova Bold</p>
                  <p className="text--heavy">Proxima Nova Heavy</p>
                `}
              >
                <p className="text--large text--light">Proxima Nova Light</p>
                <p className="text--large text--regular">Proxima Nova Regular</p>
                <p className="text--large text--semi-bold">Proxima Nova Semibold</p>
                <p className="text--large text--bold">Proxima Nova Bold</p>
                <p className="text--large text--heavy">Proxima Nova Heavy</p>
              </Example>
            </Col>
          </Row>

        </Grid>
      </View>
    );
  }
}

TypographyView.cssClass = {
  CONTAINER: "TypographyView",
};
