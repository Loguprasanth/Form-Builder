export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "password";
    
export type FormField = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  derivedFrom?: string; // for derived fields
};
