import * as yup from 'yup'

export interface LoginSchemaInputs {
  email: string
  password: string
}

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})
