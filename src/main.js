import './index.css';
import 'iconoir/css/iconoir.css';

// Dialog behavior: open from triggers, close on backdrop and restore trigger focus.
const dialogTriggers = document.querySelectorAll('[data-open-dialog]');
const dialogTriggerMap = new Map();

dialogTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const dialogId = trigger.getAttribute('data-open-dialog');
    const dialog = document.getElementById(dialogId);

    if (!(dialog instanceof HTMLDialogElement)) {
      return;
    }

    dialogTriggerMap.set(dialog, trigger);
    dialog.showModal();
  });
});

document.querySelectorAll('[data-dialog]').forEach((dialog) => {
  if (!(dialog instanceof HTMLDialogElement)) {
    return;
  }

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close('backdrop');
    }
  });

  dialog.addEventListener('close', () => {
    const trigger = dialogTriggerMap.get(dialog);
    if (trigger instanceof HTMLElement) {
      trigger.focus();
    }
  });
});

// Behavior layer for form UX: live validation, error state mapping and counter updates.
const form = document.querySelector('[data-form]');

if (form) {
  const counter = form.querySelector('[data-counter]');
  const messageField = form.querySelector('#mensagem');
  const trackedInputs = form.querySelectorAll('input, select, textarea');

  // Each input is wrapped by a container that receives visual state classes.
  const resolveFieldContainer = (input) => input.closest('[data-field]');
  const setValidityClass = (field, isValid) => {
    field.classList.remove('is-valid', 'is-invalid');
    if (typeof isValid === 'boolean') {
      field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    }
  };

  const setFieldState = (input) => {
    const field = resolveFieldContainer(input);

    if (!field) {
      return;
    }

    if (input.type === 'radio') {
      // Radio validity is evaluated at group level, then mirrored to each input.
      const group = form.querySelectorAll(`input[name="${input.name}"]`);
      const checked = Array.from(group).some((option) => option.checked);
      setValidityClass(field, checked);
      group.forEach((option) => {
        option.setAttribute('aria-invalid', checked ? 'false' : 'true');
      });
      return;
    }

    if (input.type === 'checkbox') {
      // Checkbox validity depends on checked state only.
      setValidityClass(field, input.checked);
      input.setAttribute('aria-invalid', input.checked ? 'false' : 'true');
      return;
    }

    if (!input.required && input.value.trim() === '') {
      setValidityClass(field);
      input.removeAttribute('aria-invalid');
      return;
    }

    const isValid = input.checkValidity();
    setValidityClass(field, isValid);
    input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
  };

  // Keeps character counter synchronized with textarea content.
  const updateCounter = () => {
    if (!counter || !messageField) {
      return;
    }

    const max = Number(messageField.getAttribute('maxlength') || 0);
    const current = messageField.value.length;
    counter.textContent = `${current}/${max}`;
  };

  trackedInputs.forEach((input) => {
    input.addEventListener('blur', () => setFieldState(input));
    input.addEventListener('input', () => {
      setFieldState(input);
      if (input === messageField) {
        updateCounter();
      }
    });
    input.addEventListener('change', () => setFieldState(input));
  });

  form.addEventListener('submit', (event) => {
    let hasInvalidField = false;
    let firstInvalidField = null;

    trackedInputs.forEach((input) => {
      setFieldState(input);
      if (!input.checkValidity()) {
        hasInvalidField = true;
        if (!firstInvalidField) {
          firstInvalidField = input;
        }
      }
    });

    if (hasInvalidField) {
      event.preventDefault();
      // Preserve native browser validation messaging and focus first invalid control.
      form.reportValidity();
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  });

  form.addEventListener('reset', () => {
    // Reset visual states after native form reset applies.
    requestAnimationFrame(() => {
      trackedInputs.forEach((input) => {
        const field = resolveFieldContainer(input);
        if (field) {
          setValidityClass(field);
        }
      });
      updateCounter();
    });
  });

  updateCounter();
}
