import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const BasicSchema = yup.object().shape({
  email: yup.string().default("").email("Please enter a valid email").required("Champ Obligatoire !!!"),
  lastname:yup.string().required("Champ Obligatoire !!!"),
  pwd: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Champ Obligatoire !!!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Champ Obligatoire !!!"),
 username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Champ Obligatoire !!!"),
name:yup
.string()
.max(3, "Username must be at least 3 characters long")
.required("Champ Obligatoire !!!"),
});


