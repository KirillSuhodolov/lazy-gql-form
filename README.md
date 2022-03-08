# Form builder for gql structures

See [lazy-gql](https://github.com/KirillSuhodolov/lazy-gql) for more details
useMutation and useQuery from [lazy-gql-hooks](https://github.com/KirillSuhodolov/lazy-gql-hooks) for more details

Required [react-hook-form](https://react-hook-form.com)

initialize form builder component

```
import dataSchema from 'dataSchema'
import { buildForm, setDataSchema } from 'lazy-gql-form'
import { useMemo } from 'react'
import { useMutation } from 'hooks/useMutation'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

setDataSchema(dataSchema)

export const FormBuilder = buildForm({
  useMutation,
  useMemo,
  useFieldArray,
  useForm,
  Controller,
})

```

Example for next.js page

```
import { buildUpsert, buildQuery } from 'lazy-gql'
import { useRouter } from 'next/router'
import { FormBuilder } from 'components/FormBuilder'
import { useQuery } from 'hooks/useQuery'

const buildSchema = () => ({
  label: 'Project',
  tableName: 'projects',
})

const Form = () => {
  const router = useRouter()
  const { id } = router.query
  const props = {}

  const mutation = buildUpsert('projects')
  const { data: { projects }, loading } = useQuery(buildQuery('projects'), {
    id: { _eq: id }
  }, {
    skip: equals(id, 'new') || !id,
    useSkeleton: 'empty',
  })

  return (
    <>
      { !loading && (
        <FormBuilder
          {...props}
          mutation={mutation}
          schemaFn={buildSchema}
          objects={{ projects }}
        />
      ) }
    </>
  )
}

export default Form
```

![form result](https://i.ibb.co/gFjG2Wd/Screenshot-2022-03-08-at-00-52-22.png)

also supports relations and nested data, more complex example below

```
const buildSchema = (measures, questionnaires, frequencies, dayOfWeeks, isNew) => ({
  tableName: 'subscriptions',
  columns: [...w('title color'), {
    field: 'measure',
    type: 'select',
    options: measures,
  }, ...w('duration is_active')],
  defaults: {

  },
  on_conflict: {
    constraint: 'question_types_pkey',
  },
  relations: [{
    tableName: 'subscription_questionnaires',
    columns: [...w('is_active start_time end_time'), {
      field: 'questionnaire_id',
      type: 'select',
      options: questionnaires,
    }],
    canAdd: true,
    canRemove: true,
    relations: [{
      tableName: 'schedule',
      columns: [{
        field: 'frequency',
        type: 'select',
        options: frequencies,
      }, ...w('interval')],
      relations: [{
        tableName: 'byDayOfWeek',
        columns: [{
          field: 'value',
          type: 'select',
          options: dayOfWeeks,
        }],
        canAdd: true,
        canRemove: true
      }]
    }]
  }]
})

const SubscriptionForm = (props) => {
  const { subscriptions } = props
  const { data: { questionnaires } } = useQuery(buildQuery('questionnaires'), {})

  return (
    <FormBuilder
      {...props}
      mutation={buildMutation('subscriptions')}
      schemaFn={buildSchema}
      schemaArgs={[
        map(applySpec({ value: identity, label: identity }))(measures),
        map(applySpec({ value: prop('id'), label: prop('title') }))(questionnaires),
        map(applySpec({ value: identity, label: identity }))(frequencies),
        map(applySpec({ value: identity, label: identity }))(dayOfWeeks),
      ]}
      objects={{ subscriptions }}
    />
  )
}

export default SubscriptionForm
```
