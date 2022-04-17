import './App.css';
import HomePage from "./components/HomePage";
import MainContext from './context/MainContext';
import { useState, useEffect } from 'react';
import { incomeList} from './helper/incomeList';
import { expenseList } from './helper/expenseList';

function App() {
  const [expenses, setExpenses] = useState(expenseList);
  const [totalExpense, setTotalExpense] = useState();
  const [incomes, setIncomes] = useState(incomeList);
  const [totalIncome, setTotalIncome] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [expenseWeeklyAmount, setExpenseWeeklyAmount] = useState(0);
  const [expenseMonthlyAmount, setExpenseMonthlyAmount] = useState(0);
  const [expenseYearlyAmount, setExpenseYearlyAmount] = useState(0);
  const [incomeWeeklyAmount, setIncomeWeeklyAmount] = useState(0);
  const [incomeMonthlyAmount, setIncomeMonthlyAmount] = useState(0);
  const [incomeYearlyAmount, setIncomeYearlyAmount] = useState(0);

  const data = {
    expenses,
    setExpenses,
    totalExpense,
    setTotalExpense,
    incomes,
    setIncomes,
    totalIncome,
    setTotalIncome,
    totalAmount,
    expenseWeeklyAmount,
    expenseMonthlyAmount,
    expenseYearlyAmount,
    incomeWeeklyAmount,
    incomeMonthlyAmount,
    incomeYearlyAmount
  }

  useEffect(() => {
    let totalAmount = totalIncome - totalExpense;
    setTotalAmount(totalAmount);

    let expenseWeekly = 0;
    let expenseMonthly = 0;
    let expenseYearly = 0;
    let incomeWeekly = 0;
    let incomeMonthly = 0;
    let incomeYearly = 0;

    expenses.map((expense) => {
      if(expense.recurrent){
        if(expense.type == 'weekly'){
          expenseWeekly += expense.amount * expense.number;
        }else if(expense.type == 'monthly'){
          expenseMonthly += expense.amount * expense.number;
        }else if(expense.type == 'yearly'){
          expenseYearly += expense.amount * expense.number;
        }
      }else{
        expenseYearly += expense.amount
      }

    });

    setExpenseWeeklyAmount(expenseWeekly);
    setExpenseMonthlyAmount(expenseMonthly);
    setExpenseYearlyAmount(expenseYearly);

    incomes.map((income) => {
      if(income.recurrent){
        if(income.type == 'weekly'){
          incomeWeekly += income.amount * income.number;
        }else if(income.type == 'monthly'){
          incomeMonthly += income.amount * income.number;
        }else if(income.type == 'yearly'){
          incomeYearly += income.amount * income.number;
        }
      }else{
        incomeYearly += income.amount
      }

    });

    setIncomeWeeklyAmount(incomeWeekly);
    setIncomeMonthlyAmount(incomeMonthly);
    setIncomeYearlyAmount(incomeYearly);

  },[totalIncome,totalExpense]);



  return (
    <div className="container">
      <MainContext.Provider value={data}>
        <HomePage></HomePage>
      </MainContext.Provider>
    </div>
  );
}

export default App;
