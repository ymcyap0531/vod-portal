import * as yup from "yup";
import { FormLocale } from "./types";
import { validation } from "./validation";

const default_schema = {
  settings: {
    password: {
      type: "password",
      minLength: 8,
      maxLength: "20",
    },
    passwordConfirmation: {
      type: "password",
      minLength: 8,
      maxLength: "20",
    },
  },

  schema: yup
    .object({
      password: validation.password,
      passwordConfirmation: validation.passwordConfirmation,
    })
    .required(),
};

const en_US: FormLocale = {
  settings: {},
  schema: yup.object({}),
};

export const nl_NL = {
  settings: {},
  schema: yup.object().shape({}),
};

export const schemas = {
  default_schema,
  nl_NL,
  en_US,
};
