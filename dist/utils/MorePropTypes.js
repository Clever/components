"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MorePropTypes = function () {
  function MorePropTypes() {
    _classCallCheck(this, MorePropTypes);
  }

  _createClass(MorePropTypes, null, [{
    key: "makeRequirable",
    value: function makeRequirable(propType) {
      propType.isRequired = function (props, propName, componentName) {
        var value = props[propName];
        if (value === null || value === undefined) {
          return new Error("Missing required prop `" + propName + "` in " + componentName + ".");
        }

        return propType(props, propName, componentName);
      };

      return propType;
    }
  }, {
    key: "instanceOfComponent",
    value: function instanceOfComponent(componentClass) {
      return MorePropTypes.makeRequirable(function (props, propName, parentComponentName) {
        var value = props[propName];

        if (!value) {
          return null;
        }

        if (value.type !== componentClass) {
          return new Error("Invalid prop `" + propName + "` supplied to " + parentComponentName + ". " + ("Must be of type " + componentClass + "."));
        }

        return null;
      });
    }
  }, {
    key: "oneOrManyOf",
    value: function oneOrManyOf(propType) {
      return PropTypes.oneOfType([propType, PropTypes.arrayOf(propType)]);
    }
  }]);

  return MorePropTypes;
}();

exports.default = MorePropTypes;