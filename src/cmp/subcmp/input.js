import React from 'react';

import {
    FormControl,
    Input as MInput,
    InputLabel
} from '@material-ui/core';

const Input = (props) => {
    return (
        <FormControl
            style={
                props.style ||
                {
                    padding: '.75rem 0 .5rem 0',
                    width: '100%'
                }
            }
        >
            <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
            <MInput
                id={props.id}
                value={props.value}
                onChange={(e) => props.onChange(e)}
                autoComplete={props.autocomplete}
            />
        </FormControl>
    )
}

export default Input;
