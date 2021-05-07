// import * as React from "react";
// import { shallow } from "enzyme";

// import * as MessagingAttachment from "./MessagingAttachment";
// import { Button } from "../Button/Button";

// describe("MessagingAttachment", () => {
//   const { cssClass } = MessagingAttachment;

//   const onPerformActionMock = jest.fn();

//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   it("renders", () => {
//     const myComponent = shallow(
//       <MessagingAttachment onPerformAction={onPerformActionMock}>Test Content</MessagingAttachment>,
//     );

//     // TODO: Verify basic structure/contents.
//     expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
//     expect(myComponent).toIncludeText("Test Content");
//     expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toExist();
//     expect(myComponent.find(Button)).toExist();
//   });

//   it("supports additional class names", () => {
//     const myComponent = shallow(
//       <MessagingAttachment className="my--custom--class" onPerformAction={onPerformActionMock}>
//         Test Content
//       </MessagingAttachment>,
//     );

//     expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
//     expect(myComponent.props().className).toMatch("my--custom--class");
//   });

//   // TODO: Test any relevant state changes/event handling/prop-driven rendering.
//   it("propagates event", () => {
//     const myComponent = shallow(
//       <MessagingAttachment onPerformAction={onPerformActionMock}>Test Content</MessagingAttachment>,
//     );

//     myComponent.find(Button).simulate("click");
//     expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
//   });
// });
