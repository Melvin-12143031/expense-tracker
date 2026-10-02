import { useState } from "react";

import categories from '../data/categories.json'


const ExpenseForm = ({ onAdd }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Food");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        // Remove extra spaces
        const cleanDescription = description.trim();

        // Check every required field
        if (!cleanDescription && !amount && !date) {
            setError("Description, Amount, and Date are required.");
            return;
        }

        if (!cleanDescription) {
            setError("Description is required.");
            return;
        }

        if (!amount) {
            setError("Amount is required.");
            return;
        }

        if (!date) {
            setError("Date is required.");
            return;
        }

        // Only reaches here if everything is valid
        const newExpense = {
            id: Date.now(),
            description: cleanDescription,
            amount: Number(amount),
            category,
            date
        };

        onAdd(newExpense);

        // Clear form
        setDescription("");
        setAmount("");
        setCategory("Food");
        setDate("");
        setError("");
    };

    return (
        <>
            {error && (
                <p className="form-error">
                    ⚠️ {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="expense-form">

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setError("");
                    }}
                />

                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Amount"
                    value={
                        amount
                            ? Number(amount).toLocaleString("en-PH")
                            : ""
                    }
                    onChange={(e) => {
                        const value = e.target.value.replace(/,/g, "");

                        if (!/^\d*$/.test(value)) return;

                        setAmount(value);
                        setError("");
                    }}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setError("");
                    }}
                />

                <button type="submit">
                    Add Expense
                </button>

            </form>
        </>
    );
};

export default ExpenseForm;