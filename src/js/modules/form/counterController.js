export const createCounterController = ({ counterElement, messageField }) => {
  const updateCounter = () => {
    if (!counterElement || !messageField) {
      return;
    }

    const max = Number(messageField.getAttribute('maxlength') || 0);
    const current = messageField.value.length;
    counterElement.textContent = `${current}/${max}`;
  };

  return { updateCounter };
};
