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

  const onSearch = (value: string) => console.log(value)

  return (
    <ContentContainer>
      <h3 className="orders-page__title">Поиск заказа</h3>
      <Input.Search
        placeholder="Введите любой параметр заказа"
        className="orders-page__search"
        allowClear
        enterButton="Найти"
        onSearch={onSearch}
      />

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
      <Input.Search
        className="orders-page__client-search"
        placeholder="0000"
        allowClear
        enterButton="Найти"
        onSearch={onSearch}
      />

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
