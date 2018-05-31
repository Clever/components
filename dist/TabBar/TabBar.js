"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TabBar;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _MorePropTypes = require("../utils/MorePropTypes");

var _MorePropTypes2 = _interopRequireDefault(_MorePropTypes);

var _Tab = require("./Tab");

var _Tab2 = _interopRequireDefault(_Tab);

var _flex = require("../flex");

require("./TabBar.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TabBar(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  var justify = _ref.justify;
  var size = _ref.size;
  var cssClass = TabBar.cssClass;


  return _react2.default.createElement(
    _flex.FlexBox,
    {
      className: (0, _classnames2.default)(cssClass.CONTAINER, cssClass.size(size), className),
      justify: justify
    },
    children
  );
}

TabBar.Tab = _Tab2.default;

TabBar.Size = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

TabBar.propTypes = {
  children: _MorePropTypes2.default.oneOrManyOf(_MorePropTypes2.default.instanceOfComponent(_Tab2.default)),
  className: PropTypes.string,
  justify: PropTypes.oneOf(_lodash2.default.values(_flex.Justify)),
  size: PropTypes.oneOf(_lodash2.default.values(TabBar.Size))
};

TabBar.defaultProps = {
  justify: _flex.Justify.START,
  size: TabBar.Size.MEDIUM
};

TabBar.cssClass = {
  CONTAINER: "TabBar",

  size: function size(s) {
    return "TabBar--" + s;
  }
};