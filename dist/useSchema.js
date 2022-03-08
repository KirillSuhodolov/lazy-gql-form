"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildUseSchema = void 0;

var _ramda = require("ramda");

var _array = require("./array");

var buildUseSchema = function buildUseSchema(_ref) {
  var useMemo = _ref.useMemo;
  return function (schemaFn, isNew) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var memoArgs = (0, _ramda.flatten)([].concat(args, [isNew]));
    return useMemo(function () {
      return schemaFn.apply(void 0, args.concat([isNew]));
    }, memoArgs);
  };
}; // export default buildUseSchema


exports.buildUseSchema = buildUseSchema;