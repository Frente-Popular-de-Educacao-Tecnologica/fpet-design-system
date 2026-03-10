const VALID_CLASS = 'is-valid';
const INVALID_CLASS = 'is-invalid';

const resolveFieldContainer = (input) => input.closest('[data-field]');

const setValidityClass = (field, isValid) => {
  field.classList.remove(VALID_CLASS, INVALID_CLASS);

  if (typeof isValid === 'boolean') {
    field.classList.add(isValid ? VALID_CLASS : INVALID_CLASS);
  }
};

const updateAriaInvalid = (input, isValid) => {
  if (typeof isValid === 'boolean') {
    input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    return;
  }

  input.removeAttribute('aria-invalid');
};

const updateRadioGroupAria = (group, isValid) => {
  group.forEach((option) => updateAriaInvalid(option, isValid));
};

export const createFormFieldState = ({ form }) => {
  const setFieldState = (input) => {
    const field = resolveFieldContainer(input);

    if (!field) {
      return;
    }

    if (input.type === 'radio') {
      const group = Array.from(form.querySelectorAll(`input[name="${input.name}"]`));
      const isGroupValid = group.some((option) => option.checked);

      setValidityClass(field, isGroupValid);
      updateRadioGroupAria(group, isGroupValid);
      return;
    }

    if (input.type === 'checkbox') {
      setValidityClass(field, input.checked);
      updateAriaInvalid(input, input.checked);
      return;
    }

    if (!input.required && input.value.trim() === '') {
      setValidityClass(field);
      updateAriaInvalid(input);
      return;
    }

    const isValid = input.checkValidity();
    setValidityClass(field, isValid);
    updateAriaInvalid(input, isValid);
  };

  const clearFieldState = (input) => {
    const field = resolveFieldContainer(input);
    if (field) {
      setValidityClass(field);
    }
    updateAriaInvalid(input);
  };

  return {
    clearFieldState,
    setFieldState,
  };
};
