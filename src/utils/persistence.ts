import type { FormSchema } from '../types/models';

const STORAGE_KEY = 'upliance_forms';

export function loadFormsFromStorage(): FormSchema[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveFormsToStorage(forms: FormSchema[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}
