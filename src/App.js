import './App.css';
import HomePage from "./components/HomePage";
import MainContext from './context/MainContext';
import { useState } from 'react';
import { incomeList} from './helper/incomeList';
import { expenseList } from './helper/expenseList';

function App() {
  const [expenses, setExpenses] = useState(expenseList);
  const [totalExpense, setTotalExpense] = useState();
  const [incomes, setIncomes] = useState(incomeList);
  const [totalIncome, setTotalIncome] = useState();

  const data = {
    expenses,
    setExpenses,
    totalExpense,
    setTotalExpense,
    incomes,
    setIncomes,
    totalIncome,
    setTotalIncome
  }

  return (
    <div className="container">
      <MainContext.Provider value={data}>
        <HomePage></HomePage>
      </MainContext.Provider>
      
    </div>
  );
}

export default App;
