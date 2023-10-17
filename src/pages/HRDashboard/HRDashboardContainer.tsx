/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type FC, useState, useEffect } from 'react'
import HRDashboardScene from './HRDashboardScene'
import { Button } from 'antd'
import { getEventListAPI, getVendorListAPI } from '../../utils/api'

const HRDashboardContainer: FC = () => {
  const [tableloading, setTableLoading] = useState(false)
  const [HREventList, setHREventList]: any = useState(null)
  const [eventData, setEventData] = useState([])
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isCreateEventModelOpen, setIsCreateEventModelOpen] = useState(false)
  const [vendorsData, setVendorData] = useState(null)

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName'
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      key: 'vendorName'
    },
    {
      title: 'Confirmed Date',
      dataIndex: 'confirmedDate',
      key: 'confirmedDate',
      render: (text: any, record: any) => {
        if (record.confirmedDate) {
          return (
            <span>{record.confirmedDate}</span>
          )
        } else {
          return (
            <>
            {record.proposedDates?.map((date: string) => <p key={date}>{date}</p>)}
            </>
          )
        }
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => action(record)
    }
  ]

  const handleModal = (record: any): any => {
    setIsModelOpen(true)
    const selectedEvt = HREventList.find((evt: any) => evt?.id === record?.id)
    setSelectedEvent(selectedEvt)
  }

  const closeModel = (): void => {
    setIsModelOpen(false)
    setSelectedEvent(null)
  }

  const closeCreateEventModel = (): void => {
    getHREvents(false)
    setIsCreateEventModelOpen(false)
  }

  const action = (record: any): any => (
    <Button type="primary" onClick={() => handleModal(record)}>View</Button>
  )

  const getHREvents = async (showLoader: boolean): Promise<any> => {
    try {
      setTableLoading(showLoader)
      const eventRes = await getEventListAPI()
      if (eventRes) {
        setHREventList(eventRes)
      }
      setTableLoading(false)
    } catch (error) {
      setTableLoading(false)
      console.error('get HR event error : ', error)
    }
  }

  const getVendorList = async (): Promise<any> => {
    try {
      const res = await getVendorListAPI()
      if (res?.status === 'success') {
        const vendors = res?.data && res?.data?.length > 0
          ? res?.data?.map((vendor: any) => ({
            value: vendor?.id,
            label: vendor?.name
          }))
          : null
        setVendorData(vendors)
      }
    } catch (error) {
      console.error('get vendor list : ', error)
    }
  }

  useEffect(() => {
    getHREvents(true)
    getVendorList()
  }, [])

  useEffect(() => {
    if (HREventList && HREventList?.length > 0) {
      const updateEventData = HREventList.map((event: any) => ({
        id: event?.id,
        eventName: event?.name,
        vendorName: event?.vendor?.name,
        confirmedDate: event?.confirmedDate,
        proposedDates: event?.proposedDates,
        status: event?.status,
        createdAt: event?.createdAt
      }))
      setEventData(updateEventData)
    }
  }, [HREventList])

  return (
    <HRDashboardScene {...{
      data: eventData,
      tableloading,
      columns,
      isModelOpen,
      selectedEvent,
      closeModel,
      isCreateEventModelOpen,
      setIsCreateEventModelOpen,
      vendorsData,
      closeCreateEventModel
    }} />
  )
}

export default HRDashboardContainer
