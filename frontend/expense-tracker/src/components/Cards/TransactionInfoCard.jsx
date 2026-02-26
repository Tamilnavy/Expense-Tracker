import React from "react";
import { LuUtensils } from "react-icons/lu";
import {
  LuTrendingUp,
  LuTrendingUpDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  title,
  onDelete,   // ✅ added
  onEdit,     // ✅ added
}) => {
  const getAmountStyles = () => { return type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500" };
  return (
    <div className="group relative flex items-center justify-between gap-4 mt-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-up">

      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-50 border border-gray-200/50 rounded-full shadow-sm group-hover:bg-white group-hover:scale-110 transition-all duration-300">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-900 font-semibold">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <div className="flex items-center gap-2 mr-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer"
              onClick={onEdit}>
              <LuTrendingUp size={16} />
              Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 cursor-pointer"
              onClick={onDelete}>
              <LuTrash2 size={16} />
              Delete
            </button>
          </div>
        )}

        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300 ${getAmountStyles()}`}>
          <h6 className="text-xs font-medium">
            {type === "income" ? "+" : "-"}${amount}
          </h6>

          {type === "income" ? (
            <LuTrendingUp />
          ) : (
            <LuTrendingUpDown />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
