import React from 'react'

const GqlError = ({ error }) => {
  return error ?
    <div mt={3} mb={3}>
      {JSON.stringify(error)}
    </div> : <></>
}

export default GqlError