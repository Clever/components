import React from "react";

import View from "./View";
import {Icon} from "src";
import {Grid} from "src";

export default function IntroView() {
  const {cssClass} = IntroView;
  const {Col, Row} = Grid;

  return (
    <View className={cssClass.CONTAINER} title="Say &ldquo;Hi!&rdquo; to Dewey">
      <Grid>
        <Row grow className="margin--bottom--xl">
          <Col span={6} className="flexbox self--center padding--right--xl">
            <div>
              <h2>A design system for the ed-tech ecosytem</h2>
              <p>As&nbsp;
              <a 
                className="Button Button--linkPlain Button--regular" 
                href="https://clever.com">
                Clever
              </a>
                &nbsp;grows into a mature product and company, a big challenge we have as a product organization is to
                create cohesive product experiences at scale that are accessible, usable, and effective for their intent.</p>
              <p>Dewey is our source of truth for UI and product design at Clever. Everyone working at Clever
                 is encouraged to stay familiar with this design system and help ensure that it is kept up-to-date.</p>
            </div>
          </Col>
          <Col span={3} className="flexbox">
            <img src="./assets/img/deweyFox.svg" alt="Dewey the mascot for the design system" />
          </Col>
          <Row grow className="margin--top--xl">
            <Col span={4} className="flexbox padding--right--xl">
              <div>
                <Icon size={Icon.sizes.LARGE} name={Icon.names.TYPEWRITER} />
                <h3 className="text--light display--inlineBlock padding--left--m">Cohesive experiences</h3>
                <p>Create a system of coherent UI and interaction patterns to improve usability, visual
                   consistency, and clarity instead of reinventing the radio button.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox padding--right--xl">
              <div>
                <Icon size={Icon.sizes.LARGE} name={Icon.names.WEBSITE_HTML} />
                <h3 className="display--inlineBlock padding--left--m ">Faster development</h3>
                <p>Provide reusable utilities and components that accelerate the development of interfaces
                   allowing us to focus on workflows and logic.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox padding--right--xl">
              <div>
                <Icon size={Icon.sizes.LARGE} name={Icon.names.PEN} />
                <h3 className="text--light display--inlineBlock padding--left--m">Clear documentation</h3>
                <p>Showcase good examples for when to use which component or layout, and how to implement them.</p>
              </div>
            </Col>
          </Row>
        </Row>
        <Row grow>
          <Col span={12}>
            <h2>Frequently Asked Questions</h2>
          </Col>
        </Row>
        <Row grow>
          <Col span={6} className="flexbox padding--right--l">
            <div>
              <h3>What if I'm not using React?</h3>
              <p>While it is highly recommended to use React for any new feature development or enhancement,
                 it isn't always possible. In those cases, use the LESS mixins and styles to maintain consistency
                 across our products.</p>
            </div>
          </Col>
          <Col span={6} className="flexbox padding--right--l">
            <div>
              <h3>How do I contribute to Dewey?</h3>
              <p>Great question! If you're building a brand new component, check in with the #frontend slack
                 channel to start the conversation. If you're improving an existing component or LESS file, just
                 use the standard PR practice and <span className="text--italic">pick a frontend for PR</span>.</p>
            </div>
          </Col>
          <Col span={6} className="flexbox padding--right--l">
            <div>
              <h3>What if I find a bug in Dewey?</h3>
              <p>If you can fix it quickly, go ahead and submit a quick bug fix PR. Otherwise, log a ticket in
                 the&nbsp;
                <a 
                  className="Button Button--linkPlain Button--regular" 
                  href="https://clever.atlassian.net/secure/RapidBoard.jspa?rapidView=122">
                  frontend board
                </a>
                 &nbsp;referencing the component name and how to reproduce the bug.</p>
            </div>
          </Col>
          <Col span={6} className="flexbox padding--right--l">
            <div>
              <h3>Why is it called Dewey?</h3>
              <p>Alice Chipman Dewey and John Dewey were highly influential figures in education, philosophy, and social
                 movements in the early 20<sup>th</sup> century. We pay homage to their work and influence on the fields
                 of design, information systems, and education.</p>
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
