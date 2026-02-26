import React from 'react'

const InfoCard = ({ icon, label, value, color, }) => {
  return <div className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-up group">
    <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full shadow-md group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <div>
      <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
      <span className="text-[22px]">${value}</span>
    </div>
  </div>
}

export default InfoCard