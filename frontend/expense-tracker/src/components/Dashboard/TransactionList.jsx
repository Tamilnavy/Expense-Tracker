import React from 'react';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from "moment";

const TransactionList = ({ transactions, type, onDelete, onEdit }) => {
    return (
        <div className="card mt-6">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg">All {type === 'income' ? 'Income' : 'Expense'} Transactions</h5>
            </div>

            {transactions?.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No transactions found.</p>
            ) : (
                <div className="flex flex-col gap-2">
                    {transactions?.map((item) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.source || item.category}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={type}
                            onDelete={() => onDelete(item._id)}
                            onEdit={() => onEdit(item)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
