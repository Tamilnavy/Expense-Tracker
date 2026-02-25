import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense, initialData }) => {
    const [expense, setExpense] = useState({
        amount: initialData?.amount || "",
        category: initialData?.category || "",
        date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
        icon: initialData?.icon || "",
        description: initialData?.description || ""
    });

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                placeholder="Food, Rent, Utilities, etc."
                label="Expense Category"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                placeholder="Amount"
                label="Amount"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                placeholder="Date"
                label="Date"
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(expense)}
                >
                    {initialData ? "Update Expense" : "Add Expense"}
                </button>
            </div>
        </div>
    );
}

export default AddExpenseForm;
