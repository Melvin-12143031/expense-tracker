const ExpenseItem = ({expense, onEdit, onDelete}) => {
return (
    <li className="expense-item">
        <div>
            <h3>{expense.description}</h3>
            <p>
                {expense.category} . {expense.date}
            </p>
        </div>

        <strong>₱{expense.amount.toLocaleString("en-PH")}</strong>

        <div>
            <button onClick={() => onEdit(expense.id)}>
                Edit
            </button>

            <button onClick={() => onDelete(expense.id)}>
                Delete
            </button>

        </div>
    </li>
)
}

export default ExpenseItem;