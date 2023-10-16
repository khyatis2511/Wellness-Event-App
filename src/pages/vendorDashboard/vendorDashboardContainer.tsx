/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type FC, useState, useEffect } from 'react'
import VendorDashboardScene from './vendorDashboardScene'
import { getHREventAPI } from '../../utils/api'
import { Button } from 'antd'

const VendorDashboardContainer: FC = () => {
  const [tableloading, setTableLoading] = useState(false)
  const [HREventList, setHREventList]: any = useState(null)
  const [eventData, setEventData] = useState([])
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventAction, setEventAction] = useState<string | null>(null)

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
      render: (text: any, record: any) => (
        <span>{record.confirmedDate}</span>
      )
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
    getHREvents(false)
  }

  const action = (record: any): any => (
    <Button type="primary" onClick={() => handleModal(record)}>View</Button>
  )

  const getHREvents = async (showLoader: boolean): Promise<any> => {
    try {
      setTableLoading(showLoader)
      const eventRes = await getHREventAPI()
      if (eventRes) {
        setHREventList(eventRes)
      }
      setTableLoading(false)
    } catch (error) {
      console.error('get HR event error : ', error)
      setTableLoading(false)
    }
  }

  useEffect(() => {
    getHREvents(true)
  }, [])

  useEffect(() => {
    if (HREventList && HREventList?.length > 0) {
      const updateEventData = HREventList.map((event: any) => ({
        id: event.id,
        eventName: event?.name,
        vendorName: event?.vendor?.name,
        confirmedDate: event?.confirmedDate,
        status: event?.status,
        createdAt: event.createdAt
      }))
      setEventData(updateEventData)
    }
  }, [HREventList])

  return (
    <VendorDashboardScene {...{
      data: eventData,
      tableloading,
      columns,
      isModelOpen,
      selectedEvent,
      closeModel,
      setEventAction,
      eventAction
    }} />
  )
}

export default VendorDashboardContainer
