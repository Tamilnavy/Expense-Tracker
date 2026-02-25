const xlsx = require('xlsx');
const Expense = require('../models/Expense');


//add Expensse sourcer 
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // validation: check for missig fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error("ADD EXPENSE ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


//Get all Expense sourcer 
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        console.error("GET ALL INCOME ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
}


// delete Expense sourcer 
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("DELETE EXPENSE ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// update Expense
exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { icon, category, amount, date } = req.body;

        // validation: check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { icon, category, amount, date: new Date(date) },
            { new: true } // Return the updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json(updatedExpense);
    } catch (error) {
        console.error("UPDATE EXPENSE ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// download Excel 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // process data to excel format
        const data = expense.map((item) => ({
            source: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_data.xlsx');
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};