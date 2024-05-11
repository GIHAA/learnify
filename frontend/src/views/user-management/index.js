import styled from "@emotion/styled";
import SearchSection from "layout/MainLayout/Header/SearchSection";
import MainCard from "ui-component/cards/MainCard";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers, removeUser, updateUser } from "api/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddUserModal from "./addUserModal";
import { sassTrue } from "sass";

const MainCardStyle = styled(MainCard)(() => ({
  "& .MuiCardHeader-root": {
    paddingLeft: "38px",
  },
}));

const UserManagementPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false)
  };

  const fetchUsers = async (page = 1, searchText = "") => {
    try {
      const response = await getUsers(page, 4, searchText);
      setUsers(response.data.docs);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers(1, searchText);
  }, [searchText]);

  const handlePageChange = (event, page) => {
    fetchUsers(page);
  };

  const handleView = (userId) => {
    navigate(`/admin/approve-user/view-user/${userId}`);
  };

  const onClick = () => {

    handleOpen();
  };

  const handleRemove = async (userId) => {
    toast((t) => (
      <div className=" bg-white rounded  flex">
        <p className="mb-2">Are you sure you want to delete this user?</p>
        <button
          className="flex ml-2 px-4 pt-3 bg-red-500 text-white rounded hover:bg-red-600 "
          onClick={() => {
            toast.dismiss(t.id);
            confirmDelete(userId);
          }}
        >
          Confirm
        </button>
      </div>
    ));
  };

  const confirmDelete = async (userId) => {
    console.log("View user with ID:", userId);
    toast.success("User deleted successfully");
    await removeUser(userId);
    fetchUsers(currentPage);
  };

  return (
    <MainCardStyle
      title="User Management"
      onClick={onClick}
      buttonText={"Add User"}
    >
      <SearchSection setSearchText={setSearchText} />
      <AddUserModal open={open} handleClose={handleClose}  />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell sx={{ maxWidth: "200px" }}>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell sx={{ maxWidth: "200px" }}>{user.email}</TableCell>

                <TableCell>{user.role}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleView(user._id)}
                  >
                    Edit
                  </Button>
                  <span style={{ margin: "0 5px" }} />
                  <Button
                    variant="outlined"
                    onClick={() => handleRemove(user._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-[40px]">
        <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </MainCardStyle>
  );
};

export default UserManagementPage;
