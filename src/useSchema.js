import { length, flatten } from 'ramda'
import { isArray } from './array'

export const buildUseSchema = ({
  useMemo,
}) => (schemaFn, isNew, ...args) => {
  const memoArgs = flatten([...args, isNew])

  return useMemo(() => schemaFn(...args, isNew), memoArgs)
}

// export default buildUseSchema