import React from 'react'
import './FormCard.scss'
import { Card } from 'antd'

const FormCard = ({children, className}) => {
  return (
    <Card className={`form-card ${className}`}>
      {children}
    </Card>
  )
}

export default FormCard