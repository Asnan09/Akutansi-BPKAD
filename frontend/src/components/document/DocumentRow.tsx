import eyeIcon from "../../assets/icons/eye.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import { Document } from "../../types";

interface DocumentRowProps {
  doc: Document;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
}

export default function DocumentRow({
  doc,
  onView,
  onEdit,
  onDelete,
}: DocumentRowProps) {
  const getFormatStyle = (format: string) => {
    const formatLower = format.toLowerCase();
    switch (formatLower) {
      case "pdf":
        return "bg-red-100 text-red-600";
      case "xlsx":
      case "xls":
        return "bg-green-100 text-green-600";
      case "docx":
      case "doc":
        return "bg-blue-100 text-blue-600";
      case "pptx":
      case "ppt":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-500"
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
          <span className="text-sm text-gray-800 font-medium">{doc.name}</span>
        </div>
      </td>
      <td className="py-4 px-2 text-center">
        <span
          className={`px-3 py-1 ${getFormatStyle(
            doc.format
          )} rounded-full text-xs font-semibold inline-block`}
        >
          {doc.format.toUpperCase()}
        </span>
      </td>
      <td className="py-4 px-2 text-center text-sm text-gray-600">
        {doc.size}
      </td>
      <td className="py-4 px-2 text-center text-sm text-gray-600">
        {doc.date}
      </td>
      <td className="py-4 px-2">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onView?.(doc.id)}
            className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center transition-colors group"
            title="Lihat"
          >
            <img
              src={eyeIcon}
              className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              alt="View"
            />
          </button>
          <button
            onClick={() => onEdit?.(doc.id)}
            className="w-8 h-8 rounded-lg hover:bg-yellow-50 flex items-center justify-center transition-colors group"
            title="Edit"
          >
            <img
              src={editIcon}
              className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              alt="Edit"
            />
          </button>
          <button
            onClick={() => onDelete?.(doc.id)}
            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors group"
            title="Hapus"
          >
            <img
              src={deleteIcon}
              className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
              alt="Delete"
            />
          </button>
        </div>
      </td>
    </tr>
  );
}