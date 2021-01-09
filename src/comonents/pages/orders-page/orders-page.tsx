import React from 'react'
// import { Input, Table } from 'antd'

// import { formClientData, formOrderData, tableColumns } from './data'
// import { IOrder } from '../../../data/types'

import Container from '../../container/container'
// import Overlay from '../../overlay/overlay'
// import Button from '../../button/button'
// import Popup from '../../popup/popup'
// import Form from '../../form/form'

import './styles.scss'

const OrdersPage: React.FC = () => {
  // const [currOrder, setCurrOreder] = useState<IOrder>()
  // const [isOpenPopup, setIsOpenpopup] = useState(false)

  // const data = []
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: String(i),
  //     orderNumber: String(i),
  //     clientId: String(i * 3),
  //     status: 'вып.',
  //     coast: '25 000',
  //     date: '25.12.2020.',
  //   })
  // }

  // const onSearch = (value: string) => console.log(value)
  // const orderHandler = (order: IOrder) => {
  //   setCurrOreder(order)
  //   setIsOpenpopup(true)
  // }

  return (
    <Container>
      {/* <h3 className="orders-page__title">Поиск заказа</h3>
      <Input.Search
        placeholder="Введите любой параметр заказа"
        className="orders-page__search"
        enterButton="Найти"
        onSearch={onSearch}
        allowClear
      />

      <Table
        pagination={{ position: ['bottomLeft'] }}
        onRow={(order) => {
          return {
            onClick: () => orderHandler(order),
          }
        }}
        rowClassName="orders-page__table-row"
        className="orders-page__tabel"
        scroll={{ x: '100%', y: 420 }}
        columns={tableColumns}
        dataSource={data}
        size="small"
      />

      <h3 className="orders-page__subtitle">Поиск клиента по id</h3>
      <Input.Search
        className="orders-page__client-search"
        enterButton="Найти"
        onSearch={onSearch}
        placeholder="0000"
        allowClear
      />

      <h3 className="orders-page__subtitle">Результаты поиска</h3>
      <Form data={formClientData} mode={'disable'} />

      <Button modifier={'orders-page__button'} text={'Написать письмо'} clickHandler={() => {}} />

      <Overlay isOpen={isOpenPopup}>
        <Popup modifier={'orders-page__popup'} type="orders">
          <Form data={formOrderData} values={currOrder} mode="disable" />
        </Popup>
      </Overlay> */}
    </Container>
  )
}

export default OrdersPage
