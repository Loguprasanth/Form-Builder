// src/features/forms/formsSelectors.ts
import type { RootState } from '../../app/store';

export const selectForms = (state: RootState) => state.forms.forms;
export const selectCurrentForm = (state: RootState) => state.forms.currentForm;
