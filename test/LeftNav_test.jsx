import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";
import {LeftNav} from "../src";

describe("LeftNav", () => {
  it("renders (something)", () => {
    /*
       Write tests here that assert qualities about
       LeftNav's type, classes, properties,
       and event handling.

       Refer to enzyme's API and examples for Mocha:
       http://airbnb.io/enzyme/

       Refer to sinon's API for mocking event functions:
       http://sinonjs.org/docs/
    */

// no group open, nothing selected      -> drawer closed, no visual selected
// no group open, top link selected     -> drawer closed, link visually selected
// no group open, sub link selected     -> drawer open to group, group visually open, link visually selected
// group open, sub link selected        -> drawer open to group, group visually open, link visually selected
// group open, top link selected        -> drawer open to group, group visually open, link visually selected
// group open, nothing selected         -> drawer open to group, group visually selected
// group open, hidden sub link selected -> drawer open to group, group visually selected

  });
});
