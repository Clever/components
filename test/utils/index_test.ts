import assert from "assert";
import { classNameFor } from "../../src/utils";

describe("utils", () => {
  describe("classNameFor", () => {
    it("prepends classnaems properly", () => {
      assert.equal(classNameFor("A"), "A");
      assert.equal(classNameFor("A", "x"), "A--x");
      assert.equal(classNameFor("A", ["x"]), "A--x");
      assert.equal(classNameFor("A", ["x", "y"]), "A--x--y");
      assert.equal(classNameFor(["A"]), "A");
      assert.equal(classNameFor(["A"], ["x"]), "A--x");
      assert.equal(classNameFor(["A"], ["x", "y"]), "A--x--y");
      assert.equal(classNameFor(["A", "B"]), "A B");
      assert.equal(classNameFor(["A", "B"], "x"), "A--x B--x");
      assert.equal(classNameFor(["A", "B"], ["x"]), "A--x B--x");
      assert.equal(classNameFor(["A", "B"], ["x", "y"]), "A--x--y B--x--y");
    });

    it("handles empty prefix input gracefully", () => {
      const testCases = [[], [undefined], [""], [null], [undefined, null, ""]];
      testCases.forEach(testCase => {
        assert.equal(classNameFor(testCase), "");
        assert.equal(classNameFor(testCase, "a"), "a");
        assert.equal(classNameFor(testCase, ["a"]), "a");
        assert.equal(classNameFor(testCase, ["a", "b"]), "a--b");
      });
    });
  });
});
