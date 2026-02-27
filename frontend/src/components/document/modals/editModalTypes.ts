import { Document } from "../../../types";

export type EditCategory = "Lampiran" | "Keuangan" | "BKU" | "STS" | "";

export type EditFormData = {
  nama_sppd: string;
  kategori: EditCategory;
  tanggal_sppd: string;
};

export interface EditModalProps {
  isOpen: boolean;
  document: Document | null;
  onClose: () => void;
  onSave: (id: number | string, updatedData: Partial<Document>) => void;
}
