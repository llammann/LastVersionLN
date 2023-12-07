import { useState, useEffect } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import "./../../../assets/style/admin/AdminHome.scss";

function Users() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios("http://localhost:3000/users");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    const filteredUsers = data.filter((element) => {
      const isMatchingSearchTerm =
        (element.username &&
          element.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (element.email &&
          element.email.toLowerCase().includes(searchTerm.toLowerCase()));

      return isMatchingSearchTerm;
    });

    setFilteredData(filteredUsers);
  }, [searchTerm, data]);

  const handleEditClick = (
    userId,
    userName,
    userEmail,
    userPassword,
    userBalance
  ) => {
    setEditUserId(userId);
    setEditUserName(userName);
    setEditUserEmail(userEmail);
    setEditUserPassword(userPassword);
    setEditUserBalance(userBalance);
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setEditUserId(null);
    setEditUserName("");
    setEditUserEmail("");
    setEditUserPassword("");
    setEditUserBalance("");
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:3000/users/${editUserId}`, {
        username: editUserName,
        email: editUserEmail,
        password: editUserPassword,
        balance: editUserBalance,
      })
      .then(() => {
        fetchData();
        handleEditClose();
      })
      .catch((error) => {
        console.error("Error editing user: ", error);
      });
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:3000/users/${userId}`)
      .then(() => {
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting user: ", error);
      });
  };

  return (
    <ChakraProvider>
      <div className="container">
        <div className="search-section">
          <Input
            type="text"
            placeholder="Search users..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <TableContainer className="userTable">
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Password</Th>
                <Th>Balance</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map((element) => (
                <Tr key={element.id}>
                  <Td>{element.id}</Td>
                  <Td>{element.username}</Td>
                  <Td>{element.email}</Td>
                  <Td>{element.password}</Td>
                  <Td>{element.balance}</Td>
                  <Td>
                    <Button
                      onClick={() => handleDelete(element.id)}
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      {/* Edit Modal */}
    </ChakraProvider>
  );
}

export default Users;
