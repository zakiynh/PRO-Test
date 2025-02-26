import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Search, Calendar } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
}) {
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    handleSearch(
      e.target.value,
      startDate,
      endDate
    );
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    handleSearch(search, date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    handleSearch(search, startDate, date);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white shadow-md rounded-lg">
      {/* Search Input */}
      <div className="relative w-full md:w-1/3">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={search || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* Date Pickers */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="w-40 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50} // Menampilkan 50 tahun ke atas & ke bawah
          />
        </div>

        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="w-40 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50}
          />
        </div>
      </div>
    </div>
  );
}
