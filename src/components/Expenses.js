import React from 'react'
import {Collapse, ButtonGroup, Form} from 'react-bootstrap';
import { useState,useEffect, useContext } from 'react';
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { recurrentType } from '../helper/recurrentType'
import MainContext from '../context/MainContext';


export default function Expenses() {
    const {expenses, setExpenses, totalExpense, setTotalExpense} = useContext(MainContext);

    const [open, setOpen] = useState(false);    
    const [expense, setExpense] = useState('');
    const [amount, setAmount] = useState();
    const [text, setText] = useState();
    const [recurrent, setRecurrent] = useState(false);
    const [number, setNumber] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        if(expenses.length > 0){
            var total = 0;
            expenses.map((expense) => {
                if(expense.recurrent)
                    total += parseInt(expense.amount * expense.number);
                else
                    total += parseInt(expense.amount);
            });
            setTotalExpense(total);
        }
    },[]);

    useEffect(() => {
        var newExpenses = [...expenses, expense];
        if(expense.text != null && expense.text != '' && expense.text != undefined){
            setExpenses(newExpenses);

            var total = totalExpense;
            if(expense.recurrent)
                total += parseInt(expense.amount * expense.number);
            else
                total += parseInt(expense.amount);

            setTotalExpense(total);
        }
        
    },[expense]);

    var onChangeExpense = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        switch(e.target.name){
            case 'text':
                setText(e.target.value);
                break;
            case 'amount':
                setAmount(e.target.value);
                break;
            case 'number':
                setNumber(e.target.value);
                break;
            case 'type':
                setType(e.target.value);
                break;
            default:
                break;
        }
        
    }

    var addExpense = (e) => {
        e.preventDefault();
        var newExpense = {};
        newExpense.text = text;
        newExpense.amount = amount;
        newExpense.number = number;
        newExpense.type = type;
        newExpense.recurrent = recurrent;

        setExpense(newExpense);
    }
      
    var findRecurrentType = (type) => {
        var recurrent = type;
        return recurrentType[recurrent];
    }

  return (
    <div>
        <div className='top-button'>
            <button className='tech-primary' onClick={() => setOpen(!open)}>
                New Expenses
            </button>
        </div>
       
        <Collapse in={open}>
            <div id="expenses-collapse">
                <div className='input-group'>
                    <input className='col-6 new-expenses' name="text" placeholder='Add New Expenses' onChange={(e)=>onChangeExpense(e)}/>
                    <input type="number" className='col-3 new-expenses' name="amount" placeholder='Amount' onChange={(e)=>onChangeExpense(e)}/>
                    <button className='col-3 tech-secondary add-button' onClick={(e)=>addExpense(e)} >Add</button>
                </div>
                <ButtonGroup>
                    <Form.Check
                        inline
                        label="Expense"
                        name="recurrent"
                        type="checkbox"
                        id="recurrent"
                        onChange={(e) => setRecurrent(e.target.checked)}
                        className="col-md-4"
                    />
                        {recurrent ?( <div className='col-md-8 recurrent-group'>
                                    <input className="recurrent-number" type="number" name="number" onChange={(e)=>onChangeExpense(e)}></input>
                                    <Form.Select aria-label="Default select example" name="type" onChange={(e)=>setType(e.target.value)}>
                                        <option>Select</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </Form.Select></div>)
                        : ''}
                </ButtonGroup>
            </div>
        </Collapse>
        <div className='espenses-list'>
            <ul>
                {expenses.map((expense, index) =>
                    <li key={index}>
                        <div><BsFillArrowUpCircleFill/> {expense.text}</div>
                        {!!expense.type ? <div className='amount-area'><div className="badge">{expense.number}x{expense.amount}</div>
                        <div className='amount'>-{expense.number * expense.amount}TL {(expense.type).charAt(0).toUpperCase()}</div></div> 
                        : <div className='amount'>-{expense.amount}TL</div> }
                    </li>
                )}
            </ul>
        </div>
        <div className='total totalExpenses'>-{totalExpense} TL</div>
    </div>
  )
}
