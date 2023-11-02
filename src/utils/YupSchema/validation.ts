import * as yup from "yup";

export const validation = {
  email_address: yup
    .string()
    .email("invalid_email_address")
    .min(5)
    .max(50)
    .matches(/^[a-zA-ZÀ-ÿ0-9._-]+@[a-zA-ZÀ-ÿ-]+\.[a-zA-ZÀ-ÿ.]{2,10}$/i, {
      message: "invalid_email_address",
    })
    .required("email_required")
    .typeError("invalid_email_address"),
  firstname: yup
    .string()
    .min(2)
    .max(20)
    .matches(/^[a-zA-Z .-]{2,20}$/, {
      message: "minimum_length_firstname",
    })
    .required("firstname_required")
    .typeError("minimum_length_firstname"),
  lastname: yup
    .string()
    .min(2)
    .max(20)
    .matches(/^[a-zA-Z .-]{2,20}$/, {
      message: "minimum_length_lastname",
    })
    .required("lastname_required"),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "minimum_length_password",
    })
    .required("password_required"),
  passwordConfirmation: yup
    .string()
    .min(8)
    .max(20)
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "minimum_length_password",
    })
    .required("password_required"),
  fullname: yup
    .string()
    .min(2)
    .max(40)
    // .matches(/(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/, {
    .matches(/^[a-zA-Z .-]{2,30}$/, {
      message: "error_fullname",
    })
    .required("fullname_required"),
  cardnumber: yup.string().max(16).required("cardnumber_required"),
  month: yup
    .string()
    .min(1)
    .max(2)
    .matches(/^(0?[1-9]|1[012])$/, {
      message: "error_month",
    })
    .required("month_required"),
  year: yup
    .string()
    .min(2)
    .max(2)
    .matches(/^(2[2-9]|[3-9][0-9])$/, {
      message: "error_year",
    })
    .required("year_required"),
  cvc: yup
    .string()
    .min(3)
    .max(3)
    .matches(/^(\d+){3}$/, {
      message: "error_cvc",
    })
    .required("cvc_required"),
  zipcode: yup.string().min(5).max(5).required("zipcode_required"),
  checkbox1: yup.boolean().oneOf([true]),
  checkbox2: yup.boolean().oneOf([true]),
};
