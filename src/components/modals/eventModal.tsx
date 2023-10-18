/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react'
import { Form, Input, DatePicker, Button, Select } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Modal from '../Modal'
import dayjs from 'dayjs'
import { LayoutContext, toasterConfig } from '../context/layoutContext'
import { createEventAPI } from '../../utils/api'
import { formatDate } from '../../utils/helpers'
import { SUCCESS_MESSAGE, dateFormat } from '../../utils/constants'
import { CreateEventschema, type CreateEventschemaInputs } from '../../utils/schema/eventSchema'
import { type DropdownObject } from '../../utils/types'
import { toast } from 'react-toastify'
interface EventFormProps {
  isModelOpen: boolean
  onClose: () => void
  vendorOption: DropdownObject[]
  onSubmitClose: () => void
}

const EventForm: React.FC<EventFormProps> = ({ isModelOpen, onClose, onSubmitClose, vendorOption }) => {
  const [isSubmitLoading, setSubmitLoading] = useState(false)

  const { loginUserData } = useContext(LayoutContext)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CreateEventschema)
  })

  const onSubmit = async (values: CreateEventschemaInputs): Promise<void> => {
    try {
      setSubmitLoading(true)
      const payload = {
        name: values?.eventName,
        createdBy: loginUserData?.id,
        proposedDates: [
          formatDate(values?.proposedDate1 as string),
          formatDate(values?.proposedDate2 as string),
          formatDate(values?.proposedDate3 as string)
        ],
        proposedLocation: values?.proposedLocation,
        vendorId: values?.vendorId
      }
      const res = await createEventAPI(payload)
      if (res?.status === 'success') {
        onSubmitClose()
        toast.success(SUCCESS_MESSAGE.event.create, toasterConfig)
      }
      setSubmitLoading(false)
    } catch (error: any) {
      setSubmitLoading(false)
      toast.error(error.message, toasterConfig)

      console.error('onsubmit event: ', error)
    }
  }

  return (
    <Modal isOpen={isModelOpen} onClose={onClose}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Event Name"
          validateStatus={errors.eventName ? 'error' : ''}
          help={errors.eventName?.message}
        >
          <Controller
            name="eventName"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Event Name" />}
          />
        </Form.Item>
        <Form.Item
          label="Proposed Date 1"
          validateStatus={errors.proposedDate1 ? 'error' : ''}
          help={errors.proposedDate1?.message}
        >
          <Controller
            name="proposedDate1"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                format={dateFormat}
                onChange={(date, dateString) => {
                  field.onChange(date ? dayjs(date).toDate() : null)
                  // setValue('proposedDate1', dateString)
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Proposed Date 2"
          validateStatus={errors.proposedDate2 ? 'error' : ''}
          help={errors.proposedDate2?.message}
        >
          <Controller
            name="proposedDate2"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                format={dateFormat}
                onChange={(date, dateString) => {
                  field.onChange(date ? dayjs(date).toDate() : null)
                  // setValue('proposedDate2', dateString)
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Proposed Date 3"
          validateStatus={errors.proposedDate3 ? 'error' : ''}
          help={errors.proposedDate3?.message}
        >
          <Controller
            name="proposedDate3"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                format={dateFormat}
                onChange={(date, dateString) => {
                  field.onChange(date ? dayjs(date).toDate() : null)
                  // setValue('proposedDate3', dateString)
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Proposed Location"
          validateStatus={
            errors.proposedLocation ? 'error' : ''
          }
          help={
            (errors.proposedLocation?.postalCode?.message ?? errors.proposedLocation?.streetName?.message)
          }
        >
          <Controller
            name="proposedLocation.postalCode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Postal Code" />
            )}
          />
          <Controller
            name="proposedLocation.streetName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Street Name" />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Vendor Name"
          validateStatus={errors.vendorId ? 'error' : ''}
          help={errors.vendorId?.message}
        >
          <Controller
            name="vendorId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={(<>Select Vendor</>)}
                style={{ width: 120 }}
                options={vendorOption}
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EventForm
