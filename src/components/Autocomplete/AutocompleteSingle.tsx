/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type InputProp = {
    options: string[],
    id: string,
    setValue: (arg0: string | number) => void,
    label: string,
    placeholder: string,
    width: string | number
}

export default function Input(props:InputProp) {
  return (
    <Autocomplete
      id="skills"
      options={props.options}
      onChange={(event:any, value:any) => {props.setValue(value)}}
      autoComplete={true}
      getOptionLabel={option => option}
      autoSelect={true}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      style={{ width: props.width, marginTop: 20 }}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          variant="standard"
          placeholder={props.placeholder}
          fullWidth
        />
      )}
    />
  );
}
