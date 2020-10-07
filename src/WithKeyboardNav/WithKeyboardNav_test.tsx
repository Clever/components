import * as React from "react";
import { mount } from "enzyme";

import KeyCode from "../utils/KeyCode";
import WithKeyboardNav from "./WithKeyboardNav";

const TEST_CONTENT = <div>Test content</div>;
const ITEM_IDS = ["option 1", "option 2", "option 3"];

describe("WithKeyboardNav", () => {
  const onChangeMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders given child", () => {
    const wrapper = mount(
      <WithKeyboardNav itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(wrapper).toContainReact(TEST_CONTENT);
  });

  it("navigates forward by default on arrow right", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[1]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_RIGHT });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[2]);
  });

  it("navigates forward by default on arrow down", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[1]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_DOWN });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[2]);
  });

  it("navigates backward by default on arrow left", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[1]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_LEFT });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[0]);
  });

  it("navigates backward by default on arrow up", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[1]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_UP });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[0]);
  });

  it("is no-op on TAB key by default", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[1]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    simulateKeyDownEvent(wrapper, { key: KeyCode.TAB });
    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.TAB, shiftKey: true });
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("navigates forward on TAB if explicitly capturing", () => {
    const wrapper = mount(
      <WithKeyboardNav
        currentID={ITEM_IDS[1]}
        itemIDs={ITEM_IDS}
        onChange={onChangeMock}
        forceTabKey
      >
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.TAB });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[2]);
  });

  it("navigates backward on shift+TAB if explicitly capturing", () => {
    const wrapper = mount(
      <WithKeyboardNav
        currentID={ITEM_IDS[1]}
        itemIDs={ITEM_IDS}
        onChange={onChangeMock}
        forceTabKey
      >
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.TAB, shiftKey: true });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[0]);
  });

  it("wraps to beginning on forward nav at the last item", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[2]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_RIGHT });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[0]);
  });

  it("wraps to end on backward nav at the first item", () => {
    const wrapper = mount(
      <WithKeyboardNav currentID={ITEM_IDS[0]} itemIDs={ITEM_IDS} onChange={onChangeMock}>
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_LEFT });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[2]);
  });

  it("supports custom nav keys", () => {
    const wrapper = mount(
      <WithKeyboardNav
        currentID={ITEM_IDS[1]}
        itemIDs={ITEM_IDS}
        onChange={onChangeMock}
        forwardKeys={[KeyCode.K]}
        backKeys={[KeyCode.J]}
      >
        {TEST_CONTENT}
      </WithKeyboardNav>,
    );

    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_RIGHT });
    simulateKeyDownEvent(wrapper, { key: KeyCode.ARROW_LEFT });
    expect(onChangeMock).not.toHaveBeenCalled();

    simulateKeyDownEvent(wrapper, { key: KeyCode.J });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[0]);

    onChangeMock.mockReset();

    simulateKeyDownEvent(wrapper, { key: KeyCode.K });
    expect(onChangeMock).toHaveBeenCalledWith(ITEM_IDS[2]);
  });
});

function simulateKeyDownEvent(wrapper, { key, shiftKey = false }) {
  wrapper.find("div").getDOMNode().dispatchEvent(new KeyboardEvent("keydown", { key, shiftKey }));
}
