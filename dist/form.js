"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDataSchema = exports.pickDataForForm = exports.buildRequesBody = exports.buildRenderModelWithColumns = exports.buildDefaultStruct = void 0;

var _react = _interopRequireDefault(require("react"));

var _ramda = require("ramda");

var _array = require("./array");

var _ramdaAdjunct = require("ramda-adjunct");

var _pluralize = require("pluralize");

var _strings = require("./strings");

var _excluded = ["className", "isNew", "tableName", "field", "name"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var dataSchema = {};

var setDataSchema = function setDataSchema(data) {
  return dataSchema = data;
};

exports.setDataSchema = setDataSchema;

var buildRenderModelWithColumns = function buildRenderModelWithColumns(_ref) {
  var Wrapper = _ref.Wrapper,
      Grid = _ref.Grid,
      DeleteIcon = _ref.DeleteIcon,
      AddButton = _ref.AddButton,
      useFieldArray = _ref.useFieldArray,
      Input = _ref.Input;

  var FormInput = function FormInput(_ref2) {
    var className = _ref2.className,
        isNew = _ref2.isNew,
        tableName = _ref2.tableName,
        field = _ref2.field,
        name = _ref2.name,
        props = _objectWithoutProperties(_ref2, _excluded);

    var params = (0, _ramda.omit)((0, _strings.w)('isSelf default isLabel setValue register unregister'), _objectSpread(_objectSpread({}, dataSchema[(0, _pluralize.plural)(tableName)][field]), props));
    return /*#__PURE__*/_react["default"].createElement(Wrapper, {
      mb: 3,
      className: className
    }, /*#__PURE__*/_react["default"].createElement(Input, _extends({}, params, {
      name: name,
      label: params.label || field
    })));
  };

  var FormRelationInput = function FormRelationInput(_ref3) {
    var props = _ref3.props,
        item = _ref3.item,
        name = _ref3.name,
        schema = _ref3.schema,
        parentTableName = _ref3.parentTableName;

    var _mergeSchemasParts = mergeSchemasParts(schema, parentTableName),
        tableName = _mergeSchemasParts.tableName,
        direction = _mergeSchemasParts.direction,
        columns = _mergeSchemasParts.columns,
        relations = _mergeSchemasParts.relations,
        isSelf = _mergeSchemasParts.isSelf;

    return /*#__PURE__*/_react["default"].createElement(Grid, {
      container: true,
      direction: (0, _ramda.defaultTo)('row')(direction),
      className: "form-relation-input"
    }, (0, _ramda.addIndex)(_ramda.map)(function (column, idx) {
      return /*#__PURE__*/_react["default"].createElement(Grid, {
        item: true,
        xs: (0, _ramda.equals)(direction, 'row') ? 12 / (0, _ramda.length)(columns) : 12,
        key: "".concat(tableName, "-").concat(idx)
      }, /*#__PURE__*/_react["default"].createElement(FormInput, _extends({}, props, column, {
        key: "".concat(tableName, "-").concat(isSelf ? name : column.field),
        tableName: tableName,
        record: item,
        field: column.field,
        name: isSelf ? name : "".concat(name, ".").concat(column.field)
      })));
    })(prepareHashColumns(columns)), (0, _ramda.map)(renderModelWithColumns(item, props, name, tableName))((0, _ramda.defaultTo)([])(relations)));
  };

  var renderModelWithColumns = function renderModelWithColumns(record, props) {
    var parentPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var parentTableName = arguments.length > 3 ? arguments[3] : undefined;
    return function (schema) {
      var _mergeSchemasParts2 = mergeSchemasParts(schema, parentTableName),
          tableName = _mergeSchemasParts2.tableName,
          direction = _mergeSchemasParts2.direction,
          canAdd = _mergeSchemasParts2.canAdd,
          canRemove = _mergeSchemasParts2.canRemove;

      var control = props.control;
      var relationTableName = relationKey(tableName, parentTableName);
      var label = schema.label || (parentTableName ? (0, _ramda.path)([(0, _pluralize.plural)(parentTableName || ''), tableName, 'label'], dataSchema) : '');

      var renderForm = function renderForm(item, name, idx) {
        return /*#__PURE__*/_react["default"].createElement(FormRelationInput, {
          parentTableName: parentTableName,
          schema: schema,
          key: "".concat(name, "-").concat(idx),
          props: props,
          item: item,
          name: name
        });
      };

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "render-form",
        key: tableName,
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement("label", null, label), (0, _ramda.compose)((0, _ramda.ifElse)(function () {
        return isCollection(tableName, parentTableName);
      }, function () {
        var keyName = 'formId';

        var _useFieldArray = useFieldArray({
          control: control,
          keyName: keyName,
          name: "".concat(parentPath, ".").concat(relationTableName)
        }),
            fields = _useFieldArray.fields,
            remove = _useFieldArray.remove,
            append = _useFieldArray.append;

        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _ramda.addIndex)(_ramda.map)(function (item, idx) {
          return /*#__PURE__*/_react["default"].createElement(Grid, {
            container: true,
            direction: (0, _ramda.defaultTo)('row')(direction),
            key: "".concat(parentPath, ".").concat(relationTableName, ".").concat(idx)
          }, /*#__PURE__*/_react["default"].createElement(Grid, {
            item: true,
            xs: (0, _ramda.defaultTo)(false)(canRemove) ? 11 : 12
          }, renderForm((0, _ramda.omit)([keyName])(item), "".concat(parentPath, ".").concat(relationTableName, ".").concat(idx), item[keyName])), (0, _ramda.defaultTo)(false)(canRemove) && /*#__PURE__*/_react["default"].createElement(Grid, {
            item: true,
            xs: 1
          }, /*#__PURE__*/_react["default"].createElement(DeleteIcon, {
            onClick: function onClick() {
              return remove(idx);
            }
          })));
        })(fields), (0, _ramda.defaultTo)(false)(canAdd) && /*#__PURE__*/_react["default"].createElement(AddButton, {
          onClick: function onClick() {
            return append(buildDefaultModel(schema));
          }
        }));
      }, function (item) {
        return renderForm(item, "".concat(parentPath, ".").concat(relationTableName));
      }), (0, _ramda.prop)(relationTableName))(record));
    };
  };

  return renderModelWithColumns;
};

exports.buildRenderModelWithColumns = buildRenderModelWithColumns;

var buildDefaultModel = function buildDefaultModel(schema) {
  var _mergeSchemasParts3 = mergeSchemasParts(schema),
      tableName = _mergeSchemasParts3.tableName,
      columns = _mergeSchemasParts3.columns,
      defaultObject = _mergeSchemasParts3.defaultObject,
      defaults = _mergeSchemasParts3.defaults;

  var modelConfig = dataSchema[(0, _pluralize.plural)(tableName)];
  return _objectSpread(_objectSpread({}, (0, _ramda.reduce)(function (acc, field) {
    return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, field, ((0, _ramda.defaultTo)({})(defaults)[field] || modelConfig[field]['default'] || function () {
      return '';
    })()));
  }, {})(prepareStringColumns(columns) || (0, _ramda.keys)(modelConfig))), defaultObject ? defaultObject() : {});
};

var mergeSchemasParts = function mergeSchemasParts(schema, parentTableName) {
  return _objectSpread(_objectSpread({
    columns: (0, _ramda.keys)(dataSchema[(0, _pluralize.plural)(schema.tableName)])
  }, (0, _ramda.path)(pathRelation(schema.tableName, parentTableName) || [], dataSchema)), schema);
}; // !


var buildRequesBody = function buildRequesBody(schema, data, parentTableName) {
  var _mergeSchemasParts4 = mergeSchemasParts(schema, parentTableName),
      tableName = _mergeSchemasParts4.tableName,
      columns = _mergeSchemasParts4.columns,
      relations = _mergeSchemasParts4.relations,
      on_conflict = _mergeSchemasParts4.on_conflict,
      shouldSave = _mergeSchemasParts4.shouldSave,
      isField = _mergeSchemasParts4.isField,
      isSelf = _mergeSchemasParts4.isSelf;

  var relationTableName = relationKey(tableName, parentTableName);
  var update_columns = (0, _ramda.compose)(_ramda.keys, (0, _ramda.pickBy)(function (v, k) {
    return !(0, _ramda.isEmpty)(v);
  }), (0, _ramda.pick)(prepareStringColumns(columns)), (0, _ramda.reduce)(function (acc, item) {
    return _objectSpread(_objectSpread({}, acc), item);
  }, {}), _array.wrapToArray)(data[relationTableName]);
  var datas = fillRelation(tableName, parentTableName, function (item) {
    return isSelf ? item : _objectSpread(_objectSpread({}, (0, _ramda.pick)(prepareStringColumns(columns))(item)), (0, _ramda.reduce)(function (acc, relation) {
      return _objectSpread(_objectSpread({}, acc), buildRequesBody(relation, item, tableName));
    }, {})((0, _ramda.defaultTo)([])(relations)));
  }, data)[relationTableName];
  return (0, _ramda.defaultTo)(true)(shouldSave) ? _defineProperty({}, relationTableName, (0, _ramda.defaultTo)(false)(isField) ? datas : {
    data: datas,
    on_conflict: _objectSpread({
      update_columns: update_columns
    }, on_conflict)
  }) : {};
}; // !int


exports.buildRequesBody = buildRequesBody;

var buildDefaultStruct = function buildDefaultStruct(schema, parentTableName) {
  var _mergeSchemasParts5 = mergeSchemasParts(schema, parentTableName),
      tableName = _mergeSchemasParts5.tableName,
      relations = _mergeSchemasParts5.relations;

  return fillRelation(tableName, parentTableName, function () {
    return _objectSpread(_objectSpread({}, buildDefaultModel(schema)), (0, _ramda.reduce)(function (acc, relation) {
      return _objectSpread(_objectSpread({}, acc), buildDefaultStruct(relation, tableName));
    }, {})((0, _ramda.defaultTo)([])(relations)));
  });
}; // !int


exports.buildDefaultStruct = buildDefaultStruct;

var pickDataForForm = function pickDataForForm(schema, data, parentTableName) {
  var _mergeSchemasParts6 = mergeSchemasParts(schema, parentTableName),
      tableName = _mergeSchemasParts6.tableName,
      columns = _mergeSchemasParts6.columns,
      relations = _mergeSchemasParts6.relations,
      isSelf = _mergeSchemasParts6.isSelf;

  return fillRelation(tableName, parentTableName, function (item) {
    return isSelf ? item : _objectSpread(_objectSpread({}, (0, _ramda.pickAll)(['id'].concat(_toConsumableArray(prepareStringColumns(columns))), (0, _ramda.defaultTo)({})(item))), (0, _ramda.reduce)(function (acc, relation) {
      return _objectSpread(_objectSpread({}, acc), pickDataForForm(relation, item, tableName));
    }, {})((0, _ramda.defaultTo)([])(relations)));
  }, data);
};

exports.pickDataForForm = pickDataForForm;

var pathRelation = function pathRelation(tableName) {
  var parentTableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var relationPath = function relationPath(key) {
    return (0, _ramda.path)([(0, _pluralize.plural)(parentTableName), (0, _pluralize.singular)(tableName), key], dataSchema);
  };

  if ((0, _ramda.or)((0, _ramda.equals)(relationPath('type'), 'hasMany'), relationPath('isHasMany'))) {
    return (0, _ramda.path)([(0, _pluralize.plural)(parentTableName), (0, _pluralize.singular)(tableName)], dataSchema) && (0, _ramdaAdjunct.compact)([(0, _pluralize.plural)(parentTableName), (0, _pluralize.singular)(tableName)]);
  } else {
    return (0, _ramda.path)([(0, _pluralize.plural)(parentTableName), (0, _pluralize.plural)(tableName)], dataSchema) && (0, _ramdaAdjunct.compact)([(0, _pluralize.plural)(parentTableName), (0, _pluralize.plural)(tableName)]);
  }
};

var isCollection = function isCollection(tableName) {
  var parentTableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return !parentTableName || !!pathRelation(tableName, parentTableName);
};

var relationKey = function relationKey(tableName) {
  var parentTableName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (isCollection(tableName, parentTableName)) {
    return (0, _ramda.pathOr)(true, [].concat(_toConsumableArray(pathRelation(tableName, parentTableName) || []), ['isPlural']), dataSchema) ? (0, _pluralize.plural)(tableName) : (0, _pluralize.singular)(tableName);
  } else {
    return (0, _pluralize.singular)(tableName);
  }
};

var prepareHashColumns = (0, _ramda.map)((0, _ramda.unless)((0, _ramda.is)(Object), function (field) {
  return {
    field: field
  };
}));
var prepareStringColumns = (0, _ramda.map)((0, _ramda.when)((0, _ramda.is)(Object), function (_ref5) {
  var field = _ref5.field;
  return field;
}));

var fillRelation = function fillRelation(tableName, parentTableName, data) {
  var iter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var key = relationKey(tableName, parentTableName);
  var result = (0, _ramda.map)(data)((0, _array.wrapToArray)(iter[key] || {}));
  return _defineProperty({}, key, isCollection(tableName, parentTableName) ? result : result[0]);
};