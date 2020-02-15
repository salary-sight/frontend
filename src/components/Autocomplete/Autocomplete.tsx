/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type InputProp ={
    options: string[],
    id: string,
    setValue: (arg0: string[]) => void,
    label: string,
    placeholder: string
}

export default function Input(props:InputProp) {
  return (
    <Autocomplete
      multiple
      id="skills"
      options={props.options}
      onChange={(event, value) => {props.setValue(value)}}
      autoComplete={true}
      getOptionLabel={option => option}
      autoSelect={true}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      style={{ width: "auto", marginTop: 20 }}
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
