import { useContext, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import MainContext from '../context/MainContext';

Chart.register(CategoryScale)

const options = {
  responsive: true,
  legend: {
    display: false,
  },
  type: 'bar',
}

export default function Forecaste() {
  const { expenseWeeklyAmount, expenseMonthlyAmount, expenseYearlyAmount,
    incomeWeeklyAmount, incomeMonthlyAmount, incomeYearlyAmount } = useContext(MainContext);

  const [open, setOpen] = useState(false);

  let data = {
    labels: ['Weekly', 'Monthly', 'Yearly'],
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: '#dd4a48',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.7)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [expenseWeeklyAmount, expenseMonthlyAmount, expenseYearlyAmount]
      },
      {
        label: 'Incomes',
        backgroundColor: '#019267',
        borderColor: '#067b58',
        borderWidth: 1,
        hoverBackgroundColor: '#30ce9edb',
        hoverBorderColor: '#29bc90fe',
        data: [incomeWeeklyAmount, incomeMonthlyAmount, incomeYearlyAmount]
      }
    ]
  }
  return (
    <div className='col-md-12'>
      <div className='top-button'>
        <button className='tech-primary' onClick={() => setOpen(prev => !prev)}>
          Show Forecaste
        </button>
      </div>
      <Collapse in={open}>
        <div id="forecaste-collapse">
          <div className='bar-area'>
            <Bar
              data={data}
              width={null}
              height={null}
              options={options}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
}