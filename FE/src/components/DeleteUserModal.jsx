import React from "react";

export default function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Confirm Deletion
        </h2>
        <p>
          Are you sure you want to delete this
          user?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${
              isDeleting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting
              ? "Deleting..."
              : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
