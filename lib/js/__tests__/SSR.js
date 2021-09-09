"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _Carousel = _interopRequireDefault(require("../components/Carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('SSR', function () {
  it('should be able to render the component without throwing', function () {
    expect(function () {
      return _server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(_Carousel.default, null, /*#__PURE__*/_react.default.createElement("img", {
        src: "assets/1.jpeg",
        key: "1"
      }), /*#__PURE__*/_react.default.createElement("img", {
        src: "assets/2.jpeg",
        key: "2"
      })));
    }).not.toThrow();
  });
});