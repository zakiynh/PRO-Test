import React, {
  useState,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/userServices";
import { logout } from "../../services/authServices";
import UserTable from "../../components/UserTable";
import Search from "../../components/Search";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import ToastContainerComponent from "../../components/ToastContainer";
import Pagination from "../../components/Pagination";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [startDate, setStartDate] =
    useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] =
    useState(null);
  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  // pagination state
  const [currentPage, setCurrentPage] =
    useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutAction());
      navigate("/login");
      toast.success("Logout successful!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Logout failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const fetchUsers = async (
    page = 1,
    searchQuery = search
  ) => {
    setLoading(true);
    const query = { page, limit: 10 };

    if (searchQuery) {
      query[
        searchQuery.includes("@")
          ? "email"
          : "fullName"
      ] = searchQuery;
    }

    if (startDate && endDate) {
      query.registDate = `${formatDateTime(
        startDate
      )},${formatDateTime(endDate, true)}`;
    } else if (startDate) {
      query.registDate =
        formatDateTime(startDate);
    }

    try {
      const response = await getAllUsers(query);
      const { data, pagination } = response;

      setUsers(data);
      setCurrentPage(pagination.page);
      setTotalPages(
        pagination.total
          ? Math.ceil(
              pagination.total / pagination.limit
            )
          : 1
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch users"
      );
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (
    date,
    isEndDate = false
  ) => {
    if (!date) return null;
    const d = new Date(date);
    d.setHours(
      isEndDate ? 23 : 0,
      isEndDate ? 59 : 0,
      isEndDate ? 59 : 0,
      isEndDate ? 999 : 0
    );
    return d.toISOString();
  };

  useEffect(() => {
    fetchUsers(currentPage, search);
  }, [currentPage, search, startDate, endDate]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
        <Search
          search={search}
          setSearch={setSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSearch={() => {}}
        />
        <div className="flex items-center gap-2 rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400">
          <Button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-all duration-200 text-sm font-medium"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <UserTable
          users={users}
          onEditUser={handleEditUser}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ToastContainerComponent />
    </div>
  );
}
