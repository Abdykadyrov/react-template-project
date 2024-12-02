import React, { useMemo } from 'react';
import { DefaultTFuncReturn } from 'i18next';
import { FormikProps } from 'formik';
import { clsx } from 'clsx';
import Icon from 'components/icon/icon.component';
import './select.style.scss';

interface IProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: T[];
  valueKey?: keyof T;
  labelKey?: keyof T;
  formik?: FormikProps<any>;
  label?: DefaultTFuncReturn | string;
  hideNullOption?: boolean;
}

const Select = <T,>({
  name,
  options,
  formik,
  label,
  valueKey = 'id' as keyof T,
  labelKey = 'name' as keyof T,
  hideNullOption = false,
  ...rest
}: IProps<T>) => {
  const getError: string | null = useMemo(() => {
    if (!formik?.errors) {
      return null;
    }

    return formik?.errors[name] as string;
  }, [formik, name]);

  return (
    <div
      className={clsx({
        select: true,
        ['select--error']: !!getError && formik?.touched[name],
        ['select--success']: !getError && formik?.touched[name],
      })}
    >
      <select
        {...rest}
        name={name}
        onBlur={() => formik?.setFieldTouched(name, true, true)}
        onFocus={() => formik?.setFieldTouched(name, false, true)}
      >
        {!hideNullOption && <option value="">Выберите</option>}
        {options.map((option, index) => (
          <option
            key={`option_${index}`}
            value={option[valueKey] as string | number | readonly string[] | undefined}
          >
            {option[labelKey] as React.ReactNode}
          </option>
        ))}
      </select>
      {label ? <label>{label}</label> : null}
      {formik?.touched[name] && !!getError && (
        <span className="select--error__message" aria-label={getError}>
          <Icon name={'CircleAlert'} size={16} />
        </span>
      )}
    </div>
  );
};

export default Select;
