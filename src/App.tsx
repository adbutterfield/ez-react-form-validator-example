import React, { useEffect } from 'react';
import clsx from 'clsx';
import useFormValidator, { ValidatorSetup } from 'ez-react-form-validator';
import './App.css';
import Warning from './warning';
import Input from './input';

type FormFields = {
  requiredField: string;
  defaultValueField: string;
  customErrorField: string;
  minLengthField: string;
  maxLengthField: string;
  minField: number;
  maxField: number;
  selectField: number;
  radioField: string;
  checkboxField: string;
};

const formSetup: ValidatorSetup<FormFields> = {
  requiredField: {
    required: true,
  },
  defaultValueField: {
    defaultValue: 'default',
  },
  customErrorField: {
    required: true,
    errorMessages: {
      required: 'custom error message',
    },
  },
  minLengthField: {
    minLength: 4,
  },
  maxLengthField: {
    maxLength: 4,
  },
  minField: {
    min: 4,
  },
  maxField: {
    max: 4,
  },
  selectField: {
    required: true,
  },
  radioField: {
    required: true,
  },
  checkboxField: {
    required: true,
  },
};

function App() {
  const { fields, isValid, values, handleChange, handleBlur, setValues, setupComplete, validate, reset } = useFormValidator(formSetup);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  const setDefaults = () => {
    setValues({
      requiredField: 'a',
      defaultValueField: 'a',
      customErrorField: 'a',
      minLengthField: 'aaaa',
      maxLengthField: 'aaaa',
      minField: 4,
      maxField: 4,
      selectField: 1,
      checkboxField: 'checkbox',
      radioField: 'radio',
    });
  };

  return (
    <div className="Layout">
      <h1>Example form using EZ React Form Validator</h1>
      {setupComplete && (
        <form className="ui form">
          <p>Form setup is complete: {String(setupComplete)}</p>
          <Input name="requiredField" onBlur={handleBlur} onChange={handleChange} field={fields.requiredField} value={values.requiredField} />
          <Input name="defaultValueField" onBlur={handleBlur} onChange={handleChange} field={fields.defaultValueField} value={values.defaultValueField} />
          <Input name="customErrorField" onBlur={handleBlur} onChange={handleChange} field={fields.customErrorField} value={values.customErrorField} />
          <Input name="minLengthField" onBlur={handleBlur} onChange={handleChange} field={fields.minLengthField} value={values.minLengthField} />
          <Input name="maxLengthField" onBlur={handleBlur} onChange={handleChange} field={fields.maxLengthField} value={values.maxLengthField} />
          <Input name="minField" onBlur={handleBlur} onChange={handleChange} field={fields.minField} value={values.minField} />
          <Input name="maxField" onBlur={handleBlur} onChange={handleChange} field={fields.maxField} value={values.maxField} />

          <div className={clsx('field', fields.selectField?.showError && 'error')}>
            <label>Select Field</label>
            <select className="ui dropdown" name="selectField" value={values.selectField || ''} onChange={handleChange} onBlur={handleBlur}>
              <option value="">Select</option>
              <option value="1">One</option>
              <option value="2">Two</option>
            </select>
          </div>
          {fields.selectField?.showError && (
            <p className="Input__error" data-testid="selectField-error">
              Error message: {fields.selectField.errors[0]}
            </p>
          )}
          <Warning
            message={`selectField ${fields.selectField?.hasError ? 'has an error' : 'does not have an error'}${
              fields.selectField?.hasError ? (fields.selectField?.showError ? ', and we should' : ', but we should not') : ''
            } ${fields.selectField?.hasError ? 'display the error' : ''}`}
            hasError={fields.selectField?.hasError}
          />

          <div className={clsx('inline field', fields.checkboxField?.showError && 'error')}>
            <div className="ui checkbox">
              <input
                type="checkbox"
                id="checkboxField"
                name="checkboxField"
                value="checkbox"
                checked={values.checkboxField === 'checkbox'}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="checkboxField">Checkbox Field</label>
            </div>
          </div>
          {fields.checkboxField?.showError && (
            <p className="Input__error" data-testid="checkboxField-error">
              Error message: {fields.checkboxField.errors[0]}
            </p>
          )}
          <Warning
            message={`checkboxField ${fields.checkboxField?.hasError ? 'has an error' : 'does not have an error'}${
              fields.checkboxField?.hasError ? (fields.checkboxField?.showError ? ', and we should' : ', but we should not') : ''
            } ${fields.checkboxField?.hasError ? 'display the error' : ''}`}
            hasError={fields.checkboxField?.hasError}
          />

          <div className={clsx('inline field', fields.checkboxField?.showError && 'error')}>
            <div className={clsx('ui radio checkbox', fields.radioField?.showError && 'error')}>
              <input type="radio" id="radioField" name="radioField" value="radio" checked={values.radioField === 'radio'} onChange={handleChange} onBlur={handleBlur} />
              <label htmlFor="radioField">Radio Field</label>
            </div>
          </div>
          {fields.radioField?.showError && (
            <p className="Input__error" data-testid="radioField-error">
              Error message: {fields.radioField.errors[0]}
            </p>
          )}
          <Warning
            message={`radioField ${fields.radioField?.hasError ? 'has an error' : 'does not have an error'}${
              fields.radioField?.hasError ? (fields.radioField?.showError ? ', and we should' : ', but we should not') : ''
            } ${fields.radioField?.hasError ? 'display the error' : ''}`}
            hasError={fields.radioField?.hasError}
          />
        </form>
      )}
      <p>All fields are valid: {String(isValid)}</p>
      <button className="ui button" type="button" onClick={setDefaults}>
        Set Defaults
      </button>
      <button className="ui button" type="button" onClick={validate}>
        Validate
      </button>
      <button className="ui button" type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
