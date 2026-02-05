import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import uploadIcon from "../assets/icons/upload.svg";

export default function UploadDocument() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    // Validasi tipe file
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Tipe file tidak didukung. Hanya PDF, DOCX, XLSX, dan PPTX yang diperbolehkan.");
      return;
    }

    // Validasi ukuran file (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert("Ukuran file terlalu besar. Maksimal 10MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClickUploadArea = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.date || !selectedFile) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    // Simulasi upload
    console.log("Form Data:", formData);
    console.log("Selected File:", selectedFile);

    alert("Dokumen berhasil disimpan!");

    // Reset form
    setFormData({ name: "", date: "" });
    setSelectedFile(null);

    // Navigate back to dashboard
    navigate("/dashboarddokumen");
  };

  const handleCancel = () => {
    navigate("/dashboarddokumen");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="min-h-screen flex bg-[#F6F6F6] font-['Poppins']">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Unggah Dokumen" />

        <main className="flex-1 p-4 lg:p-8">
          {/* Page Title */}
          <h1 className="hidden lg:block text-3xl xl:text-4xl font-bold text-gray-800 mb-6 lg:mb-8">
            Unggah Dokumen
          </h1>

          {/* Upload Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                {/* LEFT SECTION - Informasi Dokumen */}
                <div className="space-y-6">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-500"
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
                    <h2 className="text-lg font-semibold text-gray-700">
                      Informasi Dokumen
                    </h2>
                  </div>

                  {/* Nama Dokumen */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Nama Dokumen
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Contoh: Dokumen Lampiran Tahun 2024"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none transition"
                      required
                    />
                  </div>

                  {/* Tanggal */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Tanggal
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 focus:outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* RIGHT SECTION - Berkas Dokumen */}
                <div className="space-y-6">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      Berkas
                    </h2>
                  </div>

                  {/* Upload Area */}
                  <div
                    onClick={handleClickUploadArea}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      border-2 border-dashed rounded-xl 
                      min-h-[250px] lg:min-h-[300px]
                      flex flex-col items-center justify-center
                      cursor-pointer transition-all
                      ${
                        isDragging
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-300 hover:border-orange-400 hover:bg-gray-50"
                      }
                    `}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileInputChange}
                      className="hidden"
                      accept=".pdf,.docx,.xlsx,.pptx"
                    />

                    {selectedFile ? (
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg
                            className="w-8 h-8 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFile(null);
                          }}
                          className="mt-4 text-xs text-red-500 hover:text-red-700 underline"
                        >
                          Hapus file
                        </button>
                      </div>
                    ) : (
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <img
                            src={uploadIcon}
                            className="w-8 h-8"
                            alt="Upload"
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Klik untuk mengunggah atau drag & drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, DOCX, XLSX, atau PPTX (Maks. 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 lg:mt-10">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all order-2 sm:order-1"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg active:scale-95 order-1 sm:order-2"
                >
                  Simpan Dokumen
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}