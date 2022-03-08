"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  buildForm: true
};
exports.buildForm = void 0;

var _FormBuilder = require("./FormBuilder");

Object.keys(_FormBuilder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _FormBuilder[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FormBuilder[key];
    }
  });
});

var _form = require("./form");

Object.keys(_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _form[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _form[key];
    }
  });
});

var _useFormMutation = require("./useFormMutation");

Object.keys(_useFormMutation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useFormMutation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useFormMutation[key];
    }
  });
});

var _useSchema = require("./useSchema");

Object.keys(_useSchema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSchema[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _useSchema[key];
    }
  });
});

var _Input = require("./Input");

var _react = _interopRequireDefault(require("react"));

var _excluded = ["field"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultProps = {
  Grid: function Grid(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/_react["default"].createElement("div", null, children);
  },
  Wrapper: function Wrapper(_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/_react["default"].createElement("div", null, children);
  },
  DeleteIcon: function DeleteIcon() {
    return /*#__PURE__*/_react["default"].createElement("div", null, "delete");
  },
  AddButton: function AddButton(_ref3) {
    var label = _ref3.label;
    return /*#__PURE__*/_react["default"].createElement("div", null, "add ", label);
  },
  FormControl: function FormControl(_ref4) {
    var children = _ref4.children;
    return /*#__PURE__*/_react["default"].createElement("div", null, children);
  },
  inputs: {
    string: function string(_ref5) {
      var field = _ref5.field,
          props = _objectWithoutProperties(_ref5, _excluded);

      return /*#__PURE__*/_react["default"].createElement("input", _extends({}, props, field));
    }
  },
  FormWrapper: function FormWrapper(_ref6) {
    var children = _ref6.children;
    return /*#__PURE__*/_react["default"].createElement("div", null, children);
  },
  StateButton: function StateButton(_ref7) {
    var loading = _ref7.loading;
    return /*#__PURE__*/_react["default"].createElement("button", {
      type: "submit"
    }, "save ", loading);
  }
};

var buildForm = function buildForm(_props) {
  var _defaultProps$_props = _objectSpread(_objectSpread({}, defaultProps), _props),
      Grid = _defaultProps$_props.Grid,
      DeleteIcon = _defaultProps$_props.DeleteIcon,
      AddButton = _defaultProps$_props.AddButton,
      FormControl = _defaultProps$_props.FormControl,
      inputs = _defaultProps$_props.inputs,
      FormWrapper = _defaultProps$_props.FormWrapper,
      Wrapper = _defaultProps$_props.Wrapper,
      StateButton = _defaultProps$_props.StateButton,
      useMutation = _defaultProps$_props.useMutation,
      useMemo = _defaultProps$_props.useMemo,
      useFieldArray = _defaultProps$_props.useFieldArray,
      useForm = _defaultProps$_props.useForm,
      Controller = _defaultProps$_props.Controller;

  var useFormMutation = (0, _useFormMutation.buildUseFormMutation)({
    useMutation: useMutation
  });
  var useSchema = (0, _useSchema.buildUseSchema)({
    useMemo: useMemo
  });
  var Input = (0, _Input.buildInput)({
    Controller: Controller,
    FormControl: FormControl,
    inputs: inputs
  });
  var renderModelWithColumns = (0, _form.buildRenderModelWithColumns)({
    Grid: Grid,
    Wrapper: Wrapper,
    DeleteIcon: DeleteIcon,
    AddButton: AddButton,
    useFieldArray: useFieldArray,
    Input: Input
  });
  var FormBuilder = (0, _FormBuilder.buildFormBuilder)({
    useForm: useForm,
    FormWrapper: FormWrapper,
    StateButton: StateButton,
    useFormMutation: useFormMutation,
    useSchema: useSchema,
    renderModelWithColumns: renderModelWithColumns
  });
  return FormBuilder;
};

exports.buildForm = buildForm;