import React from 'react'
import { keys, type, equals, omit } from 'ramda'

const callWhenFn = (prop) => equals(type(prop), 'Function') ? prop() : prop

export const buildInput = ({
  Controller,
  FormControl,
  inputs,
}) => (_props) => {
  const props = {
    isLabel: true,
    ..._props,
    label: _props.label || _props.placeholder,
    placeholder: _props.placeholder || _props.label,
    type: _props.hidden ? 'hidden' : callWhenFn(_props.type),
    disabled: callWhenFn(_props.disabled),
    hidden: callWhenFn(_props.hidden),
  }
  const { name, isRequired, control } = props
  const InputComponent = inputs[props.type] || inputs[keys(inputs)[0]]

  return (
    <FormControl
      sx={{
        width: '100%',
        ...(props.hidden ? { display: 'none' } : {})
      }} >
      { props.isLabel && <label> {props.label} </label> }

      <Controller
        control={control}
        name={name}
        shouldUnregister={true}
        rules={{
          required: isRequired
        }}
        render={({ field }) => <InputComponent {...omit(['isLabel'], props)} field={field} />
        }
      />
    </FormControl>
  )
}
