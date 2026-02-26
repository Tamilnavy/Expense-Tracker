const xlsx = require('xlsx');
const Income = require('../models/Income');


//add income sourcer 
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // validation: check for missig fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.error("ADD INCOME ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
}


//Get all income sourcer 
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        console.error("GET ALL INCOME ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
}


// delete income sourcer 
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error("DELETE INCOME ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// update income
exports.updateIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const { icon, source, amount, date } = req.body;

        // validation: check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedIncome = await Income.findByIdAndUpdate(
            id,
            { icon, source, amount, date: new Date(date) },
            { new: true } // Return the updated document
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.json(updatedIncome);
    } catch (error) {
        console.error("UPDATE INCOME ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// downloadIncomeExcel income sourcer 
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // process data to excel format
        const data = income.map((item) => ({
            source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="income_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.status(200).send(buffer);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};