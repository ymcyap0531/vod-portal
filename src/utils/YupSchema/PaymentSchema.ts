import * as yup from "yup";
import { FormLocale } from "./types";
import { validation } from "./validation";

const default_schema = {
  settings: {
    fullname: {
      type: "text",
      minlength: 2,
      maxLength: "20",
    },
    cardnumber: {
      type: "tel",
      maxLength: "16",
    },
    month: {
      type: "tel",
      minLength: 1,
      maxLength: "2",
    },
    year: {
      type: "tel",
      minLength: 2,
      maxLength: "2",
    },
    cvc: {
      type: "tel",
      minLength: 3,
      maxLength: "3",
    },
    zipcode: {
      type: "text",
      minLength: 5,
      maxLength: "5",
    },
    checkbox1: {
      type: "checkbox",
    },
    checkbox2: {
      type: "checkbox",
    },
  },

  schema: yup
    .object({
      fullname: validation.fullname,
      cardnumber: validation.cardnumber,
      month: validation.month,
      year: validation.year,
      cvc: validation.cvc,
      zipcode: validation.zipcode,
      checkbox1: validation.checkbox1,
      checkbox2: validation.checkbox2,
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
