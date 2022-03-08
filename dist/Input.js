"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildInput = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var callWhenFn = function callWhenFn(prop) {
  return (0, _ramda.equals)((0, _ramda.type)(prop), 'Function') ? prop() : prop;
};

var buildInput = function buildInput(_ref) {
  var Controller = _ref.Controller,
      FormControl = _ref.FormControl,
      inputs = _ref.inputs;
  return function (_props) {
    var props = _objectSpread(_objectSpread({
      isLabel: true
    }, _props), {}, {
      label: _props.label || _props.placeholder,
      placeholder: _props.placeholder || _props.label,
      type: _props.hidden ? 'hidden' : callWhenFn(_props.type),
      disabled: callWhenFn(_props.disabled),
      hidden: callWhenFn(_props.hidden)
    });

    var name = props.name,
        isRequired = props.isRequired,
        control = props.control;
    var InputComponent = inputs[props.type] || inputs[(0, _ramda.keys)(inputs)[0]];
    return /*#__PURE__*/_react["default"].createElement(FormControl, {
      sx: _objectSpread({
        width: '100%'
      }, props.hidden ? {
        display: 'none'
      } : {})
    }, props.isLabel && /*#__PURE__*/_react["default"].createElement("label", null, " ", props.label, " "), /*#__PURE__*/_react["default"].createElement(Controller, {
      control: control,
      name: name,
      shouldUnregister: true,
      rules: {
        required: isRequired
      },
      render: function render(_ref2) {
        var field = _ref2.field;
        return /*#__PURE__*/_react["default"].createElement(InputComponent, _extends({}, (0, _ramda.omit)(['isLabel'], props), {
          field: field
        }));
      }
    }));
  };
};

exports.buildInput = buildInput;