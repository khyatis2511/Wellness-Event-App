import React, { type Dispatch, type SetStateAction, type FC } from 'react'
import TableComponent from '../../components/TableComponent'
import Modal from '../../components/Modal'
import { Button } from 'antd'
import EventForm from '../../components/modals/eventModal'

interface HRDashboardSceneProps {
  data: any
  columns: any
  tableloading: boolean
  isModelOpen: boolean
  selectedEvent: any
  closeModel: () => void
  isCreateEventModelOpen: boolean
  setIsCreateEventModelOpen: Dispatch<SetStateAction<boolean>>
  vendorsData: any
  closeCreateEventModel: () => void
}

const HRDashboardScene: FC<HRDashboardSceneProps> = (props) => {
  const {
    data,
    columns,
    tableloading,
    isModelOpen,
    selectedEvent,
    closeModel,
    isCreateEventModelOpen,
    setIsCreateEventModelOpen,
    vendorsData,
    closeCreateEventModel
  } = props

  return (
    <div>
      <Button type="primary" onClick={() => { setIsCreateEventModelOpen(true) }}>
        Create Event
      </Button>
      <TableComponent dataSource={data} columns={columns} loading={tableloading} />
      <Modal isOpen={isModelOpen} onClose={closeModel}>
        <h1>{selectedEvent?.eventName}</h1>
      </Modal>
      <EventForm
        isModelOpen={isCreateEventModelOpen}
        onClose={closeCreateEventModel}
        vendorOption={vendorsData}
      />
    </div>
  )
}

export default HRDashboardScene
