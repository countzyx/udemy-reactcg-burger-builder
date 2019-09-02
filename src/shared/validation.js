// @flow
import type { FormElementValidationRules } from '../types';

export const getErrorMessage = (value: string, rules: FormElementValidationRules) => {
  const trimmedValue = value.trim();

  if (!rules) {
    return null;
  }

  if (rules.required && trimmedValue === '') {
    return 'Required';
  }

  if (rules.minLength && trimmedValue.length < rules.minLength) {
    return `Minimum length: ${rules.minLength}`;
  }

  if (rules.maxLength && trimmedValue.length > rules.maxLength) {
    return `Maximum length: ${rules.maxLength}`;
  }

  // eslint-disable-next-line no-useless-escape
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (rules.isEmail && !emailPattern.test(trimmedValue)) {
    return 'Email is not valid';
  }

  return null;
};
