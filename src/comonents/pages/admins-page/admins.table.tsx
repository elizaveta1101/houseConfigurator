import React from 'react'
import { Pagination, Table } from 'antd'

import { IAdmin } from '../../../data/types'
import { tableColumns } from './data'

interface IAdminsTableProps {
  paginationHandler: (pageNumber: number) => void
  adminHandler: (admin: IAdmin) => void
  loading: boolean
  data: IAdmin[]
  total: number
}

const AdminsTable: React.FC<IAdminsTableProps> = ({
  paginationHandler,
  adminHandler,
  loading,
  total,
  data,
}) => (
  <>
    <Table
      className="admins-page__tabel"
      rowClassName="admins-page__table-row"
      columns={tableColumns}
      dataSource={data}
      onRow={(admin) => {
        return {
          onClick: () => adminHandler(admin),
        }
      }}
      loading={loading}
      pagination={{ position: ['bottomLeft'] }}
      scroll={{ x: '100%', y: 420 }}
      size="small"
    />
    <Pagination size="small" total={total} onChange={paginationHandler} />
  </>
)

export default AdminsTable
