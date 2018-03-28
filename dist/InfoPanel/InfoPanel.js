"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var PropTypes = _interopRequireWildcard(_propTypes);

var _reactFontawesome = require("react-fontawesome");

var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);

var _reactAccessibleAccordion = require("react-accessible-accordion");

require("./InfoPanel.less");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base presentational component for the displaying information in paneled format.
 */
var InfoPanel = function (_Component) {
  _inherits(InfoPanel, _Component);

  function InfoPanel(props) {
    _classCallCheck(this, InfoPanel);

    var _this = _possibleConstructorReturn(this, (InfoPanel.__proto__ || Object.getPrototypeOf(InfoPanel)).call(this, props));

    _this.state = {
      isCollapsed: !props.defaultOpen,
      collapseArrow: props.defaultOpen ? "caret-down" : "caret-right"
    };
    return _this;
  }

  _createClass(InfoPanel, [{
    key: "toggleArrow",
    value: function toggleArrow(keys) {
      this.setState({ isCollapsed: !(typeof keys !== "undefined") });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var children = _props.children;
      var className = _props.className;
      var title = _props.title;
      var footer = _props.footer;
      var collapsible = _props.collapsible;
      var defaultOpen = _props.defaultOpen;
      var isCollapsed = this.state.isCollapsed;
      var collapseArrow = this.state.collapseArrow;
      var cssClass = InfoPanel.cssClass;


      if (!collapsible) {
        return _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)(cssClass.CONTAINER, className) },
          _react2.default.createElement(
            "div",
            { className: cssClass.HEADER },
            _react2.default.createElement(
              "h4",
              { className: cssClass.TITLE },
              title
            )
          ),
          _react2.default.createElement(
            "div",
            { className: cssClass.CONTENT },
            children
          ),
          footer && _react2.default.createElement(
            "div",
            { className: cssClass.FOOTER },
            footer
          )
        );
      }

      if (isCollapsed) {
        collapseArrow = "caret-right";
      } else {
        collapseArrow = "caret-down";
      }

      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(cssClass.CONTAINER, className) },
        _react2.default.createElement(
          _reactAccessibleAccordion.Accordion,
          { onChange: function onChange(keys) {
              return _this2.toggleArrow(keys);
            } },
          _react2.default.createElement(
            _reactAccessibleAccordion.AccordionItem,
            { expanded: defaultOpen },
            _react2.default.createElement(
              _reactAccessibleAccordion.AccordionItemTitle,
              { className: cssClass.COLLAPSIBLE_HEADER },
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "div",
                  { className: cssClass.COLLAPSE_ARROW },
                  _react2.default.createElement(_reactFontawesome2.default, { name: collapseArrow })
                ),
                _react2.default.createElement(
                  "div",
                  { className: cssClass.COLLAPSIBLE_TITLE },
                  title
                )
              )
            ),
            _react2.default.createElement(
              _reactAccessibleAccordion.AccordionItemBody,
              null,
              _react2.default.createElement(
                "div",
                { className: cssClass.CONTENT },
                children
              ),
              footer && _react2.default.createElement(
                "div",
                { className: cssClass.FOOTER },
                footer
              )
            )
          )
        )
      );
    }
  }]);

  return InfoPanel;
}(_react.Component);

exports.default = InfoPanel;


InfoPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  footer: PropTypes.node,
  collapsible: PropTypes.bool,
  defaultOpen: PropTypes.bool
};

InfoPanel.cssClass = {
  CONTAINER: "InfoPanel",
  FOOTER: "InfoPanel--footer",
  TITLE: "InfoPanel--title",
  HEADER: "InfoPanel--header",
  CONTENT: "InfoPanel--content",
  COLLAPSE_ARROW: "InfoPanel--collapseArrow",
  COLLAPSIBLE_TITLE: "InfoPanel--collapsibleTitle",
  COLLAPSIBLE_HEADER: "InfoPanel--collapsibleHeader"
};