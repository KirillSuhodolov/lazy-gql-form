import { buildFormBuilder } from './FormBuilder'
import { buildRenderModelWithColumns } from './form'
import { buildUseFormMutation } from './useFormMutation'
import { buildUseSchema } from './useSchema'
import { buildInput } from './Input'

// export const {buildFormBuilder} = a

// // export const buildFormInput
// // export const buildFormRelationInput
// export const {buildRenderModelWithColumns, buildFormRelationInput, buildFormInput} = b

// export const {buildUseFormMutation} = c

// export const {buildUseSchema} = d
import React from 'react'

export * from './FormBuilder'
export * from './form'
export * from './useFormMutation'
export * from './useSchema'

const defaultProps = {
  Grid: ({children}) => (<div>{children}</div>),
  Wrapper: ({children}) => (<div>{children}</div>),
  DeleteIcon: () => <div>delete</div>,
  AddButton: ({label}) => <div>add {label}</div>,
  FormControl: ({children}) => <div>{children}</div>,
  inputs: {
    string: ({ field, ...props }) => (<input {...props} {...field} />),
  },
  FormWrapper: ({children}) => <div>{children}</div>,
  StateButton: ({loading}) => <button type="submit">save {loading}</button>,
}

export const buildForm = (_props) => {
  const {
    Grid,
    DeleteIcon,
    AddButton,
    FormControl,
    inputs,
    FormWrapper,
    Wrapper,
    StateButton,
    useMutation,
    useMemo,
    // useFormMutation,
    // useSchema,
    useFieldArray,
    useForm,
    Controller,
  } = {
    ...defaultProps,
    ..._props,
  }

  const useFormMutation = buildUseFormMutation({
    useMutation
  })

  const useSchema = buildUseSchema({
    useMemo
  })

  const Input = buildInput({
    Controller,
    FormControl,
    inputs,
  })

  const renderModelWithColumns = buildRenderModelWithColumns({
    Grid,
    Wrapper,
    DeleteIcon,
    AddButton,
    useFieldArray,
    Input,
  })
  
  const FormBuilder = buildFormBuilder({
    useForm,
    FormWrapper,
    StateButton,
    useFormMutation,
    useSchema,
    renderModelWithColumns,
  })

  return FormBuilder
}
