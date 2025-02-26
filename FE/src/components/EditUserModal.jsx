import React, {
  useState,
  useEffect,
} from "react";
import {
  getAllUsers,
  updateUser,
} from "../services/userServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function EditUserModal({
  isOpen,
  onClose,
  user,
  onUserUpdated,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "member",
    gender: "male",
    dob: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role || "member",
        gender: user.gender || "male",
        dob: user.dob
          ? new Date(user.dob)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [user, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(user.id, formData);
      toast.success("User updated successfully");
      onClose();
      dispatch(getAllUsers());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update user";
      toast.error(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">
          Edit User
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="member">
                Member
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="male">Male</option>
              <option value="female">
                Female
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
