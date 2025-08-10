export type FieldType =
  | 'text'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'derived';

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    regex?: string;
    email?: boolean;
  };
  derivedConfig?: any;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: BaseField[];
}
