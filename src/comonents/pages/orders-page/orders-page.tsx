import React from 'react'
import { Input, Table } from 'antd'

import { formData, tableColumns } from './data'

import ContentContainer from '../../content-container/content-container'
import CreatingLayout from '../../creating-layout/creating-layout'
import CustomButton from '../../button/button'

import './styles.scss'

const OrdersPage: React.FC = () => {
  const data = []
  for (let i = 0; i < 100; i++) {
    data.push({
      key: String(i),
      orderNumber: String(i),
      clientId: String(i * 3),
      status: 'вып.',
      coast: '25 000',
      date: '25.12.2020.',
    })
  }

  const onSearch = (e: any) => console.log(e.target.value)

  return (
    <ContentContainer>
      <h3 className="orders-page__title">Поиск заказа</h3>
      <div className="house-finish-page__search-wrapper">
        <Input placeholder="Введите любой параметр заказа" onChange={onSearch} />
        <CustomButton
          modifier={'house-finish-page__search-button'}
          text={'Найти'}
          clickHandler={() => {}}
        />
      </div>

      <Table
        className="orders-page__tabel"
        rowClassName="orders-page__table-row"
        columns={tableColumns}
        dataSource={data}
        pagination={{ position: ['bottomLeft'] }}
        scroll={{ x: '100%', y: 420 }}
        size="small"
      />

      <h3 className="orders-page__subtitle">Поиск клиента по id</h3>
      <div className="house-finish-page__search-wrapper house-finish-page__search_client">
        <Input placeholder="0000" onChange={onSearch} />
        <CustomButton
          modifier={'house-finish-page__search-button'}
          text={'Найти'}
          clickHandler={() => {}}
        />
      </div>

      <h3 className="orders-page__subtitle">Результаты поиска</h3>
      <CreatingLayout data={formData} mode={'disable'} />

      <CustomButton
        modifier={'orders-page__button'}
        text={'Написать письмо'}
        clickHandler={() => {}}
      />
    </ContentContainer>
  )
}

export default OrdersPage
