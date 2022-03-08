import React from 'react'
import { pick, pickAll, pathOr, keys, ifElse, or, always, isNil, pickBy, reduce, is, equals, isEmpty, when, map, unless, addIndex, compose, defaultTo, prop, length, omit, path } from 'ramda'
import { wrapToArray } from './array'
import { compact } from 'ramda-adjunct'
import { plural, singular, isPlural, isSingular } from 'pluralize'
import { w } from './strings'

let dataSchema = {}

export const setDataSchema = (data) => dataSchema = data

export const buildRenderModelWithColumns = ({
  Wrapper,
  Grid,
  DeleteIcon,
  AddButton,
  useFieldArray,
  Input,
}) => {
  const FormInput = ({ className, isNew, tableName, field, name, ...props }) => {
    const params = omit(w('isSelf default isLabel setValue register unregister'), { ...dataSchema[plural(tableName)][field], ...props })

    return (
      <Wrapper mb={3} className={className} >
        <Input
          {...params}
          name={name}
          label={params.label || field}
        />
      </Wrapper>
    )
  }

  const FormRelationInput = ({ props, item, name, schema, parentTableName }) => {  
    const { tableName, direction, columns, relations, isSelf } = mergeSchemasParts(schema, parentTableName)

    return (
      <Grid container direction={defaultTo('row')(direction)} className='form-relation-input'>
        {addIndex(map)((column, idx) => (
          <Grid item xs={equals(direction, 'row') ? 12 / length(columns) : 12} key={`${tableName}-${idx}`}>
            <FormInput
              {...props}
              {...column}
              key={`${tableName}-${isSelf ? name : column.field}`}
              tableName={tableName}
              record={item}
              field={column.field}
              name={isSelf ? name : `${name}.${column.field}`}
            />
          </Grid>
        ))(prepareHashColumns(columns))}
        
        {map(renderModelWithColumns(item, props, name, tableName))(defaultTo([])(relations))}
      </Grid>
    )
  }

  const renderModelWithColumns = (record, props, parentPath='', parentTableName) => (schema) => {
    const { tableName, direction, canAdd, canRemove } = mergeSchemasParts(schema, parentTableName)
    const { control } = props
    const relationTableName = relationKey(tableName, parentTableName)
    const label = schema.label || (parentTableName ? path([plural(parentTableName || ''), tableName, 'label'], dataSchema) : '')

    const renderForm = (item, name, idx) => {
      return (
        <FormRelationInput
          parentTableName={parentTableName}
          schema={schema}
          key={`${name}-${idx}`}
          props={props}
          item={item}
          name={name}
        />
      )
    }
    
    return (
      <div className='render-form' key={tableName} style={{width: '100%'}}>
        <label>{label}</label>
        
        {compose(
          ifElse(() => isCollection(tableName, parentTableName),
            () => {
              const keyName = 'formId'
              const { fields, remove, append }  = useFieldArray({
                control,
                keyName,
                name: `${parentPath}.${relationTableName}`,
              })
              
              return (
                <>
                  {addIndex(map)((item, idx) => {
                    return (
                      <Grid container direction={defaultTo('row')(direction)} key={`${parentPath}.${relationTableName}.${idx}`}>
                        <Grid item xs={defaultTo(false)(canRemove) ? 11 : 12}>
                          {renderForm(omit([keyName])(item), `${parentPath}.${relationTableName}.${idx}`, item[keyName])}
                        </Grid>
                        {defaultTo(false)(canRemove) && (
                          <Grid item xs={1}>
                            <DeleteIcon onClick={() => remove(idx)} />
                          </Grid>
                        )}
                      </Grid>
                    )
                  })(fields)}
                  {defaultTo(false)(canAdd) && (
                    <AddButton onClick={() => append(buildDefaultModel(schema))} />
                  )}
                </>
              )
            },
            (item) => renderForm(item, `${parentPath}.${relationTableName}`)
          ),
          prop(relationTableName),
        )(record)}
      </div>
    )
  }
    
  return renderModelWithColumns
}

const buildDefaultModel = (schema) => {
  const { tableName, columns, defaultObject, defaults } = mergeSchemasParts(schema)
  const modelConfig = dataSchema[plural(tableName)]
  
  return {
    ...reduce((acc, field) => ({
      ...acc,
      [field]: (defaultTo({})(defaults)[field] || modelConfig[field]['default'] || (() => ''))(),
    }), {})(prepareStringColumns(columns) || keys(modelConfig)),
    ...(defaultObject ? defaultObject() : {}),
  }
}

const mergeSchemasParts = (schema, parentTableName) => ({
  columns: keys(dataSchema[plural(schema.tableName)]),
  ...path(pathRelation(schema.tableName, parentTableName) || [], dataSchema),
  ...schema,
})

// !
export const buildRequesBody = (schema, data, parentTableName) => {
  const { tableName, columns, relations, on_conflict, shouldSave, isField, isSelf } = mergeSchemasParts(schema, parentTableName)
  const relationTableName = relationKey(tableName, parentTableName)
  const update_columns = compose(
    keys,
    pickBy((v, k) => !isEmpty(v)),
    pick(prepareStringColumns(columns)),
    reduce((acc, item) => ({
      ...acc,
      ...item,
    }), {}),
    wrapToArray,
  )(data[relationTableName])
  
  const datas = fillRelation(tableName, parentTableName, (item) => isSelf ? item : ({
    ...pick(prepareStringColumns(columns))(item),
    ...reduce((acc, relation) => {
      return {
        ...acc,
        ...buildRequesBody(relation, item, tableName),
      }
    }, {})(defaultTo([])(relations))
  }), data)[relationTableName]

  return defaultTo(true)(shouldSave) ? {
    [relationTableName]: defaultTo(false)(isField) ? datas : {
      data: datas,
      on_conflict: {
        update_columns: update_columns,
        ...on_conflict,
      },
    },
  } : {}
}
// !int
export const buildDefaultStruct = (schema, parentTableName) => {
  const { tableName, relations } = mergeSchemasParts(schema, parentTableName)

  return fillRelation(tableName, parentTableName, () => ({
    ...buildDefaultModel(schema),
    ...reduce((acc, relation) => ({
      ...acc,
      ...buildDefaultStruct(relation, tableName)
    }), {})(defaultTo([])(relations))
  }))
}
// !int
export const pickDataForForm = (schema, data, parentTableName) => {
  const { tableName, columns, relations, isSelf } = mergeSchemasParts(schema, parentTableName)

  return fillRelation(tableName, parentTableName, (item) => {
    return isSelf ? item : {
      ...pickAll(['id', ...prepareStringColumns(columns)], defaultTo({})(item)),
      ...reduce((acc, relation) => ({
        ...acc,
        ...pickDataForForm(relation, item, tableName)
      }), {})(defaultTo([])(relations))
    }
  }, data)
}

const pathRelation = (tableName, parentTableName='') => {
  const relationPath = (key) => path([plural(parentTableName), singular(tableName), key], dataSchema)

  if (or(equals(relationPath('type'), 'hasMany'), relationPath('isHasMany'))) {
    return path([plural(parentTableName), singular(tableName)], dataSchema) && compact([plural(parentTableName), singular(tableName)])
  } else {
    return path([plural(parentTableName), plural(tableName)], dataSchema) && compact([plural(parentTableName), plural(tableName)])
  }
}

const isCollection = (tableName, parentTableName='') => {
  return !parentTableName || !!pathRelation(tableName, parentTableName)
}

const relationKey = (tableName, parentTableName='') => {
  if (isCollection(tableName, parentTableName)) {
    return pathOr(true, [...(pathRelation(tableName, parentTableName) || []), 'isPlural'], dataSchema) ? plural(tableName) : singular(tableName)
  } else {
    return singular(tableName)
  }
}

const prepareHashColumns = map(unless(is(Object), (field) => ({ field })))
const prepareStringColumns = map(when(is(Object), ({ field }) => field))

const fillRelation = (tableName, parentTableName, data, iter={}) => {
  const key = relationKey(tableName, parentTableName)
  const result = map(data)(wrapToArray(iter[key] || {}))

  return {
    [key]: isCollection(tableName, parentTableName) ? result : result[0]
  }
}
