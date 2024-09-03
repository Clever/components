import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";

import EditableInfoPanel from "../src/EditableInfoPanel";

describe("EditableInfoPanel", () => {
    it("uses default buttonProps and does not render tooltip when buttonProps and tooltipProps are not provided", () => {
        const wrapper = shallow(
            <EditableInfoPanel title="Title" onClick={() => null}>
                Content
            </EditableInfoPanel>,
        );
        assert.strictEqual(wrapper.find("Button").props().size, "small");
        assert.strictEqual(wrapper.find("Button").props().value, "Edit");
        assert.strictEqual(wrapper.find("Tooltip").length, 0);
    });
    
    it("uses buttonProps when provided", () => {
        const wrapper = shallow(
            <EditableInfoPanel
                title="Title"
                onClick={() => null}
                buttonProps={{size: "large", value: "New value!"}}
            >
                Content
            </EditableInfoPanel>,
        );
        assert.strictEqual(wrapper.find("Button").props().size, "large");
        assert.strictEqual(wrapper.find("Button").props().value, "New value!");
    });

    it("renders a tooltip when tooltipProps are provided", () => {
        const wrapper = shallow(
            <EditableInfoPanel
                title="Title"
                onClick={() => null}
                tooltipProps={{ content: "Tooltip content"}}
            >
                Content
            </EditableInfoPanel>,
        );
        assert.strictEqual(wrapper.find("Tooltip").length, 1);
    });
});