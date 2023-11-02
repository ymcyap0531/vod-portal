import { AnyObjectSchema } from "yup";

export function merge(...schemas: { [key: string]: any }[]): AnyObjectSchema {
  const [first, ...rest] = schemas;
  const merged = rest.reduce(
    (mergedSchemas, schema) => mergedSchemas.concat(schema),
    first
  );

  //@ts-ignore
  return merged;
}

export function mergeSettings(
  ...settings: { [key: string]: any }[]
): AnyObjectSchema {
  const [defaultSettings, localeSettings] = settings;
  const merged = { ...defaultSettings, ...localeSettings };

  //@ts-ignore
  return merged;
}
