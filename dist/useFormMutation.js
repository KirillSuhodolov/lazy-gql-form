"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUseFormMutation = void 0;

var _form = require("./form");

var _ramda = require("ramda");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var buildUseFormMutation = function buildUseFormMutation(_ref) {
  var useMutation = _ref.useMutation;
  return function (schema, mutation, closeModal) {
    var update = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

    var _useMutation = useMutation(mutation, {
      onCompleted: closeModal,
      update: update
    }),
        _useMutation2 = _slicedToArray(_useMutation, 2),
        save = _useMutation2[0],
        _useMutation2$ = _useMutation2[1],
        loading = _useMutation2$.loading,
        error = _useMutation2$.error;

    var onSubmit = function onSubmit(data) {
      var requestBody = (0, _form.buildRequesBody)(schema, data);
      save.apply(void 0, _toConsumableArray((0, _ramda.values)(requestBody[schema.tableName])));
    };

    return [onSubmit, loading, error];
  };
}; // export default buildUseFormMutation


exports.buildUseFormMutation = buildUseFormMutation;