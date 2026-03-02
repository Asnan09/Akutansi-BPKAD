import axios from "axios";
import {
  Document,
  UploadHistory,
  UploadHistoryQuery,
  UploadHistoryResult,
} from "../types";
import {
  getLocalUploadHistoryItems,
  restoreDocumentFromLocalHistory,
} from "../utils/uploadHistoryLocal";

export interface LoginResponse {
  message: string;
  token: string;
}

type DocumentApiItem = {
  id: number;
  nama_sppd: string;
  tanggal_sppd: string;
  kategori: string;
  file_path: string;
  created_at?: string;
};

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getDocuments = async (): Promise<Document[]> => {
  try {
    const response = await apiClient.get<DocumentApiItem[]>("/documents");

    return response.data.map((item) => ({
      id: item.id,
      nama_sppd: item.nama_sppd,
      tanggal_sppd: item.tanggal_sppd,
      kategori: item.kategori,
      file_path: item.file_path,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data dokumen:", error);
    return [];
  }
};

export const getUploadHistories = async (
  query: UploadHistoryQuery = {},
): Promise<UploadHistoryResult> => {
  const page = Math.max(query.page || 1, 1);
  const limit = Math.max(query.limit || 10, 1);
  const searchText = (query.search || "").trim().toLowerCase();

  const allItems = getLocalUploadHistoryItems();
  const filteredItems =
    searchText.length === 0
      ? allItems
      : allItems.filter((item) =>
          item.documentName.toLowerCase().includes(searchText),
        );

  const total = filteredItems.length;
  const start = (page - 1) * limit;
  const items = filteredItems.slice(start, start + limit);

  return {
    items,
    total,
    page,
    limit,
  };
};

export const restoreUploadHistory = async (
  id: number | string,
): Promise<{ message: string }> => {
  const restored = restoreDocumentFromLocalHistory(id);

  if (!restored) {
    return { message: "Data riwayat tidak ditemukan." };
  }

  return { message: "Dokumen berhasil direstorasi." };
};

export const updateDocument = async (
  id: number | string,
  updatedData: Partial<Document>,
): Promise<void> => {
  await apiClient.put(`/documents/${id}`, updatedData);
};

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Terjadi kesalahan saat mencoba login.",
      );
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui.");
  }
};
