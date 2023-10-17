/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type FC, useState, useEffect } from 'react'
import VendorDashboardScene from './vendorDashboardScene'
import { getEventListAPI } from '../../utils/api'
import { Button } from 'antd'
import { formatDate } from '../../utils/helpers'

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
      key: 'createdAt',
      render: (text: any, record: any) => formatDate(record.createdAt)
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
    setEventAction(null)
    setIsModelOpen(false)
    setSelectedEvent(null)
  }

  const updateCloseModel = (): void => {
    setEventAction(null)
    setIsModelOpen(false)
    setSelectedEvent(null)
    getVenderEvents(false)
  }

  const action = (record: any): any => (
    <Button type="primary" onClick={() => handleModal(record)}>View</Button>
  )

  const getVenderEvents = async (showLoader: boolean): Promise<any> => {
    try {
      setTableLoading(showLoader)
      const eventRes = await getEventListAPI()
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
    getVenderEvents(true)
  }, [])

  useEffect(() => {
    if (HREventList && HREventList?.length > 0) {
      const updateEventData = HREventList.map((event: any) => ({
        id: event.id,
        eventName: event?.name,
        vendorName: event?.vendor?.name,
        confirmedDate: event?.confirmedDate,
        proposedDates: event?.proposedDates,
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
      updateCloseModel,
      setEventAction,
      eventAction
    }} />
  )
}

export default VendorDashboardContainer
