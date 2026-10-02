import { useState, useRef, useEffect } from 'react';
import './App.css';
import initialExpenses from './data/expenses.json'

import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import ExpenseStats from './components/ExpenseStats';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import EditDialog from './components/EditDialog';
import DeleteDialog from './components/DeleteDialog';

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);



  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [darkMode, setDarkMode] = useState(false)


  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");

  const editDialogRef = useRef(null);
  const deleteDialogRef = useRef(null);

  const [delExpenseId, setDelExpenseId] = useState(null);
  const expenseToDelete = expenses.find((expense) => expense.id === delExpenseId)

  const deleteExpense = (id) => {
    setDelExpenseId(id)
    deleteDialogRef.current?.showModal()
  }

  const confirmDelete = () => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) =>
        expense.id !== delExpenseId))

    closeDeleteDialog()
  }

  const closeDeleteDialog = () => {
    setDelExpenseId(null)

    deleteDialogRef.current?.close()
  }

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense])
  }

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0)

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description.toLowerCase().includes(search.toLowerCase());


    const matchesCategory =
      category === 'All' ||
      expense.category === category;

    return matchesSearch && matchesCategory
  })

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {

    if (sortBy === 'highest') {
      return b.amount - a.amount
    }

    if (sortBy === 'lowest') {
      return a.amount - b.amount
    }

    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date)
    }

    if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date)
    }

  })


  const editExpense = (id) => {
    const expense = expenses.find((expense) => expense.id === id)

    console.log(expense)

    if (!expense) return;

    setEditExpenseId(id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
    setEditDate(expense.date);

    editDialogRef.current?.showModal();
  }

  const closeEditDialog = () => {
    setEditExpenseId(null);
    setEditDescription("");
    setEditAmount("");
    setEditCategory("Food");
    setEditDate("");

    editDialogRef.current?.close();
  };

  const saveEdit = () => {
    const description = editDescription.trim()

    if (!description || !editAmount || !editDate) {
      return
    }

    setExpenses((prevExpenses) => prevExpenses.map((expense) => expense.id === editExpenseId
      ? {
        ...expense,
        description,
        amount: Number(editAmount),
        category: editCategory,
        date: editDate
      }
      : expense
    ))
    closeEditDialog();
  }


  return (

    <div className={darkMode ? "app dark" : "app"}>

      <div className="app-container">

        {/* HEADER */}
        <header className="app-header">
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1>💰 My Expenses</h1>
            <p className="subtitle">
              Keep track of where your money goes.
            </p>
          </div>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </header>


        {/* STATS */}
        <ExpenseStats
          totalSpent={totalExpense}
          expenseCount={expenses.length}
        />


        {/* ADD EXPENSE */}
        <section className="section-card">
          <div className="section-heading">
            <div>
              <h2>Add Expense</h2>
              <p>Record a new expense</p>
            </div>
          </div>

          <ExpenseForm onAdd={addExpense} />
        </section>


        {/* FILTERS */}
        <section className="filters">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <CategoryFilter
            category={category}
            setCategory={setCategory}
          />

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>

        </section>


        {/* EXPENSES */}
        <section className="expense-section">

          <div className="section-heading">
            <div>
              <h2>Recent Expenses</h2>
              <p>{filteredExpenses.length} expense(s) found</p>
            </div>
          </div>

          <ExpenseList
            expenses={sortedExpenses}
            onEdit={editExpense}
            onDelete={deleteExpense}
          />

        </section>


        {/* EDIT DIALOG */}
        <EditDialog
          dialogRef={editDialogRef}
          editDescription={editDescription}
          setEditDescription={setEditDescription}
          editAmount={editAmount}
          setEditAmount={setEditAmount}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          editDate={editDate}
          setEditDate={setEditDate}
          saveEdit={saveEdit}
          closeEditDialog={closeEditDialog}
        />
        
        {/* DELETE DIALOG */}
        <DeleteDialog
          dialogRef={deleteDialogRef}
          expenseToDelete={expenseToDelete}
          confirmDelete={confirmDelete}
          closeDeleteDialog={closeDeleteDialog}
        />


      </div>
    </div>


  );
};

export default App;