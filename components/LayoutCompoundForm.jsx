import React, { PureComponent } from "react";

import View from "./View";
import { Grid } from "src";

import "./LayoutCompoundForm.less";

export default class LayoutCompoundForm extends PureComponent {
  render() {
    const { cssClass } = LayoutCompoundForm;
    const { Col, Row } = Grid;

    return (
      <View className={cssClass.CONTAINER} title="Compound Form">
        <Grid>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox padding--right--l">
              <div>
                <h2>Layout Guidelines</h2>
                <p>
                  Now that we have broken down most variation of input fields (TextInput, TextArea,
                  etc), let’s hash out how they should behave together. Below are the basic
                  guidelines we have set up based on the different use-cases we’ve encountered in
                  our product.
                </p>
                <p>
                  Please ping #design when you are unable to use the example below to design your
                  own form! We will gladly take a look and add new use-cases to the working
                  guidelines below!
                </p>
              </div>
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={12} className="flexbox">
              <div>
                <h3>Do's and Don'ts</h3>
                <p>
                  Below is a working list of simple guidelines to help ensures that your form-design
                  will turn out 🔥!
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox">
              <div>
                <p className="text--semi-bold">
                  #1. Form inputs should be stacked according to the order of proper information
                  architecture
                </p>
                <p>Moving forward with the new component, this should become the default norm.</p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img src="./assets/img/guide1_bad.png" alt="Unstacked form inputs" />
            </Col>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img src="./assets/img/guide1_good.png" alt="Stacked form inputs" />
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Don’t:</strong> arbitrarily add space between TextInput forms.
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Do:</strong> vertically stack relevant information form. A horizontal
                  split is also appropriate for expected shorter content.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox margin--top--2xl">
              <div>
                <p className="text--semi-bold">
                  #2. Treat checkbox, radio, and type ahead search field layout similarly with
                  TextInput component
                </p>
                <p>
                  All method of inputs should be treated the same way--with white bounding box
                  surround.
                </p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img src="./assets/img/guide2_bad.png" alt="Checkbox field with no background" />
            </Col>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img src="./assets/img/guide2_good.png" alt="Checkbox field with background" />
            </Col>
          </Row>

          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Don’t:</strong> remove the bounded background on alternative input fields.
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Do:</strong> treat them similarly to TextInput
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox margin--top--2xl">
              <div>
                <p className="text--semi-bold">#3. Use concise and thoughtful input labels</p>
                <p>
                  This is one of the more difficult ones to achieve and often take several
                  iterations to get right. However, the impact of having clear and concise
                  instruction is definitely key to successful form design.
                </p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img src="./assets/img/guide3_bad.png" alt="Existing Client Secret workflow" />
            </Col>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img src="./assets/img/guide3_good.png" alt="Explicit action on form input" />
            </Col>
          </Row>

          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Don’t:</strong> be too wordy. Wordy ≠ Descriptive.
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Do:</strong> be explicit with your labels.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox margin--top--2xl">
              <div>
                <p className="text--semi-bold">
                  #4. Use the ‘hint’ pattern to only display more information about a field at the
                  right time
                </p>
                <p>
                  When relying on labels alone is not enough, we can utilize additional screen
                  real-estate with a pop-over.
                </p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img
                src="./assets/img/guide4_bad.png"
                alt="More info displayed using info icon outside of formInput"
              />
            </Col>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img
                src="./assets/img/guide4_good.png"
                alt="More info displayed using hint pop-over above formInput"
              />
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl imgCentered">
              <div>
                <p>
                  <strong>Don’t:</strong> add info bubble outside of bounded input to display
                  additional information.
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl imgCentered">
              <div>
                <p>
                  <strong>Do:</strong> utilize the similar pattern with password hints on the login
                  flow to pop-out important information just as the user need them.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox margin--top--2xl">
              <div>
                <p className="text--semi-bold">
                  #5. Be explicit with the state of the form (view vs edit)
                </p>
                <p>
                  This is something that we at Clever could collectively get better at. We currently
                  have a habit of displaying most of our form fields as ‘active’ and always in a
                  ready to update state. This can often cause confusion due to the inherent lack of
                  clarity of what is the current state of the page.
                </p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <div>
                <img
                  src="./assets/img/guide5_bad.png"
                  alt="Existing instant login Clever Password setting page"
                />
              </div>
            </Col>
            <Col
              span={6}
              className="flexbox margin--top--m padding--right--l imgCentered flexColumn"
            >
              <div>
                <img
                  src="./assets/img/guide5_good_a.png"
                  alt="Profile Settings displayed in an infoCard view mode"
                />
                <img src="./assets/img/guide5_good_b.png" alt="Edit profile settings in a modal" />
              </div>
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Don’t:</strong> leave a ‘free to edit’ form inputs without a clear ‘save’
                  button in sight.
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Do:</strong> have an explicit ‘view’ (a) and ‘edit’ (b) mode.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox">
              <div>
                <h3>Example in practice</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox margin--top--s">
              <div>
                <p className="text--semi-bold">A. Application Settings Page - Apps Dashboard</p>
                <p>Guidelines used in the example below: #1, 3, 4, 5.</p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img
                src="./assets/img/exampleA_before.png"
                alt="Existing Application Settings Page"
              />
            </Col>
            <Col
              span={6}
              className="flexbox margin--top--m padding--right--5xl imgCentered flexColumn"
            >
              <img
                src="./assets/img/exampleA_after_a.png"
                alt="Redesigned Application Settings Page with infoCards"
              />
              <img src="./assets/img/exampleA_after_b.png" alt="Edit modal" />
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Before:</strong> long in-page form without a clear state of whether or not
                  any of the page content has been modified. ‘Update’ button is placed at the bottom
                  of the page--past page fold and is easy to miss.
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>After:</strong> (a) Explicit ‘view’ mode; (b) Explicit edit state in modal
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12} className="flexbox margin--top--m">
              <div>
                <p className="text--semi-bold">B. Add resources modal (portal)</p>
                <p>Guidelines used in the example below: #1, 2, 3.</p>
              </div>
            </Col>
          </Row>
          <Row grow>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img
                src="./assets/img/exampleB_before.png"
                alt="Existing add a link modal in portal customization"
              />
            </Col>
            <Col span={6} className="flexbox margin--top--m padding--right--5xl imgCentered">
              <img
                src="./assets/img/exampleB_after.png"
                alt="Redesigned add a link modal in portal customization"
              />
            </Col>
          </Row>
          <Row grow className="margin--bottom--xl">
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>Before:</strong> loosely structured form inputs
                </p>
              </div>
            </Col>
            <Col span={6} className="flexbox margin--top--s padding--right--5xl">
              <div>
                <p>
                  <strong>After:</strong> structured form inputs
                </p>
              </div>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

LayoutCompoundForm.cssClass = {
  CONTAINER: "LayoutCompoundForm",
};
