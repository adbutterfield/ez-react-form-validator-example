import React from 'react';
import clsx from 'clsx';
import Warning from './warning';
import './input.css';
import { Field } from 'ez-react-form-validator';

type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  value: any;
  field: Field;
  name: any;
};

const Input: React.FC<InputProps> = ({ onChange, onBlur, value, field, name }) => {
  return (
    <div className="Input">
      <div className={clsx('field success', field.showError && 'error')}>
        <label htmlFor={name}>{name}</label>
        <input id={name} name={name} value={value} onChange={onChange} onBlur={onBlur} />
      </div>
      {field.showError && (
        <p className="Input__error" data-testid={`${name}-error`}>
          Error message: {field.errors[0]}
        </p>
      )}
      <Warning
        message={`${name} ${field.hasError ? 'has an error' : 'does not have an error'}${field.hasError ? (field.showError ? ', and we should' : ', but we should not') : ''} ${
          field.hasError ? 'display the error' : ''
        }`}
        hasError={field.hasError}
      />
    </div>
  );
};

export default Input;
