import { useState } from "react";
import HistoryToolbar from "../components/document/history/HistoryToolbar";
import HistoryTable from "../components/document/history/HistoryTable";
import HistoryPagination from "../components/document/history/HistoryPagination";
import HistoryState from "../components/document/history/HistoryState";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Toast } from "../components/snackbar";
import { ToastState } from "../types";
import { useUploadHistory } from "../hooks/useUploadHistory";

export default function UploadHistory() {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "info",
  });

  const {
    items,
    loading,
    error,
    restoringId,
    searchInput,
    page,
    limit,
    total,
    totalPages,
    setSearchInput,
    setPage,
    setLimit,
    handleSearchSubmit,
    handleRefresh,
    handleRestore,
  } = useUploadHistory();

  const showToast = (message: string, type: ToastState["type"]) => {
    setToast({ show: true, message, type });
  };

  const handleRestoreClick = async (id: number | string) => {
    const message = await handleRestore(id);
    const toastType: ToastState["type"] = message.includes("berhasil")
      ? "success"
      : message.includes("belum tersedia")
        ? "warning"
        : "error";

    showToast(message, toastType);
  };

  const stateView = (
    <HistoryState
      loading={loading}
      error={error}
      isEmpty={items.length === 0}
    />
  );

  return (
    <div className="min-h-screen flex bg-[#F6F6F6] font-['Plus_Jakarta_Sans',sans-serif]">
      <Sidebar />

      <div className="ml-20 lg:ml-[88px] flex-1 flex flex-col animate-[fadeIn_0.5s_ease-out]">
        <Header title="Riwayat Unggah" />

        <main className="flex-1 p-1 md:p-8">
          <div className="mx-auto w-full max-w-none space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
              <div className="mb-4">
                <HistoryToolbar
                  searchValue={searchInput}
                  onSearchValueChange={setSearchInput}
                  onSearchSubmit={handleSearchSubmit}
                  onRefresh={handleRefresh}
                />
              </div>

              {loading || error || items.length === 0 ? (
                stateView
              ) : (
                <>
                  <HistoryTable
                    items={items}
                    restoringId={restoringId}
                    onRestore={handleRestoreClick}
                  />
                  <HistoryPagination
                    page={page}
                    totalPages={totalPages}
                    totalItems={total}
                    pageSize={limit}
                    onPageChange={setPage}
                    onPageSizeChange={(value) => {
                      setPage(1);
                      setLimit(value);
                    }}
                  />
                </>
              )}
            </section>
          </div>
        </main>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        />
      )}
    </div>
  );
}
