import { useState } from "react";
import HistoryContentSection from "../components/document/history/HistoryContentSection";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ConfirmDialog from "../components/layout/ui/ConfirmDialog";
import { Toast } from "../components/snackbar";
import { useUploadHistory } from "../hooks/useUploadHistory";
import { useToastState } from "../hooks/useToastState";
import { getRestoreToastType } from "../utils/historyToastUtils";

type PermanentDeleteDialogState = {
  isOpen: boolean;
  documentId: number | string | null;
  documentName: string;
};

export default function UploadHistory() {
  const { toast, showToast, closeToast } = useToastState("info");
  const [permanentDeleteDialog, setPermanentDeleteDialog] =
    useState<PermanentDeleteDialogState>({
      isOpen: false,
      documentId: null,
      documentName: "",
    });

  const {
    items,
    loading,
    error,
    restoringId,
    permanentlyDeletingId,
    isRestoringSelected,
    selectedIds,
    selectedRestorableCount,
    allRestorableSelected,
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
    handleToggleSelect,
    handleToggleSelectAll,
    handleRestore,
    handleRestoreSelected,
    handlePermanentDelete,
  } = useUploadHistory();

  const handleRestoreClick = async (id: number | string) => {
    const message = await handleRestore(id);
    const toastType = getRestoreToastType(message);

    showToast(message, toastType);
  };

  const handleRestoreSelectedClick = async () => {
    const message = await handleRestoreSelected();
    const toastType = getRestoreToastType(message);

    showToast(message, toastType);
  };

  const openPermanentDeleteDialog = (id: number | string) => {
    const item = items.find((historyItem) => historyItem.id === id);

    setPermanentDeleteDialog({
      isOpen: true,
      documentId: id,
      documentName: item?.documentName || "dokumen ini",
    });
  };

  const closePermanentDeleteDialog = () => {
    setPermanentDeleteDialog({
      isOpen: false,
      documentId: null,
      documentName: "",
    });
  };

  const confirmPermanentDelete = async () => {
    if (permanentDeleteDialog.documentId === null) {
      return;
    }

    const message = await handlePermanentDelete(
      permanentDeleteDialog.documentId,
    );
    const toastType = getRestoreToastType(message);

    showToast(message, toastType);
    closePermanentDeleteDialog();
  };

  return (
    <div className="min-h-screen flex bg-[#F6F6F6] font-['Plus_Jakarta_Sans',sans-serif]">
      <Sidebar />

      <div className="ml-20 lg:ml-[88px] flex-1 flex flex-col animate-[fadeIn_0.5s_ease-out]">
        <Header title="Riwayat Unggah" />

        <main className="flex-1 p-1 md:p-8">
          <div className="mx-auto w-full max-w-none space-y-6">
            <HistoryContentSection
              items={items}
              loading={loading}
              error={error}
              restoringId={restoringId}
              permanentlyDeletingId={permanentlyDeletingId}
              isRestoringSelected={isRestoringSelected}
              selectedIds={selectedIds}
              selectedRestorableCount={selectedRestorableCount}
              allRestorableSelected={allRestorableSelected}
              searchValue={searchInput}
              page={page}
              pageSize={limit}
              totalItems={total}
              totalPages={totalPages}
              onSearchValueChange={setSearchInput}
              onSearchSubmit={handleSearchSubmit}
              onRefresh={handleRefresh}
              onToggleSelectAll={handleToggleSelectAll}
              onToggleSelect={handleToggleSelect}
              onRestore={handleRestoreClick}
              onPermanentDeleteRequest={openPermanentDeleteDialog}
              onRestoreSelected={handleRestoreSelectedClick}
              onPageChange={setPage}
              onPageSizeChange={(value) => {
                setPage(1);
                setLimit(value);
              }}
            />
          </div>
        </main>
      </div>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <ConfirmDialog
        isOpen={permanentDeleteDialog.isOpen}
        title="Hapus Permanen Dokumen?"
        message={`Dokumen "${permanentDeleteDialog.documentName}" akan dihapus permanen dan tidak bisa direstorasi lagi.`}
        confirmText="Hapus Permanen"
        cancelText="Batal"
        onConfirm={confirmPermanentDelete}
        onCancel={closePermanentDeleteDialog}
        type="danger"
      />
    </div>
  );
}
