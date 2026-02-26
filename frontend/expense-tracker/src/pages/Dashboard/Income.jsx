import { useEffect, useState } from 'react';
import React from "react"
import { toast } from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import TransactionList from '../../components/Dashboard/TransactionList';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useUserAuth } from '../../hooks/useUserAuth';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [editIncomeData, setEditIncomeData] = useState(null);

  // get all Income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("something went wrong. please try again.", error)
    } finally {
      setLoading(false);
    }
  }

  // handle add/edit income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    //validate Checks
    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount Should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      if (editIncomeData) {
        await axiosInstance.put(API_PATHS.INCOME.UPDATE_INCOME(editIncomeData._id), {
          source, amount, date, icon
        });
        toast.success("Income updated successfully");
      } else {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
          source, amount, date, icon
        });
        toast.success("Income added successfully");
      }

      setOpenAddIncomeModal(false);
      setEditIncomeData(null);
      fetchIncomeDetails();
    } catch (error) {
      console.error("error adding/updating income",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred");
    }
  }

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income");
    }
  };

  // handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    }
  };

  const onEditIncome = (income) => {
    setEditIncomeData(income);
    setOpenAddIncomeModal(true);
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => {
                setEditIncomeData(null);
                setOpenAddIncomeModal(true);
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <h2 className="text-xl font-semibold">Income Transactions</h2>
            <button
              onClick={handleDownloadIncomeDetails}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 hover:from-blue-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
            >
              Download Excel
            </button>
          </div>

          <TransactionList
            transactions={incomeData}
            type="income"
            onDelete={deleteIncome}
            onEdit={onEditIncome}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => {
            setOpenAddIncomeModal(false);
            setEditIncomeData(null);
          }}
          title={editIncomeData ? "Edit Income" : "Add Income"}
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            initialData={editIncomeData}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;