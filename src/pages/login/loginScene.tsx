/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Form, Input } from 'antd'
import React, { type FC } from 'react'
import { Controller, type Control, type FieldErrors, type SubmitHandler, type UseFormHandleSubmit } from 'react-hook-form'
import { type LoginSchemaInputs } from '../../utils/schema/loginSchema'

interface LoginSceneProps {
  handleSubmit: UseFormHandleSubmit<LoginSchemaInputs>
  onSubmit: SubmitHandler<LoginSchemaInputs>
  errors: FieldErrors<LoginSchemaInputs>
  control: Control<LoginSchemaInputs>
  submitLoading: boolean
}

const LoginScene: FC<LoginSceneProps> = (props) => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    control,
    submitLoading
  } = props

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Email"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email ? errors.email.message : ''}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Enter your email" />}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password ? errors.password.message : ''}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input.Password {...field} placeholder="Enter your password" />}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginScene
