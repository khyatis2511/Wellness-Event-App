import * as yup from 'yup'
import { EventStatus } from '../types'

export interface CreateEventschemaInputs {
  eventName: string
  proposedDate1: string | Date
  proposedDate2: string | Date
  proposedDate3: string | Date
  proposedLocation: {
    postalCode: string
    streetName: string
  }
  vendorId: string
}

export const CreateEventschema = yup.object().shape({
  eventName: yup.string().required('Event Name is required'),
  proposedDate1: yup.date().required('Proposed Date 1 is required'),
  proposedDate2: yup.date().required('Proposed Date 2 is required'),
  proposedDate3: yup.date().required('Proposed Date 3 is required'),
  proposedLocation: yup.object().shape({
    postalCode: yup.string().required('Postal Code is required'),
    streetName: yup.string().required('Street Name is required')
  }),
  vendorId: yup.string().required('Vendor Name is required')
})

export interface UpdateEventSchemaInput {
  confirmedDate?: string
  remarks?: string
}

export const UpdateEventSchema = (status: string): any => {
  const schema: any = {}
  if (status === EventStatus.APPROVED) {
    schema.confirmedDate = yup.date().required('Confirmed Date is required')
  }
  if (status === EventStatus.REJECTED) {
    schema.remarks = yup.string().required('Remarks is required')
  }
  return yup.object().shape(schema)
}
