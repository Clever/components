// import assert from "assert";
import React from "react";
// import sinon from "sinon";
import { shallow } from "enzyme";
import { MultiplePanelModals, Button } from "../src";

describe("MultiplePanelModals", () => {
  const panel1 = "Content of page 1";
  const panel2 = "Content of page 2";

  it("renders", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }]}
      />,
    );

    expect(myComponent.props().className).toMatch("MultiplePanelModals");
    expect(myComponent).toIncludeText("<Modal />");
    expect(myComponent.props().children.props.title).toMatch("page1");
  });

  it("renders to first page by default", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }, { title: "page2", panel: panel2 }]}
      />,
    );
    expect(myComponent.props().children.props.title).toMatch("page1");
  });

  it("renders to other pages by request", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }, { title: "page2", panel: panel1 }]}
        startingPanel={1}
      />,
    );

    expect(myComponent.props().children.props.title).toMatch("page2");
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }]}
        className="my--custom--class"
      />,
    );
    expect(myComponent.props().className).toMatch("MultiplePanelModals");
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  it("doesn't render an empty array", () => {
    const myComponent = shallow(<MultiplePanelModals closeModal={() => {}} componentArray={[]} />);

    expect(myComponent).not.toIncludeText("<Modal />");
  });

  it("doesn't render when start page > num pages", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }]}
        startingPanel={2}
      />,
    );

    expect(myComponent).not.toIncludeText("<Modal />");
  });

  it("disappears after clicking finish", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }]}
      />,
    );

    expect(myComponent).toIncludeText("<Modal />");

    myComponent
      .find(Button)
      .at(1)
      .simulate("click");

    expect(myComponent).not.toIncludeText("<Modal />");
  });

  it("moves to the next page upon clicking next.", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {}}
        componentArray={[{ title: "page1", panel: panel1 }, { title: "page2", panel: panel2 }]}
      />,
    );
    expect(myComponent.props().children.props.title).toMatch("page1");

    myComponent
      .find(Button)
      .at(1)
      .simulate("click");
    expect(myComponent.props().children.props.title).toMatch("page2");
  });
});
