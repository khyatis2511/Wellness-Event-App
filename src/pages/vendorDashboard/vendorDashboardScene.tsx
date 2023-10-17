import { Button } from 'antd'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import Modal from '../../components/Modal'
import TableComponent from '../../components/TableComponent'
import UpdateEventForm from '../../components/modals/updateEventModal'
import { EventStatus } from '../../utils/types'

interface VendorDashboardSceneProps {
  data: any
  columns: any
  tableloading: boolean
  isModelOpen: boolean
  selectedEvent: any
  closeModel: () => void
  updateCloseModel: () => void
  eventAction: string | null
  setEventAction: Dispatch<SetStateAction<string | null>>
}

const VendorDashboardScene: FC<VendorDashboardSceneProps> = (props) => {
  const {
    data,
    columns,
    tableloading,
    isModelOpen,
    selectedEvent,
    closeModel,
    updateCloseModel,
    eventAction,
    setEventAction
  } = props
  return (
    <div>
      <TableComponent dataSource={data} columns={columns} loading={tableloading} />
      <Modal isOpen={isModelOpen} onClose={closeModel}>
        <h2>Event Name: {selectedEvent?.name}</h2>
        <h3>Location: </h3>
        <p>Postal Code: {selectedEvent?.proposedLocation?.postalCode}</p>
        <p>Street Name: {selectedEvent?.proposedLocation?.streetName}</p>
        {selectedEvent?.status === EventStatus.PENDING &&
        <>
          <Button type="primary" onClick={() => { setEventAction(EventStatus.APPROVED) }}>
            Apporve
          </Button>
          <Button type="primary" onClick={() => { setEventAction(EventStatus.REJECTED) }}>
            Reject
          </Button>
        </>}
        {eventAction && (
          <UpdateEventForm
          status={eventAction}
          eventId={selectedEvent?.id}
          onClose={updateCloseModel}
          proposedDates={selectedEvent?.proposedDates}
          />
        )}
      </Modal>
    </div>
  )
}

export default VendorDashboardScene
