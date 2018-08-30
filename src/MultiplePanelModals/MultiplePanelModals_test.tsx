import {Button} from "../Button/Button";
import {shallow} from "enzyme";
import * as React from "react";

import MultiplePanelModals, {Classes} from "./MultiplePanelModals";

describe("MultiplePanelModals", () => {
  const panel1 = <p>Content of page 1</p>;
  const panel2 = <p>Content of page 2</p>;

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}]}
      />,
    );

    expect(myComponent.props().className).toMatch(Classes.CONTAINER);
    expect(myComponent).toIncludeText("<Modal />");
    expect(myComponent.find(Button)).toBePresent();
    expect(myComponent.props().children.props.title).toMatch("page1");
  });

  it("renders to first page by default", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}, {title: "page2", panel: panel2}]}
      />,
    );

    expect(myComponent.props().children.props.title).toMatch("page1");
  });

  it("renders to other pages by request", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}, {title: "page2", panel: panel2}]}
        startingPanel={1}
      />,
    );

    expect(myComponent.props().children.props.title).toMatch("page2");
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}]}
        className="my--custom--class"
      />,
    );
    expect(myComponent.props().className).toMatch(Classes.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  it("doesn't render an empty array", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[]}
      />,
    );

    expect(myComponent).not.toIncludeText("<Modal />");
  });

  it("doesn't render when start page > num pages", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}]}
        startingPanel={2}
      />,
    );

    expect(myComponent).not.toIncludeText("<Modal />");
  });

  it("disappears after clicking finish", () => {
    const myComponent = shallow(
      <MultiplePanelModals
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}]}
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
        closeModal={() => {
          return;
        }}
        onClickLater={() => {
          return;
        }}
        componentArray={[{title: "page1", panel: panel1}, {title: "page2", panel: panel2}]}
      />,
    );
    expect(myComponent.props().children.props.title).toMatch("page1");
    // Expect that the content displayed matches panel 1's content.
    expect(myComponent.props().children.props.children[0].props.children.props.children).toMatch(
        "Content of page 1",
    );

    myComponent
      .find(Button)
      .at(1)
      .simulate("click");
    expect(myComponent.props().children.props.title).toMatch("page2");
    // Expect that the content displayed matches panel 2's content.
    expect(
      myComponent.props().children.props.children[0].props.children.props.children.props.children,
    ).toMatch("Content of page 2");
  });
});
