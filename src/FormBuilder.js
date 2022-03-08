import React from 'react'
import { prop, values } from 'ramda'
import { buildDefaultStruct, pickDataForForm } from './form'
import GqlError from './GqlError'

export const buildFormBuilder = ({
  useForm,
  FormWrapper,
  StateButton,
  useFormMutation,
  useSchema,
  renderModelWithColumns,
}) => ({ objects, schemaFn, schemaArgs=[], closeModal, mutation, update=() => {} }) => {
  const isNew = !prop('id', values(objects)[0][0])
  // const schema = schemaFn(isNew)
  const schema = useSchema(schemaFn, isNew, ...schemaArgs)
  const defaultValues = isNew ? buildDefaultStruct(schema) : pickDataForForm(schema, objects)
  const { handleSubmit, register, unregister, setValue, control, formState: { errors } } = useForm({
    defaultValues
  })
  const [onSubmit, loading, error] = useFormMutation(schema, mutation, closeModal, update)

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GqlError error={error} />

        {renderModelWithColumns(defaultValues, { setValue, register, unregister, control, isNew })(schema)}

        <GqlError error={error} />

        <StateButton
          loading={loading}
          variant="contained"
        />
      </form>
    </FormWrapper>
  )
}

// export default buildFormBuilder
