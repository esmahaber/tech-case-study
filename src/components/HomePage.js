import React from 'react'
import Expenses from './Expenses';
import Incomes from './Incomes';

export default function HomePage() {
  return (
  <div className="row">
    <div></div>
    <div className='col-md-6'>
      <Incomes/>
    </div>
    <div className='col-md-6'>
      <Expenses/>
    </div>
  </div>
  )
}
