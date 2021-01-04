import React from 'react'
import { Checkbox } from 'antd'

import { data } from './data'

import './styles.scss'

interface IRightsComponentProps {
  disabled?: boolean
}

const RightsComponent: React.FC<IRightsComponentProps> = ({
  disabled = true,
}: IRightsComponentProps) => (
  <div className="rights-wrapper">
    {data.map(({ id, text, checked }) => (
      <Checkbox.Group
        key={id}
        defaultValue={checked ? [text] : ['']}
        disabled={disabled}
        options={[text]}
        className="rights-checkbox"
      />
    ))}
  </div>
)

export default RightsComponent
