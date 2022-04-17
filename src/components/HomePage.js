import React, {useContext} from 'react'
import Expenses from './Expenses';
import Incomes from './Incomes';
import MainContext from '../context/MainContext';
import Forecaste from './Forecaste';

export default function HomePage() {
  const {totalAmount} = useContext(MainContext);

  return (
  <div className="row">
    <div className='total-balance-area col-12'>
      <div className='total-balance'>Total Balance: <span className={totalAmount > 0 ? 'positive' : 'negative'}>{totalAmount}</span></div>
    </div>
    <Forecaste/>
    <div className='col-md-6 incomes-area'>
      <Incomes/>
    </div>
    <div className='col-md-6 expenses-area'>
      <Expenses/>
    </div>
  </div>
  )
}
