/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { updateEventAPI } from '../../utils/api'
import { dateFormat } from '../../utils/constants'
import { formatDate } from '../../utils/helpers'
import { UpdateEventSchema, type UpdateEventSchemaInput } from '../../utils/schema/eventSchema'
import { EventStatus } from '../../utils/types'

interface UpdateEventFormProps {
  status: string
  eventId: string
  onClose: () => void
}

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({ status, eventId, onClose }) => {
  const [isSubmitLoading, setSubmitLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UpdateEventSchema(status))
  })

  const onSubmit = async (values: UpdateEventSchemaInput): Promise<any> => {
    try {
      setSubmitLoading(true)
      const payload: any = {
        status
      }
      if (status === EventStatus.APPROVED) {
        payload.confirmedDate = formatDate(values?.confirmedDate as string)
      }
      if (status === EventStatus.REJECTED) {
        payload.remarks = values?.remarks
      }
      const res = await updateEventAPI({ eventId, payload })
      if (res?.status === 'success') {
        onClose()
      }
      setSubmitLoading(false)
    } catch (error) {
      setSubmitLoading(false)
      console.error('onsubmit event: ', error)
    }
  }

  return (
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {status === EventStatus.REJECTED && <Form.Item
          label="Remarks"
          validateStatus={errors.remarks ? 'error' : ''}
          help={errors.remarks?.message as string}
        >
          <Controller
            name="remarks"
            control={control}
            render={({ field }) => <Input.TextArea {...field} placeholder="Remarks" rows={3} />}
          />
        </Form.Item>}
        {status === EventStatus.APPROVED && <Form.Item
          label="Confirmed Date"
          validateStatus={errors.confirmedDate ? 'error' : ''}
          help={errors.confirmedDate?.message as string}
        >
          <Controller
            name="confirmedDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                format={dateFormat}
                onChange={(date) => {
                  field.onChange(date ? dayjs(date).toDate() : null)
                }}
              />
            )}
          />
        </Form.Item>}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
  )
}

export default UpdateEventForm
