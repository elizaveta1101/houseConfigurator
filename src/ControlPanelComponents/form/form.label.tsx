import React from 'react'

import './styles.scss'

interface IFormLabelProps {
  labelHandler: React.Dispatch<React.SetStateAction<boolean>>
  element: React.MutableRefObject<any>
  copyMode: boolean
  label: string
}

const FormLabel: React.FC<IFormLabelProps> = ({ labelHandler, element, label, copyMode }) => {
  const copyHandler = () => {
    labelHandler(false)
    setTimeout(() => {
      element.current.select()
      document.execCommand('copy')
      labelHandler(true)
    }, 100)
  }

  return (
    <h4 className="form-layout__input-label">
      {label}
      {copyMode && (
        <button onClick={copyHandler} className="form-layout__copy-button">
          Копировать
        </button>
      )}
    </h4>
  )
}

export default FormLabel
