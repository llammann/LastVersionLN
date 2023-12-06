import { useState, useEffect } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
} from "@chakra-ui/react";
import "./../../../assets/style/admin/AdminHome.scss";

function Users() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");
  const [editUserSurname, setEditUserSurname] = useState("");
  const [editUserPassword, setEditUserPassword] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => {
      setUser(res.data);
      setFilteredUser(res.data);
    });
  }, []);

  useEffect(() => {
    const filteredUsers = user.filter((element) => {
      console.log(element);

      if (!element || !element.name || !element.surname || !element.email) {
        return false;
      }

      const isMatchingSearchTerm =
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.email.toLowerCase().includes(searchTerm.toLowerCase());

      return isMatchingSearchTerm;
    });

    setFilteredUser(filteredUsers);
  }, [searchTerm, user]);

  const handleEditClick = (
    userId,
    userName,
    userSurname,
    userPassword,
    userEmail
  ) => {
    setEditUserId(userId);
    setEditUserName(userName);
    setEditUserSurname(userSurname);
    setEditUserPassword(userPassword);
    setEditUserEmail(userEmail);
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setEditUserId(null);
    setEditUserName("");
    setEditUserSurname("");
    setEditUserPassword("");
    setEditUserEmail("");
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    axios
      .put(`http://localhost:3000/users/${editUserId}`, {
        name: editUserName,
        surname: editUserSurname,
        password: editUserPassword,
        email: editUserEmail,
      })
      .then(() => {
        axios("http://localhost:3000/users").then((res) => {
          setUser(res.data);
          setFilteredUser(res.data);
        });

        handleEditClose();
      })
      .catch((error) => {
        console.error("Error editing user: ", error);
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
                <Th>Surname</Th>
                <Th>Password</Th>
                <Th>Email</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUser.map((element) => (
                <Tr key={element.id}>
                  <Td>{element.id}</Td>
                  <Td>{element.name}</Td>
                  <Td>{element.surname}</Td>
                  <Td>{element.password}</Td>
                  <Td>{element.email}</Td>
                  <Td>
                    <Button
                      colorScheme="cyan"
                      onClick={() =>
                        handleEditClick(
                          element.id,
                          element.name,
                          element.surname,
                          element.password,
                          element.email
                        )
                      }
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        axios
                          .delete(`http://localhost:3000/users/${element.id}`)
                          .then(() => {
                            let updatedUsers = user.filter(
                              (x) => x.id !== element.id
                            );
                            setUser(updatedUsers);
                            setFilteredUser(updatedUsers);
                          })
                          .catch((error) => {
                            console.error("Error deleting user: ", error);
                          });
                      }}
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
      <Modal isOpen={isEditing} onClose={handleEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Username"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
              <Input
                placeholder="Surname"
                value={editUserSurname}
                onChange={(e) => setEditUserSurname(e.target.value)}
              />
              <Input
                placeholder="Password"
                value={editUserPassword}
                onChange={(e) => setEditUserPassword(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
              Save
            </Button>
            <Button onClick={handleEditClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default Users;
