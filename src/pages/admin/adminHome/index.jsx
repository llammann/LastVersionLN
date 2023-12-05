import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

function AdminHome() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/products").then((res) => {
      setData(res.data);
    });
    axios("http://localhost:3000/users").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <ChakraProvider>
      <div className="container">
        <Input
          placeholder="Enter the new product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Enter the new product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          placeholder="Enter the new product category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button
          colorScheme="teal"
          onClick={() => {
            let prod = {
              name: name,
              price: price,
              category: category,
            };
            setName("");
            setPrice("");
            setCategory("");
            axios.post("http://localhost:3000/products", prod).then((res) => {
              setData([...data, res.data]);
            });
          }}
        >
          Add Product
        </Button>
        {}
        <TableContainer
          style={{
            border: "3px solid red",
            padding: "50px",
            margin: "60px 0",
            backgroundColor: "#E2E8F0",
          }}
        >
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((element) => (
                <Tr key={element.id}>
                  <Td>{element.id}</Td>
                  <Td>
                    <img
                      src={element.image}
                      alt=""
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Td>
                  <Td>{element.name}</Td>
                  <Td>{element.category}</Td>
                  <Td>{element.price}</Td>
                  <Td>
                    <Button colorScheme="cyan">Edit</Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        axios
                          .delete(
                            `http://localhost:3000/products/${element.id}`
                          )
                          .then(() => {
                            let filteredProducts = data.filter(
                              (x) => x.id !== element.id
                            );
                            setData(filteredProducts);
                          })
                          .catch((error) => {
                            console.error("Error deleting product: ", error);
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

      <div className="container" style={{ paddingTop: "70px" }}>
        <TableContainer
          style={{
            border: "3px solid red",
            padding: "50px",
            margin: "60px 0",
            backgroundColor: "#E2E8F7",
          }}
        >
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
              {user.map((element) => (
                <Tr key={element.id}>
                  <Td>{element.id}</Td>
                  <Td>{element.name}</Td>
                  <Td>{element.surname}</Td>
                  <Td>{element.password}</Td>
                  <Td>{element.email}</Td>
                  <Td>
                    <Button colorScheme="cyan">Edit</Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        axios
                          .delete(`http://localhost:3000/users/${element.id}`)
                          .then(() => {
                            let filteredUsers = user.filter(
                              (x) => x.id !== element.id
                            );
                            setUser(filteredUsers);
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
    </ChakraProvider>
  );
}

export default AdminHome;
