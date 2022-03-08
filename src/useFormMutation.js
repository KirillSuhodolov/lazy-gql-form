import { buildRequesBody } from './form'
import { values } from 'ramda'

export const buildUseFormMutation = ({ useMutation }) => (schema, mutation, closeModal, update=() => {}) => {
  const [save, { loading, error }] = useMutation(mutation, {
    onCompleted: closeModal,
    update,
  })

  const onSubmit = (data) => {
    const requestBody = buildRequesBody(schema, data)
    save(...values(requestBody[schema.tableName]))
  }

  return [onSubmit, loading, error]
}

// export default buildUseFormMutation