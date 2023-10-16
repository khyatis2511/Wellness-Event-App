// HRDashboard.js

import { Table } from 'antd'
import React, { type FC } from 'react'

interface TableComponentProps {
  dataSource: any[]
  columns: any[]
  loading: boolean
}

const TableComponent: FC<TableComponentProps> = ({ dataSource, columns, loading }) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} locale={{ emptyText: 'No Records Found' }} loading={loading} />
    </div>
  )
}

export default TableComponent
