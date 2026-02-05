import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import FilterBar from "../components/document/FilterBar";
import DocumentTable from "../components/document/DocumentTable";
import { Document } from "../types";

// Sample data - seharusnya dari API
const initialDocuments: Document[] = [
  {
    id: 1,
    name: "Lampiran 26 Maret 2024",
    format: "PDF",
    size: "4.687 KB",
    date: "19 Maret 2024",
  },
  {
    id: 2,
    name: "Laporan Bulanan Februari",
    format: "XLSX",
    size: "8.123 KB",
    date: "18 Maret 2024",
  },
  {
    id: 3,
    name: "Presentasi Rapat Koordinasi",
    format: "PPTX",
    size: "12.456 KB",
    date: "15 Maret 2024",
  },
  {
    id: 4,
    name: "Dokumen Kontrak Vendor",
    format: "DOCX",
    size: "2.345 KB",
    date: "12 Maret 2024",
  },
  {
    id: 5,
    name: "Anggaran Q1 2024",
    format: "PDF",
    size: "5.234 KB",
    date: "10 Maret 2024",
  },
  {
    id: 6,
    name: "Data Transaksi Januari",
    format: "XLSX",
    size: "15.678 KB",
    date: "08 Maret 2024",
  },
  {
    id: 7,
    name: "Surat Keputusan Direksi",
    format: "PDF",
    size: "3.456 KB",
    date: "05 Maret 2024",
  },
  {
    id: 8,
    name: "Rencana Kerja Tahunan",
    format: "DOCX",
    size: "6.789 KB",
    date: "03 Maret 2024",
  },
];

export default function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [filteredDocuments, setFilteredDocuments] =
    useState<Document[]>(initialDocuments);

  // Filter handlers
  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter((doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  const handleDateFilter = (date: string) => {
    if (!date) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter((doc) => {
      // Convert date format for comparison
      const docDate = new Date(doc.date.split(" ").reverse().join("-"));
      const filterDate = new Date(date);
      return docDate.toDateString() === filterDate.toDateString();
    });
    setFilteredDocuments(filtered);
  };

  const handleCategoryFilter = (category: string) => {
    if (!category) {
      setFilteredDocuments(documents);
      return;
    }

    const filtered = documents.filter(
      (doc) => doc.format.toLowerCase() === category.toLowerCase()
    );
    setFilteredDocuments(filtered);
  };

  const handleRefresh = () => {
    setFilteredDocuments(documents);
    // Bisa ditambahkan logic untuk fetch data dari API
    console.log("Refreshing data...");
  };

  // Document action handlers
  const handleView = (id: number | string) => {
    console.log("View document:", id);
    // Implementasi view document
    alert(`Melihat dokumen ID: ${id}`);
  };

  const handleEdit = (id: number | string) => {
    console.log("Edit document:", id);
    // Implementasi edit document
    alert(`Edit dokumen ID: ${id}`);
  };

  const handleDelete = (id: number | string) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus dokumen ini?"
    );

    if (confirmDelete) {
      const updatedDocuments = documents.filter((doc) => doc.id !== id);
      setDocuments(updatedDocuments);
      setFilteredDocuments(updatedDocuments);
      
      // Show success message
      alert("Dokumen berhasil dihapus!");
      console.log("Deleted document:", id);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F6F6F6] font-['Poppins']">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />

        <main className="flex-1 p-4 lg:p-8">
          {/* Page Title - Hidden on mobile, shown on desktop */}
          <h1 className="hidden lg:block text-3xl xl:text-4xl font-bold text-gray-800 mb-6 lg:mb-8">
            Dashboard Dokumen
          </h1>

          {/* Filter Section */}
          <div className="mb-6 lg:mb-8">
            <FilterBar
              onSearch={handleSearch}
              onDateChange={handleDateFilter}
              onCategoryChange={handleCategoryFilter}
              onRefresh={handleRefresh}
            />
          </div>

          {/* Document Table */}
          <DocumentTable
            documents={filteredDocuments}
            totalDocuments={documents.length}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}