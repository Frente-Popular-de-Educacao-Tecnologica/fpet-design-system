const DIALOG_TRIGGER_SELECTOR = '[data-open-dialog]';
const DIALOG_SELECTOR = '[data-dialog]';

const resolveDialog = (root, dialogId) => {
  const dialog = root.getElementById(dialogId);
  return dialog instanceof HTMLDialogElement ? dialog : null;
};

export const initDialogModule = ({ root = document } = {}) => {
  const dialogTriggerMap = new Map();
  const dialogTriggers = Array.from(root.querySelectorAll(DIALOG_TRIGGER_SELECTOR));
  const dialogs = Array.from(root.querySelectorAll(DIALOG_SELECTOR));

  dialogTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const dialogId = trigger.getAttribute('data-open-dialog');

      if (!dialogId) {
        return;
      }

      const dialog = resolveDialog(root, dialogId);
      if (!dialog) {
        return;
      }

      dialogTriggerMap.set(dialog, trigger);
      dialog.showModal();
    });
  });

  dialogs.forEach((dialog) => {
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
};
