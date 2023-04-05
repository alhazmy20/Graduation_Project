import React from 'react'
import './NoData.scss'
import no_data from '../../../assets/svg/no_data.svg'

const NoData = ({text}) => {
  return (
    <div className='no-data'>
    <img src={no_data} alt={text} />
    <h1>{text}</h1>
    </div>
  )
}

export default NoData