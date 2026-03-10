import { createFormFieldState } from '../shared/formFieldState.js';
import { createCounterController } from './counterController.js';

const FORM_SELECTOR = '[data-form]';
const COUNTER_SELECTOR = '[data-counter]';
const MESSAGE_SELECTOR = '#mensagem';
const TRACKED_INPUTS_SELECTOR = 'input, select, textarea';

export const initFormModule = ({ root = document } = {}) => {
  const form = root.querySelector(FORM_SELECTOR);

  if (!form) {
    return;
  }

  const trackedInputs = Array.from(form.querySelectorAll(TRACKED_INPUTS_SELECTOR));
  const messageField = form.querySelector(MESSAGE_SELECTOR);
  const counterElement = form.querySelector(COUNTER_SELECTOR);

  const fieldState = createFormFieldState({ form });
  const counter = createCounterController({ counterElement, messageField });

  trackedInputs.forEach((input) => {
    input.addEventListener('blur', () => fieldState.setFieldState(input));
    input.addEventListener('change', () => fieldState.setFieldState(input));

    input.addEventListener('input', () => {
      fieldState.setFieldState(input);
      if (input === messageField) {
        counter.updateCounter();
      }
    });
  });

  form.addEventListener('submit', (event) => {
    let firstInvalidField = null;

    trackedInputs.forEach((input) => {
      fieldState.setFieldState(input);

      if (!input.checkValidity() && !firstInvalidField) {
        firstInvalidField = input;
      }
    });

    if (!firstInvalidField) {
      return;
    }

    event.preventDefault();
    form.reportValidity();
    firstInvalidField.focus();
  });

  form.addEventListener('reset', () => {
    requestAnimationFrame(() => {
      trackedInputs.forEach((input) => fieldState.clearFieldState(input));
      counter.updateCounter();
    });
  });

  counter.updateCounter();
};
