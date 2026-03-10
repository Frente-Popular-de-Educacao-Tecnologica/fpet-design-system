import { initDialogModule } from './modules/dialog/dialogModule.js';
import { initFormModule } from './modules/form/formModule.js';

export const initializeApp = ({ root = document } = {}) => {
  initDialogModule({ root });
  initFormModule({ root });
};
