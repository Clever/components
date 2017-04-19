import React from "react";

import CodeSample from "./Example/CodeSample";
import View from "./View";
import {Grid} from "src";

export default function GettingStartedView() {
  const {cssClass} = GettingStartedView;
  const {Col, Row} = Grid;

  return (
    <View className={cssClass.CONTAINER} title="Getting Started">
      <Grid>
        <Row grow className="margin--bottom--xl">
          <Col span={6} className="self--start padding--right--l">
            <h2>Install</h2>
            <p>Install the NPM package and save it to your project using</p>
            <CodeSample>npm install --save clever-components</CodeSample>
            <p>
              Note: This library uses ES6 features not supported in Internet Explorer such as
              {" "}
              <a
                className="Button Button--linkPlain Button--regular"
                href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith"
              >
                String.startsWith
              </a>.
              {" "}
              To support use of this library in IE, include <code className="text--small">babel-polyfill</code>
              in the entrypoint to your application. See the&nbsp;
              <a
                className="Button Button--linkPlain Button--regular"
                href="https://babeljs.io/docs/usage/polyfill/"
              >
              docs
              </a>.
            </p>
            <hr />
            <h2>Usage</h2>
            <p>
              In order to maintain visual consistency across our product, we use the components and styles from
              this library whenever possible.
            </p>
            <h3>Components</h3>
            <p>
              To use a component, you'll need to be working with React and Webpack. Components that include
              their own styles may require you to install Webpack's style loaders. If this is configured
              correctly, you can simply <code className="text--small">require</code> these components like any
              other package:
            </p>
            <CodeSample>
              var Modal = require('clever-components').Modal; // ES5
              import &#123;Modal&#124; from 'clever-components'; // ES6
            </CodeSample>
            <hr />
            <h2>Styles</h2>
            <p>
              The components library exports a less file containing variables and classes for all of the styles
              outlined in the Design and LESS sections. To import these styles, just include the following line
              at the top of your less file:
            </p>
            <CodeSample>
              @import (reference) "~clever-components/dist/less/utilities";
            </CodeSample>
            <p>
              Note that by using <code className="text--small">(reference)</code>, you'll only import styles that
              you actually use, so it shouldn't bloat the resulting stylesheet.
            </p>
            <hr />
            <h2>Contributing</h2>
            <p>
              It's exciting to contribute to a project that helps scale work faster and easier. If you're
              interested in contributing to the design system, come by one of the frontend guild meetings or
              drop into the Slack channel.
            </p>
            <h3>Adding components</h3>
            <strong>When to add a component</strong>
            <ul className="text--line-height-4">
              <li>Is it a component that is in our to-build list?
                <ul>
                  <li>Toasts</li>
                  <li>Global Header</li>
                  <li>Alerts</li>
                  <li>Form elements (radio buttons, checkboxes)</li>
                </ul>
              </li>
              <li>Rule of 3: Copy and pasting it more than once? Is it being used in a few places?</li>
              <li>Can it be abstracted into a generalizable pattern?</li>
            </ul>
            <strong>How to add a component</strong>
            <ul className="text--line-height-4">
              <li>
                Run <code className="text--small">./bin/new_component &#60;your component&#62;</code> to
                autogenerate source and test stubs
              </li>
              <li>Use Example and Demo to document your component in /docs</li>
              <li>To run locally, run make dev-server and open http://localhost:8080/</li>
              <li>Use <code className="text--small">make test</code> to run tests locally</li>
              <li>Test cross-browser with Browserstack</li>
              <li>Open a PR, fill out the template, and assign it to someone in @frontend</li>
            </ul>
            <strong>Publishing</strong>
            <p>
              First, increment the version in <code className="text--small">package.json</code> according to
              semver. You can use the <code className="text--small">npm version</code> command (e.g.
              <code className="text--small">npm version major</code>).
            </p>
            <p>
              Then, when you merge your branch into <code className="text--small">master</code>, Drone will
              automatically build and publish a new version to npm.
            </p>
            <p>
              Last, deploy an updated version to docs using the <code className="text--small">deploy.sh</code> script.
            </p>
            <h3>Modifying components</h3>
            <p>
              The components in the design system are built to be reusable, however, if the use case you need
              it for isn't supported, we suggest extending an existing component if possible instead of
              making an entirely new one.
            </p>
            <strong>A word of caution</strong>
            <p>
              Components are used throughout Clever's products. Modifying an existing component can impact
              multiple applications and we don't currently have a good way to detect UI regressions.
              Testing must be done manually.
            </p>
            <ul className="text--line-height-4">
              <li>Search for usage of the component in our core repos</li>
              <li>Test cross-browser with Browserstack</li>
              <li>Breaking changes to a component or LESS file must be a major version bump</li>
              <li>Other repos must be updated to the new component version</li>
            </ul>
            <h3>Updating Documentation</h3>
            <p>
              After merging to master, you can update the live examples by running <code>make deploy-docs</code>:
              <CodeSample>
                sh
                git checkout master
                git pull
                make deploy-docs
              </CodeSample>
            </p>
            <h3>Testing</h3>
            <p>Run the entire test suite with <code>make test</code> or a single component with <code>make test/component_test.jsx</code></p>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}

GettingStartedView.cssClass = {
  CONTAINER: "GettingStartedView",
};
