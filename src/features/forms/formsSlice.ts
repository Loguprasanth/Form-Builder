// src/features/forms/formsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit';

import type { FormSchema, BaseField } from '../../types/models';
import { saveFormsToStorage, loadFormsFromStorage } from '../../utils/persistence';

interface FormsState {
  forms: FormSchema[];
  currentForm: FormSchema | null;
}

const initialState: FormsState = {
  forms: loadFormsFromStorage(),
  currentForm: null,
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    createNewForm: (state, action: PayloadAction<{ name: string }>) => {
      const newForm: FormSchema = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        fields: [],
      };
      state.currentForm = newForm;
    },
    addField: (state, action: PayloadAction<BaseField>) => {
      if (state.currentForm) {
        state.currentForm.fields.push(action.payload);
      }
    },
    updateField: (state, action: PayloadAction<BaseField>) => {
      if (state.currentForm) {
        const index = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
        if (index !== -1) {
          state.currentForm.fields[index] = action.payload;
        }
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
      }
    },
    saveCurrentForm: (state) => {
      if (state.currentForm) {
        const existingIndex = state.forms.findIndex(f => f.id === state.currentForm!.id);
        if (existingIndex !== -1) {
          state.forms[existingIndex] = state.currentForm;
        } else {
          state.forms.push(state.currentForm);
        }
        saveFormsToStorage(state.forms);
        state.currentForm = null;
      }
    },
    loadFormById: (state, action: PayloadAction<string>) => {
      const form = state.forms.find(f => f.id === action.payload);
      state.currentForm = form ? { ...form } : null;
    }
  }
});

export const { createNewForm, addField, updateField, deleteField, saveCurrentForm, loadFormById } = formsSlice.actions;
export default formsSlice.reducer;
