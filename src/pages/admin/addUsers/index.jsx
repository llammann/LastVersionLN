import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import "./../../../assets/style/admin/AdminHome.scss";

function AddUsers() {
  const [user, setUser] = useState([]);
  const [id, setId] = useState([]);
  const [username, setUsername] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <ChakraProvider>
      <div className="container">
        <div className="addProduct">
          <Input
            placeholder="Enter the new ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            placeholder="Enter the new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Enter the new email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Enter the new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={() => {
              let user = {
                id: id,
                username: username,
                email: email,
                password: password,
              };
              setId("");
              setUsername("");
              setEmail("");
              setPassword("");
              axios.post("http://localhost:3000/users", user).then((res) => {
                setUser([...data, res.data]);
              });
            }}
          >
            Add User
          </Button>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default AddUsers;
