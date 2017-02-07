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
            <h2>Naming and Structuring</h2>
            <p>Dewey uses a mix of BEM and Atomic CSS for naming conventions and structuring. It is influenced by&nbsp;
            <a href="http://basscss.com/">Basscss</a> for utility classes, while components are 
            written with a BEM notation.</p>

            <Example
                title="Variables"
                code={`
                    @zIndex--1: 100;
                `}
              >
              	Variables are the most atomic building blocks of Dewey. Each variable defines a single value for a 
            	specific attribute. Variables are lower-cased camelCase with a double dash <code>--</code> for modifiers.
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
            	that are readable and composable. Mixins are lower-cased camelCase with a double dash <code>--</code> 
            	between modifiers.
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
              	composable. Mixin functions are lower-cased camelCase with a double dash <code>--</code> 
            	between modifiers.
              </Example>

            <Example
                title="Components"
                code={`
					.TabBar--Tab--selected {
					  .text--medium;
					  .border--bottom--m(@primaryBlue);
					  box-sizing: border-box;
					  color: @primaryBlue;
					  cursor: pointer;
					}
                `}
              >
              	Components are composed of variables and mixins to define interactions for specific elements and UI 
              	patterns. Components use a title-cased CamelCase with a double dash <code>--</code> between
              	modifiers and descendants.
              </Example>

            <h3>IDs vs. Classes</h3>
			<p>You should almost never need to use IDs. Broken behavior due to ID collisions are hard to track 
			down and annoying.</p>

			<h2>Nesting</h2>
			<p>Nesting should be avoided except in the specific case where you are using state selectors,
			e.g. <code>:focus</code>, or pseudo-selectors, e.g. <code>::first-leter</code></p>

            <Example
                title=""
                code={`
					.TabBar {
					  transition: font-size .25s ease-out, box-shadow .25s ease-out;

					  .Tab {
					    .text--medium;
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
              </Example>

            <Example
                title=""
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
                title=""
                code={`
					.Alert .TabBar .TabBar--Tab {
					  .border--bottom--m(@alertRed);
					  color: @alertRed;
					}
                `}
            >
              	<strong>Incorrect specificity</strong>
            </Example>

            <Example
                title=""
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


          </Col>
        </Row>
      </Grid>
    </View>
  );
}

LessStyleGuideView.cssClass = {
  CONTAINER: "LessStyleGuideView",
};
