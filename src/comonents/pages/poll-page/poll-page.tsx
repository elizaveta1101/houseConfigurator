import React from 'react'
import { Radio, Row, Select, Table } from 'antd'

import Container from '../../container/container'

import './styles.scss'

const options = [
  { label: 'Материалы', value: 'materials' },
  { label: 'Модели', value: 'models' },
]

const PollPage: React.FC = () => {
  const onChange = (e: any) => {
    console.log('radio1 checked', e.target.value)
  }
  return (
    <Container>
      <p className="poll-page__subtitle">Раздел для редактирования</p>
      <Row justify="space-between">
        <Select placeholder="Выберет вариант">
          <Select.Option value="1">1</Select.Option>
        </Select>

        <Radio.Group
          options={options}
          onChange={onChange}
          // value={value3}
          optionType="button"
        />
      </Row>
      <Table
      // columns={columns}
      // expandable={{
      //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      //   rowExpandable: record => record.name !== 'Not Expandable',
      // }}
      // dataSource={data}
      />
      ,
    </Container>
  )
}

export default PollPage
