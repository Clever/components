import React, {PureComponent} from "react";

import View from "./View";
import {Grid} from "src";

export default class TypographyView extends PureComponent {
  render() {
    const {cssClass} = TypographyView;
    const {Col, Row, Size} = Grid;


    return (
      <View className={cssClass.CONTAINER} title="Typography">
        <Grid>
          <Row grow className="items--start margin--bottom--xl">
            <Col span={5} className="flexbox justify--left items--center padding--right--l">
              <div className="display--block">
                <h2>Typeface</h2>
                <p>We use Proxima Nova as our primary typeface. It is an intelligent and friendly typeface that is used for its clarity and ease-of-legibility.</p>
              </div>
            </Col>
            <Col span={7} className="flexbox justify--left items--center">
              <Row grow>
                <Col span={12} className="flexbox justify--left margin--bottom--l">
                  <div className="display--block">
                    <h3 className="">Proxima Nova</h3>
                    <quote>Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz<br></br>
                    0 1 2 3 4 5 6 7 8 9</quote>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="items--start margin--bottom--xl">
            <Col span={5} className="flexbox justify--left items--center padding--right--l">
              <div className="display--block">
                <h2>Type Scale</h2>
                <p>We use a rem based type scale set at its base to 16px. There are seven different font sizes.</p>
              </div>
            </Col>
            <Col span={7} className="flexbox justify--left items--center">
              <Row grow>
                <Col span={12} className="flexbox justify--left margin--bottom--l">
                  <ul className="list-reset">
                    <li className="margin--y--m">
                      <p className="text--colossal margin--none">Colossal</p>
                      <code className="text--medium">.text--colossal 4rem</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--gargantuan margin--none">Gargantuan</p>
                      <code className="text--medium">.text--gargantuan 2.5rem</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--huge margin--none">Huge</p>
                      <code className="text--medium">.text--huge 2rem</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--large margin--none">Large</p>
                      <code className="text--medium">.text--large 1.5rem</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--medium margin--none">Medium</p>
                      <code className="text--medium">.text--medium 1rem</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--small margin--none">Small</p>
                      <code className="text--medium">.text--small .75rem</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--tiny margin--none">Tiny</p>
                      <code className="text--medium">.text--tiny .625rem</code>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="items--start margin--bottom--xl">
            <Col span={5} className="flexbox justify--left items--center padding--right--l">
              <div className="display--block">
                <h2>Type Weight</h2>
                <p>There are five different type weights. The most commonly used should be text--regular, while semi-bold and light are secondary weights. Bold and heavy are for special cases.</p>
              </div>
            </Col>
            <Col span={7} className="flexbox justify--left items--center">
              <Row grow>
                <Col span={12} className="flexbox justify--left margin--bottom--l">
                  <ul className="list-reset">
                    <li className="margin--y--m">
                      <p className="text--large text--light margin--none">Proxima Nova Light</p>
                      <code className="text--medium">.text--light</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--large text--regular margin--none">Proxima Nova Regular</p>
                      <code className="text--medium">.text--regular</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--large text--semi-bold margin--none">Provima Nova Semibold</p>
                      <code className="text--medium">.text--semi-bold</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--large text--bold margin--none">Proxima Nova Bold</p>
                      <code className="text--medium">.text--bold</code>
                    </li>
                    <li className="margin--y--m">
                      <p className="text--large text--heavy margin--none">Proxima Nova Heavy</p>
                      <code className="text--medium">.text--heavy</code>
                    </li>
                  </ul>
                </Col>
              </Row>
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
