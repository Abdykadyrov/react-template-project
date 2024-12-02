import React, { useMemo } from 'react';
import { DefaultTFuncReturn } from 'i18next';
import { FormikProps } from 'formik';
import Icon from '../icon/icon.component';
import './input.style.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  formik?: FormikProps<any>;
  label?: DefaultTFuncReturn | string;
}

const Input: React.FC<IProps> = ({ formik, name, label, ...rest }) => {
  const getError: string | null = useMemo(() => {
    if (!formik?.errors) {
      return null;
    }

    return formik?.errors[name] as string;
  }, [formik, name]);

  return (
    <div
      className={`input ${
        !!getError && formik?.touched[name]
          ? 'input--error'
          : !getError && formik?.touched[name]
          ? 'input--success'
          : ''
      }`}
    >
      <input
        {...rest}
        name={name}
        placeholder=" "
        onBlur={() => formik?.setFieldTouched(name, true, true)}
        onFocus={() => formik?.setFieldTouched(name, false, true)}
      />
      {label ? <label>{label}</label> : null}
      {formik?.touched[name] && !!getError && (
        <span className="input--error__message" aria-label={getError}>
          <Icon name={'CircleAlert'} size={16} />
        </span>
      )}
    </div>
  );
};

export default Input;
