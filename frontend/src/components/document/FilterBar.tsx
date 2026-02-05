import { useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import refreshIcon from "../../assets/icons/refresh.svg";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onDateChange?: (date: string) => void;
  onCategoryChange?: (category: string) => void;
  onRefresh?: () => void;
}

export default function FilterBar({
  onSearch,
  onDateChange,
  onCategoryChange,
  onRefresh,
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    onDateChange?.(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategoryChange?.(value);
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setDate("");
    setCategory("");
    onRefresh?.();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* PENCARIAN – DIPANJANGKAN */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="text-xs lg:text-sm font-semibold text-gray-600 mb-2 block">
            Pencarian
          </label>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 lg:py-3 focus-within:border-orange-400 transition">
            <img
              src={searchIcon}
              className="w-4 h-4 lg:w-5 lg:h-5 mr-3 opacity-50"
              alt="search"
            />
            <input
              type="text"
              placeholder="Cari Dokumen"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-transparent outline-none w-full text-xs lg:text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* TANGGAL */}
        <div>
          <label className="text-xs lg:text-sm font-semibold text-gray-600 mb-2 block">
            Tanggal
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 lg:py-3 text-xs lg:text-sm text-gray-700 focus:border-orange-400 focus:outline-none transition"
          />
        </div>

        {/* KATEGORI */}
        <div>
          <label className="text-xs lg:text-sm font-semibold text-gray-600 mb-2 block">
            Kategori
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 lg:py-3 text-xs lg:text-sm text-gray-700 focus:border-orange-400 focus:outline-none transition appearance-none cursor-pointer"
            >
              <option value="">Semua Kategori</option>
              <option value="pdf">PDF</option>
              <option value="xlsx">XLSX</option>
              <option value="docx">DOCX</option>
              <option value="pptx">PPTX</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* REFRESH */}
        <div className="flex justify-start lg:justify-center">
          <button
            onClick={handleRefresh}
            className="bg-orange-500 hover:bg-orange-600 p-3 lg:p-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            title="Refresh"
          >
            <img
              src={refreshIcon}
              className="w-4 h-4 lg:w-5 lg:h-5"
              alt="refresh"
            />
          </button>
        </div>
      </div>
    </div>
  );
}