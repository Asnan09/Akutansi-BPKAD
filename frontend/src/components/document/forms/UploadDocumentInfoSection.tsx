type UploadFormData = {
  name: string;
  date: string;
  category: "Lampiran" | "Keuangan" | "";
};

type UploadDocumentInfoSectionProps = {
  formData: UploadFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
};

export default function UploadDocumentInfoSection({
  formData,
  onInputChange,
}: UploadDocumentInfoSectionProps) {
  return (
    <div className="space-y-6 animate-slideInLeft animate-delay-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 animate-bounce animate-delay-300">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Informasi Dokumen</h2>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide"
        >
          Nama Dokumen
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Nama akan otomatis terisi dari file..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 bg-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide"
        >
          Tanggal
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 bg-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide"
        >
          Kategori
        </label>
        <div className="relative">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onInputChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 bg-white appearance-none cursor-pointer"
            required
          >
            <option value="">Pilih Kategori</option>
            <option value="Lampiran">Lampiran</option>
            <option value="Keuangan">Keuangan</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
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
    </div>
  );
}
