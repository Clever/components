/**
 * Defines the React Adapter for Enzyme.
 *
 * @link http://airbnb.io/enzyme/docs/installation
 * @copyright 2017 Airbnb, Inc.
 */

require("core-js");
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
