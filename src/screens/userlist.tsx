import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Header from "./header";

import "../components/auth.css"

type User = {
  name: string;
  address: string;
  email: string;
  phone: string;
  userId: number;
  content: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // Fetch users from localStorage
  const fetchUsers = () => {
    const storedUserData = localStorage.getItem("userDataArray");
    if (storedUserData) {
      try {
        const parsedData: User[] = JSON.parse(storedUserData);
        setUsers(parsedData);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (userId: number) => {
    const storedUserData = localStorage.getItem("userDataArray");
    if (storedUserData) {
      const parsedData: User[] = JSON.parse(storedUserData);
      const userData = parsedData.find((user) => user.userId === userId);
      if (userData) {
        navigate("/RichTextEditor", { state: { userData } });
      }
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="page-container">
      <Header />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "26px" }}>
        <Typography variant="h5" gutterBottom>
          User Data List
        </Typography>
        {users.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell  >
                      <strong>User ID</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Address</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Phone</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
               <TableBody>
  {users
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((user) => (
      <TableRow key={user.userId}>
        <TableCell>{user.userId}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.address}</TableCell>
        <TableCell>
          <div
            dangerouslySetInnerHTML={{
              __html: user.content,
            }}
          />
        </TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>
          <IconButton
            color="primary"
            onClick={() => handleEdit(user.userId)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ))}
</TableBody>

              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No user data available.
          </Typography>
        )}
      </div>
      
    </div>
  );
};

export default UserList;
