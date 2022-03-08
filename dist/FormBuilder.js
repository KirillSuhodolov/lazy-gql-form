"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildFormBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var _form = require("./form");

var _GqlError = _interopRequireDefault(require("./GqlError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var buildFormBuilder = function buildFormBuilder(_ref) {
  var useForm = _ref.useForm,
      FormWrapper = _ref.FormWrapper,
      StateButton = _ref.StateButton,
      useFormMutation = _ref.useFormMutation,
      useSchema = _ref.useSchema,
      renderModelWithColumns = _ref.renderModelWithColumns;
  return function (_ref2) {
    var objects = _ref2.objects,
        schemaFn = _ref2.schemaFn,
        _ref2$schemaArgs = _ref2.schemaArgs,
        schemaArgs = _ref2$schemaArgs === void 0 ? [] : _ref2$schemaArgs,
        closeModal = _ref2.closeModal,
        mutation = _ref2.mutation,
        _ref2$update = _ref2.update,
        update = _ref2$update === void 0 ? function () {} : _ref2$update;
    var isNew = !(0, _ramda.prop)('id', (0, _ramda.values)(objects)[0][0]); // const schema = schemaFn(isNew)

    var schema = useSchema.apply(void 0, [schemaFn, isNew].concat(_toConsumableArray(schemaArgs)));
    var defaultValues = isNew ? (0, _form.buildDefaultStruct)(schema) : (0, _form.pickDataForForm)(schema, objects);

    var _useForm = useForm({
      defaultValues: defaultValues
    }),
        handleSubmit = _useForm.handleSubmit,
        register = _useForm.register,
        unregister = _useForm.unregister,
        setValue = _useForm.setValue,
        control = _useForm.control,
        errors = _useForm.formState.errors;

    var _useFormMutation = useFormMutation(schema, mutation, closeModal, update),
        _useFormMutation2 = _slicedToArray(_useFormMutation, 3),
        onSubmit = _useFormMutation2[0],
        loading = _useFormMutation2[1],
        error = _useFormMutation2[2];

    return /*#__PURE__*/_react["default"].createElement(FormWrapper, null, /*#__PURE__*/_react["default"].createElement("form", {
      onSubmit: handleSubmit(onSubmit)
    }, /*#__PURE__*/_react["default"].createElement(_GqlError["default"], {
      error: error
    }), renderModelWithColumns(defaultValues, {
      setValue: setValue,
      register: register,
      unregister: unregister,
      control: control,
      isNew: isNew
    })(schema), /*#__PURE__*/_react["default"].createElement(_GqlError["default"], {
      error: error
    }), /*#__PURE__*/_react["default"].createElement(StateButton, {
      loading: loading,
      variant: "contained"
    })));
  };
}; // export default buildFormBuilder


exports.buildFormBuilder = buildFormBuilder;