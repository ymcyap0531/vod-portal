import { OptionalObjectSchema } from "yup/lib/object";

export interface FormLocale {
  // settings?: FormRenderSettings;
  settings?: any;
  schema?: OptionalObjectSchema<any>;
}
