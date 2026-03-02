import axios from "axios";
import { Document } from "../types";

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
  baseURL: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:3001/api",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token =
    sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const resolvedBaseUrl = apiClient.defaults.baseURL?.replace(/\/+$/, "") ?? "";
const apiSuffix = "/api";
const serverOrigin = resolvedBaseUrl.endsWith(apiSuffix)
  ? resolvedBaseUrl.slice(0, -apiSuffix.length)
  : resolvedBaseUrl;

export const uploadsBaseUrl = `${serverOrigin}/uploads`;
export { apiClient };

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
