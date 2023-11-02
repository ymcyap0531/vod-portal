import * as yup from "yup";
import { FormLocale } from "./types";
import { validation } from "./validation";

const default_schema = {
  settings: {
    firstname: {
      type: "text",
      minlength: 2,
      maxLength: "20",
    },
    lastname: {
      type: "text",
      minLength: 2,
      maxLength: "20",
    },
    email_address: {
      type: "text",
      minLength: 5,
      maxLength: "50",
    },
    password: {
      type: "password",
      minLength: 8,
      maxLength: "20",
    },
    checkbox1: {
      type: "checkbox"
    }
  },

  schema: yup
    .object({
      email_address: validation.email_address,
      firstname: validation.firstname,
      lastname: validation.lastname,
      password: validation.password,
      checkbox1: validation.checkbox1
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
