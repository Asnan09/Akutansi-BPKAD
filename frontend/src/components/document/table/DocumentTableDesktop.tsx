import { Document } from "../../../types";
import DocumentRow from "./DocumentRow";
import AppTooltip from "../../ui/app-tooltip";

type DocumentTableDesktopProps = {
  documents: Document[];
  selectedDocuments: Set<number | string>;
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectDocument: (id: number | string) => void;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  pageStartIndex: number;
};

export default function DocumentTableDesktop({
  documents,
  selectedDocuments,
  allSelected,
  someSelected,
  onSelectAll,
  onSelectDocument,
  onView,
  onEdit,
  onDelete,
  pageStartIndex,
}: DocumentTableDesktopProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-b border-orange-600">
          <tr>
            <th className="text-center align-middle py-4 px-3 font-semibold w-12 uppercase tracking-[0.2em] text-xs text-white">
              <AppTooltip content="Pilih Semua">
                <input
                  type="checkbox"
                  title=""
                  aria-label="Pilih semua dokumen"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = someSelected;
                    }
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="block mx-auto w-4 h-4 rounded border-white/60 bg-transparent accent-orange-400"
                />
              </AppTooltip>
            </th>
            <th className="text-center align-middle py-4 px-3 font-semibold w-12 uppercase tracking-[0.2em] text-xs text-white">
              No
            </th>
            <th className="text-left py-4 px-3 font-semibold uppercase tracking-[0.2em] text-xs w-[28%] text-white">
              Nama
            </th>
            <th className="text-center py-4 px-3 font-semibold uppercase tracking-[0.2em] text-xs w-[16%] text-white">
              Kategori
            </th>
            <th className="text-center py-4 px-3 font-semibold uppercase tracking-[0.2em] text-xs w-[12%] text-white">
              Format
            </th>
            <th className="text-center py-4 px-3 font-semibold uppercase tracking-[0.2em] text-xs w-[16%] text-white">
              Tanggal
            </th>
            <th className="text-center py-4 px-3 font-semibold uppercase tracking-[0.2em] text-xs w-[16%] text-white">
              Aksi
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <DocumentRow
                key={doc.id}
                doc={doc}
                isSelected={selectedDocuments.has(doc.id)}
                onSelect={onSelectDocument}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                rowNumber={pageStartIndex + index}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-12 text-center text-gray-400">
                Dokumen kosong.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
