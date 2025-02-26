import React, {
  useEffect,
  useState,
} from "react";
import UserTableRow from "./UserTableRow";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import {
  deleteUser,
  getAllUsers,
} from "../services/userServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function UserTable({
  users,
  onUserUpdated,
}) {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] =
    useState(null);
  const [deleteUserId, setDeleteUserId] =
    useState(null);
  const [isDeleting, setIsDeleting] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUserList(data.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to fetch users";
      toast.error(errorMessage);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;

    setIsDeleting(true);
    try {
      await deleteUser(deleteUserId);
      toast.success("User deleted successfully!");
      await fetchUsers();
    } catch (error) {
      toast.error(
        error.message || "Failed to delete user!"
      );
    } finally {
      setIsDeleting(false);
      setDeleteUserId(null);
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
            <th className="px-4 py-3 text-left">
              No
            </th>
            <th className="px-4 py-3 text-left">
              Full Name
            </th>
            <th className="px-4 py-3 text-left">
              DOB
            </th>
            <th className="px-4 py-3 text-left">
              Gender
            </th>
            <th className="px-4 py-3 text-left">
              Email
            </th>
            <th className="px-4 py-3 text-left">
              Registration Date
            </th>
            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(userList) &&
          userList.length > 0 ? (
            userList.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                onEdit={() =>
                  setSelectedUser(user)
                }
                onDelete={() =>
                  setDeleteUserId(user.id)
                }
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center py-4"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          onUserUpdated={fetchUsers} // Memanggil fetchUsers setelah pengguna diperbarui
        />
      )}

      {deleteUserId && (
        <DeleteUserModal
          isOpen={!!deleteUserId}
          onClose={() => setDeleteUserId(null)}
          onConfirm={handleDeleteUser}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
