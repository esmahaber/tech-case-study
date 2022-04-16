import React from 'react'
import {Collapse, ButtonGroup, Form} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { incomeList} from '../helper/incomeList';
import { recurrentType } from '../helper/recurrentType';

export default function Incomes() {
    const [open, setOpen] = useState(false);
    const [incomes, setIncomes] = useState(incomeList);
    const [income, setIncome] = useState('');
    const [amount, setAmount] = useState();
    const [text, setText] = useState();
    const [recurrent, setRecurrent] = useState(false);
    const [number, setNumber] = useState();
    const [type, setType] = useState();
    const [totalIncome, setTotalIncome] = useState();

    useEffect(() => {
        if(incomeList.length > 0){
            var total = 0;
            incomeList.map((income) => {
                if(income.recurrent)
                    total += income.amount * income.number;
                else
                    total += income.amount;
            });
            setTotalIncome(total);
        }
    },[]);

    useEffect(() => {
        console.log(income.text)
        var setIncomes = [...incomes, income];
        if(income.text != null && income.text != '' && income.text != undefined)
            setIncomes(setIncomes);
        console.log(incomes)
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

        setIncomes(newIncome);
    }
      
    var findRecurrentType = (type) => {
        var recurrent = type;
        return recurrentType[recurrent];
    }

  return (
    <div>
        {/* <Button text="Add Expenses" collapseId="expensesCollapse"/>
        <div className="collapse" id="expensesCollapse">
            <div className="card card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
        </div> */}
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
                                    <input className="recurrent-number" type="number" name="number" value="" onChange={(e)=>onChangeIncome(e)}></input>
                                    <Form.Select aria-label="Default select example" name="type" value="" onChange={(e)=>setType(e.target.value)}>
                                        <option>Select</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </Form.Select></div>)
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
