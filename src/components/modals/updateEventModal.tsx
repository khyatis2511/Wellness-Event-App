/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { updateEventAPI } from '../../utils/api'
import { formatDate } from '../../utils/helpers'
import { UpdateEventSchema, type UpdateEventSchemaInput } from '../../utils/schema/eventSchema'
import { type DropdownObject, EventStatus } from '../../utils/types'
import { SUCCESS_MESSAGE } from '../../utils/constants'
import { toasterConfig } from '../context/layoutContext'
import { toast } from 'react-toastify'

interface UpdateEventPayload {
  status: string
  confirmedDate?: string
  remarks?: string
}

interface UpdateEventFormProps {
  status: string
  eventId: string
  onClose: () => void
  proposedDates: string[]

}

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({ status, eventId, onClose, proposedDates }) => {
  const [isSubmitLoading, setSubmitLoading] = useState(false)
  const [dateOption, setDateOption] = useState<DropdownObject[] | []>([])

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UpdateEventSchema(status))
  })

  const onSubmit = async (values: UpdateEventSchemaInput): Promise<void> => {
    try {
      setSubmitLoading(true)
      const payload: UpdateEventPayload = {
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
        toast.success(SUCCESS_MESSAGE.event.update, toasterConfig)
      }
      setSubmitLoading(false)
    } catch (error: any) {
      setSubmitLoading(false)
      toast.error(error.message, toasterConfig)
      console.error('onsubmit event: ', error)
    }
  }

  useEffect(() => {
    if (proposedDates && proposedDates?.length > 0) {
      const dateOpt = proposedDates.map((date: string) => ({
        value: date,
        label: date
      }))
      setDateOption(dateOpt)
    } else {
      setDateOption([])
    }
  }, [proposedDates])

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
              <Select
                {...field}
                placeholder="Select Confirmed Date"
                style={{ width: 120 }}
                options={dateOption}
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
