export type FieldType =
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "password"
  | "derived"; // ✅ added


    
export type FormField = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  derivedFrom?: string;
   helpText?: string;
  defaultValue?: string;
  validation?: {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  lengthEnabled?: boolean; // ✅ optional
  required?: boolean;      // ✅ optional
  email?: boolean;         // ✅ added for your email checkbox
  passwordRules?: Record<string, boolean>; // ✅ type fixed
  custom?: (value: string) => boolean | string;
};

};

