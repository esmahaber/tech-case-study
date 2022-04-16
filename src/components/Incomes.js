import React from 'react'
import {Collapse, ButtonGroup, Form} from 'react-bootstrap';
import { useState,useEffect, useContext } from 'react';
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { recurrentType } from '../helper/recurrentType';
import MainContext from '../context/MainContext';

export default function Incomes() {
    const {incomes, setIncomes, totalIncome, setTotalIncome} = useContext(MainContext);

    const [open, setOpen] = useState(false);
    const [income, setIncome] = useState('');
    const [amount, setAmount] = useState();
    const [text, setText] = useState();
    const [recurrent, setRecurrent] = useState(false);
    const [number, setNumber] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        if(incomes.length > 0){
            var total = 0;
            incomes.map((income) => {
                if(income.recurrent)
                    total += parseInt(income.amount * income.number);
                else
                    total += parseInt(income.amount);
            });
            setTotalIncome(total);
        }
    },[]);

    useEffect(() => {
        var newExpenses = [...incomes, income];
        console.log(income)
        if(income.text != null && income.text != '' && income.text != undefined){
            setIncomes(newExpenses);

            var total = totalIncome;
            if(income.recurrent)
                total += parseInt(income.amount * income.number);
            else
                total += parseInt(income.amount);

            setTotalIncome(total);
        }
           
    },[income]);

    var onChangeIncome = (e) => {
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

    var addIncome = (e) => {
        e.preventDefault();
        var newIncome = {};
        newIncome.text = text;
        newIncome.amount = amount;
        newIncome.number = number;
        newIncome.type = type;
        newIncome.recurrent = recurrent;

        setIncome(newIncome);
    }
      
    var findRecurrentType = (type) => {
        var recurrent = type;
        return recurrentType[recurrent];
    }

  return (
    <div>
        <div className='top-button'>
            <button className='tech-primary' onClick={() => setOpen(!open)}>
                New Income
            </button>
        </div>
       
        <Collapse in={open}>
            <div id="incomes-collapse">
                <div className='input-group'>
                    <input className='col-6 new-incomes' name="text" placeholder='Add New Incomes' onChange={(e)=>onChangeIncome(e)}/>
                    <input type="number" className='col-3' name="amount" placeholder='Amount' onChange={(e)=>onChangeIncome(e)}/>
                    <button className='col-3 tech-secondary add-button' onClick={(e)=>addIncome(e)} >Add</button>
                </div>
                <ButtonGroup>
                    <Form.Check
                        inline
                        label="Income"
                        name="recurrent"
                        type="checkbox"
                        id="recurrent"
                        onChange={(e) => setRecurrent(e.target.checked)}
                        className="col-md-4"
                    />
                        {recurrent ?( <div className='col-md-8 recurrent-group'>
                                    <input className="recurrent-number" type="number" name="number" onChange={ (e) => onChangeIncome(e) }></input>
                                    <Form.Control as="select" onChange={(e) => setType(e.target.value)}>
                                        <option>Select</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </Form.Control></div>)
                        : ''}
                </ButtonGroup>
            </div>
        </Collapse>
        <div className='income-list'>
            <ul>
                {incomes.map((income, index) =>
                    <li key={index}>
                        <div><BsFillArrowDownCircleFill/> {income.text}</div>
                        {!!income.type ? <div className='amount-area'><div className="badge">{income.number}x{income.amount}</div>
                        <div className='amount'>+{income.number * income.amount} {(income.type).charAt(0).toUpperCase()}</div></div> 
                        : <div className='amount'>+{income.amount}</div> }
                    </li>
                )}
            </ul>
        </div>
        <div className='total totalIncomes'>+{totalIncome} TL</div>
    </div>
  )
}
