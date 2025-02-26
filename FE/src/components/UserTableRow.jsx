import React from "react";
import {
  formatGender,
  formatDate,
} from "../utils/formatter";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function UserTableRow({
  user,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b hover:bg-gray-100 transition-all">
      <td className="px-4 py-3 text-center">
        {index + 1}
      </td>
      <td className="px-4 py-3">
        {user.fullName}
      </td>
      <td className="px-4 py-3">
        {formatDate(user.dob)}
      </td>
      <td className="px-4 py-3 text-center">
        {formatGender(user.gender)}
      </td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3">
        {formatDate(user.registDate)}
      </td>
      <td className="px-4 py-3 flex justify-center gap-2">
        <button
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
          onClick={() => onEdit(user)}
        >
          <FiEdit size={18} />
        </button>
        <button
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
          onClick={() => onDelete(user)}
        >
          <FiTrash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
