import React from "react";

import Example from "./Example";
import View from "./View";
import {Grid} from "src";


export default function LessStyleGuideView() {
  const {cssClass} = LessStyleGuideView;
  const {Col, Row} = Grid;

  return (
    <View className={cssClass.CONTAINER} title="Less Style Guide">
      <Grid>
        <Row grow className="margin--bottom--xl">
          <Col span={6} className="self--start padding--right--l">
            <h2>Naming Conventions</h2>
            <p>Dewey uses a mix of BEM and Atomic CSS for naming conventions. It is influenced by&nbsp;
            <a href="http://basscss.com/">Basscss</a> for utility classes, while components are
            written with a BEM notation.</p>

            <Example
              title="Variables"
              code={`
                  @zIndex--1: 100;
              `}
            >
              Variables are the most atomic building blocks of Dewey. Each variable defines a single value for a
              specific attribute. Variables are camelCase with a double dash <code>--</code> for modifiers.
            </Example>

            <Example
              title="Mixins"
              code={`
                .text--bold {
                   font-weight: bold;
                   font-style: normal;
                }
              `}
            >
              Mixins are the next layer of Dewey, they assemble attributes into meaningfully grouped elements
              that are readable and composable. Mixins are camelCase with a double dash <code>--</code> between
              modifiers.
            </Example>

            <Example
              title="Mixin functions"
              code={`
                .border--x--s(@color) {
                  .border--left--s(@color);
                  .border--right--s(@color);
                }
              `}
            >
              We use mixin functions for more complex attribute collections that should be similarly reusable and
              composable. Mixin functions are camelCase with a double dash <code>--</code> between modifiers.
            </Example>

            <Example
              title="Components"
              code={`
                .TabBar--Tab--selected {
                  .text--bold;
                  .border--bottom--m(@primaryBlue);
                  box-sizing: border-box;
                  color: @primaryBlue;
                  cursor: pointer;
                }
              `}
            >
              Components are composed of variables and mixins to define interactions for specific elements and UI
              patterns. Components use PascalCase with a double dash <code>--</code> between modifiers and descendants.
            </Example>

            <h3>IDs vs. Classes</h3>
            <p>You should almost never need to use IDs. Broken behavior due to ID collisions are hard to track
            down and annoying.</p>

            <h2>Attributes and Units</h2>
            <p>Dewey is designed to be a scalable and maintainable LESS system. We do this by using relying
            heavily on mixins and variables to declare attributes and their values so that if something
            changes at the base level with a variable or mixin, that change cascades correctly throughout
            the system.</p>

            <p>Size variables are set in REM units to ensure that all scale respectively across media queries
            and text-resizing for accessibility. Where a sizing variable doesn't exist to fit your needs use
            REM units, or in rare cases EM units. REM units are relative to the size of the HTML (root)
            element, while EM units are relative sized to their parent elements font-size.</p>

            <p>All of the colors are encoded into a set of variables which should be referenced as variables.
            There are also a set of shade and tint mixin functions for variations on the core colors.</p>

            <Example
              code={`
                .Header--StatusBox {
                  font-size: 16px;
                  font-weight: bold;
                  padding: 16px 24px;
                  border: 1px solid #01D59A;
                  color: #191926;
                }
              `}
            >
              <strong>Incorrect usage</strong>
              <p>The hardcoded values on attributes in this example make the styling for this element
              difficult to maintain as the overall design system changes and evolves.</p>
            </Example>

            <Example
              code={`
                .Header--StatusBox {
                  .padding--x--m;
                  .padding--y--l;
                  .text--bold;
                  .text--medium;
                  .border--s(@alertGreen);
                  color: @neutralBlack;
                }
              `}
            >
              <strong>Correct usage</strong>
              <p>Mixins are primarily used, while variables are used in cases that don't have a mixin.
              This styling will automatically adjust based on updates to the core variables and styles.</p>
            </Example>

            <h2>Nesting</h2>
            <p>Nesting should be avoided except in the specific case where you are using state selectors,
            e.g. <code>:focus</code>, or pseudo-selectors, e.g. <code>::first-leter</code></p>

            <Example
              code={`
                .TabBar {
                  transition: font-size .25s ease-out, box-shadow .25s ease-out;

                  .Tab {
                    .text--bold;
                    .border--bottom--m(transparent);
                    box-sizing: border-box;
                    color: @neutral-dark-gray;
                    cursor: pointer;
                  }
                  .Tab:hover {
                    color: @primaryBlue;
                    .border--bottom--m(@primaryBlue);
                  }
                }
              `}
            >
              <strong>Incorrect nesting</strong>
              <p>When selectors become this long, you're likely writing CSS that is:
                <ul>
                  <li>Strongly coupled to the HTML (fragile) —OR—</li>
                  <li>Overly specific (powerful) —OR—</li>
                  <li>Not reusable</li>
                </ul>
              </p>
            </Example>

            <Example
              code={`
                .TabBar {
                  transition: font-size .25s ease-out, box-shadow .25s ease-out;
                }

                .TabBar--Tab {
                  .text--medium;
                  .border--bottom--m(transparent);
                  box-sizing: border-box;
                  color: @neutral-dark-gray;
                  cursor: pointer;

                  &:hover {
                    color: @primaryBlue;
                    .border--bottom--m(@primaryBlue);
                  }
                }
              `}
            >
              <strong>Correct nesting</strong>
            </Example>

            <h2>Specificity</h2>
            <p>To encourage a maintainable and scalable LESS architecture, avoid specificity beyond one
            selector in 99% of cases. Over specificity reduces performance, makes debugging more difficult,
            and diverges from the goals of the design system.</p>

            <Example
              code={`
                .Alert .TabBar .TabBar--Tab {
                  .border--bottom--m(@alertRed);
                  color: @alertRed;
                }
              `}
            >
              <strong>Incorrect specificity</strong>
              <p>When selectors become this long, you're likely writing CSS that is:
                <ul>
                  <li>Strongly coupled to the HTML (fragile) —OR—</li>
                  <li>Overly specific (powerful) —OR—</li>
                  <li>Not reusable</li>
                </ul>
              </p>
            </Example>

            <Example
              code={`
                .TabBar--Tab--alert {
                  .border--bottom--m(@alertRed);
                  color: @alertRed;
                }
              `}
            >
              <p><strong>Correct specificity</strong></p>
              <p>Create a specific class to override the colors of a Tab that you want
              to have an Alert state and apply it where needed.</p>
            </Example>

            <h2>Formatting</h2>
            <p>Following the rest of our guidelines for code, please use spaces for indention. An indent
            should be 2 spaces.</p>

          </Col>
        </Row>
      </Grid>
    </View>
  );
}

LessStyleGuideView.cssClass = {
  CONTAINER: "LessStyleGuideView",
};
