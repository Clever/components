import _ from "lodash";
import classnames from "classnames";
import React from "react";

import View from "./View";
import {Button} from "src";
import {Icon} from "src";
import {Grid} from "src";

export default function IntroView() {
  const {cssClass} = IntroView;
  const {Col, Row, Size} = Grid;

  return (
    <View className={cssClass.CONTAINER} title="Say &ldquo;Hi!&rdquo; to Dewey">
      <Grid>
        <Row grow className="items--start margin--bottom--xl">
          <Col span={6} className="flexbox justify--left items--center padding--right--l">
            <div className="display--block">
              <h2>A design system for the ed-tech ecosytem</h2>
              <p>As <a className="Button Button--linkPlain Button--regular" href="https://clever.com">Clever</a> grows into a mature product and company, a big challenge we have as a product organization is to create cohesive product experiences at scale that are accessible, usable, and effective for their intent.</p>
              <p>Dewey is our source of truth for UI and product design at Clever. Everyone working at Clever is encouraged to stay familiar with this design system and help ensure that it is kept up-to-date.</p>
            </div>
          </Col>
          <Col span={4} className="flexbox justify--left items--center">
            <Row grow>
              <Col span={12} className="flexbox justify--left margin--bottom--l">
                <div className="display--block">
                  <Icon size={Icon.sizes.LARGE} name={Icon.names.TYPEWRITER} />
                  <h3 className="text--light display--inline-block padding--left--m">Cohesive Experiences</h3>
                  <p>Create a system of coherent UI and interaction patterns to improve usability, visual consistency, and clarity instead of reinventing the radio button.</p>
                </div>
              </Col>
              <Col span={12} className="flexbox justify--left margin--bottom--l">
                <div className="display--block">
                  <Icon size={Icon.sizes.LARGE} name={Icon.names.WEBSITE_HTML} />
                  <h3 className="display--inline-block padding--left--m ">Faster Development</h3>
                  <p>Provide reusable utilities and components that accelerate the development of interfaces allowing us to focus on workflows and logic.</p>
                </div>
              </Col>
              <Col span={12} className="flexbox justify--left margin--bottom--l">
                <div className="display--block">
                  <Icon size={Icon.sizes.LARGE} name={Icon.names.PEN} />
                  <h3 className="text--light display--inline-block padding--left--m">Clear Documentation</h3>
                  <p>Showcase good examples for when to use which component or layout, and how to implement them.</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row grow>
          <Col span={12}>
            <h2>Frequently Asked Questions</h2>
          </Col>
        </Row>
        <Row grow>
          <Col span={6} className="flexbox justify--left padding--right--l">
            <div className="display--block">
              <h3>What if I'm not using React?</h3>
              <p>While it is highly recommended to use React for any new feature development or enhancement, it isn't always possible. In those cases, use the LESS mixins and styles to maintain consistency across our products.</p>
            </div>
          </Col>
          <Col span={6} className="flexbox justify--left padding--right--l">
            <div className="display--block">
              <h3>How do I contribute to Dewey?</h3>
              <p>Great question! If you're building a brand new component, check in with the #frontend slack channel to start the conversation. If you're improving an existing component or LESS file, just use the standard PR practice and <span className="text--italic">pick a frontend for PR</span>.</p>
            </div>
          </Col>
          <Col span={6} className="flexbox justify--left padding--right--l">
            <div className="display--block">
              <h3>What if I find a bug in Dewey?</h3>
              <p>If you can fix it quickly, go ahead and submit a quick bug fix PR. Otherwise, log a ticket in the <a className="Button Button--linkPlain Button--regular" href="https://clever.atlassian.net/secure/RapidBoard.jspa?rapidView=122">frontend board</a> referencing the component name and how to reproduce the bug.</p>
            </div>
          </Col>
          <Col span={6} className="flexbox justify--left padding--right--l">
            <div className="display--block">
              <h3>Why is it called Dewey?</h3>
              <p>Alice Chipman Dewey and John Dewey were highly influential figures in education, philosophy, and social movements in the early 20<sup>th</sup> century. We pay homage to their work and influence on the fields of design, information systems, and education.</p>
            </div>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

IntroView.cssClass = {
  CONTAINER: "IntroView",
};
