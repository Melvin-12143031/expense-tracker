import React from 'react'

const ExpenseStats = ({totalSpent, expenseCount}) => {

  return (
    <div className='expense-stats'>
        <div>
            <span>Total Spent </span>
            <strong>₱{totalSpent.toLocaleString("en-PH")}</strong>
        </div>

        <div>
            <span>Expense Count </span>
            <strong>{expenseCount}</strong>
        </div>      
    </div>
  )
}

export default ExpenseStats
