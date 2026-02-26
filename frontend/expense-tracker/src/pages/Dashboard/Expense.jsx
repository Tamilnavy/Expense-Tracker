import { useEffect, useState } from 'react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import TransactionList from '../../components/Dashboard/TransactionList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import Modal from '../../components/Modal';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState(null);

  // get all Expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("something went wrong. please try again.", error);
    } finally {
      setLoading(false);
    }
  }

  // handle add/edit expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon, description } = expense;
    // validate Checks
    if (!category?.trim()) {
      toast.error("Category is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      if (editExpenseData) {
        await axiosInstance.put(API_PATHS.EXPENSE.UPDATE_EXPENSE(editExpenseData._id), {
          category, amount, date, icon, description
        });
        toast.success("Expense updated successfully");
      } else {
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category, amount, date, icon, description
        });
        toast.success("Expense added successfully");
      }

      setOpenAddExpenseModal(false);
      setEditExpenseData(null);
      fetchExpenseDetails();
    } catch (error) {
      console.error("error adding/updating expense",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    }
  };

  // handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details");
    }
  };

  const onEditExpense = (expense) => {
    setEditExpenseData(expense);
    setOpenAddExpenseModal(true);
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className=" my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => {
                setEditExpenseData(null);
                setOpenAddExpenseModal(true);
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-semibold">Expense Transactions</h2>
            <button
              onClick={handleDownloadExpenseDetails}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 hover:from-blue-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              Download Excel
            </button>
          </div>

          <TransactionList
            transactions={expenseData}
            type="expense"
            onDelete={deleteExpense}
            onEdit={onEditExpense}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => {
            setOpenAddExpenseModal(false);
            setEditExpenseData(null);
          }}
          title={editExpenseData ? "Edit Expense" : "Add Expense"}
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            initialData={editExpenseData}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;