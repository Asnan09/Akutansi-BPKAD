import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import Toast from "../components/ui/Toast";
import UploadDocumentInfoSection from "../components/document/UploadDocumentInfoSection";
import UploadFileSection from "../components/document/UploadFileSection";
import UploadFormActions from "../components/document/UploadFormActions";
import { ToastState } from "../types";
import { useFileUpload } from "../hooks/useFileUpload";

export default function UploadDocument() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const showToast = (message: string, type: ToastState["type"]) => {
    setToast({ show: true, message, type });
  };

  const {
    fileInputRef,
    formData,
    selectedFile,
    isDragging,
    isUploading,
    handleInputChange,
    handleFileInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleSubmit,
    handleCancel,
    handleClickUploadArea,
    handleRemoveFile,
  } = useFileUpload(showToast);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50 font-['Plus_Jakarta_Sans',sans-serif]">
      <Sidebar />

      <div className="ml-20 lg:ml-[88px] flex-1 flex flex-col animate-fadeIn">
        <Header title="Unggah Dokumen" />

        <main className="flex-1 p-4 lg:p-8">
          {/* Page Title */}
          <div className="mb-6 lg:mb-8 animate-slideDown">
            <h1 className="hidden lg:block text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Unggah Dokumen Baru
            </h1>
            <p className="hidden lg:block text-gray-600 mt-2 font-medium">
              Tambahkan dokumen baru ke catatan keuangan Anda
            </p>
          </div>

          {/* Upload Form */}
          <form
            onSubmit={handleSubmit}
            className="animate-slideUp animate-delay-100"
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-orange-500/10 p-6 lg:p-10 border border-orange-100/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <UploadDocumentInfoSection
                  formData={formData}
                  onInputChange={handleInputChange}
                />

                <UploadFileSection
                  fileInputRef={fileInputRef}
                  selectedFile={selectedFile}
                  isDragging={isDragging}
                  onFileInputChange={handleFileInputChange}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClickUploadArea={handleClickUploadArea}
                  onRemoveFile={handleRemoveFile}
                />
              </div>

              <UploadFormActions
                isUploading={isUploading}
                onCancel={handleCancel}
              />
            </div>
          </form>
        </main>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}
