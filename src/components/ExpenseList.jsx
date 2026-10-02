import React from 'react'
import ExpenseItem  from './ExpenseItem'
const ExpenseList = ({expenses, onEdit, onDelete}) => {
  return (
    <ul className='expense-list'>
        {expenses.map((expense) => (
            <ExpenseItem 
            key={expense.id}
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
            />
        ))}
    </ul>
  )
}

export default ExpenseList
