"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GqlError = function GqlError(_ref) {
  var error = _ref.error;
  return error ? /*#__PURE__*/_react["default"].createElement("div", {
    mt: 3,
    mb: 3
  }, JSON.stringify(error)) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};

var _default = GqlError;
exports["default"] = _default;