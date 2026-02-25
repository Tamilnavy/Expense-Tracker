import React, { useState } from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome, initialData }) => {
  const [income, setIncome] = useState({
    amount: initialData?.amount || "",
    category: initialData?.category || "",
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
    description: initialData?.description || "",
    source: initialData?.source || "",
    icon: initialData?.icon || "",
  });

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        placeholder="freelance,salary,etc"
        label="Income Source"
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        placeholder="Amount"
        label="Amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        placeholder="Date"
        label="Date"
        type="date"
      />

      <div className="flux justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddIncome(income)}

        >
          {initialData ? "Update Income" : "Add Income"}
        </button>
      </div>
    </div>

  );
}

export default AddIncomeForm