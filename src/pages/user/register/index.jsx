import { Container } from "react-bootstrap";
import "../../../assets/style/Register.scss";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref } from "yup";
import axios from "axios";

const Login = Yup.object().shape({
  username: Yup.string().required("Please entered username"),
  password: Yup.string()
    .required("Please entered the Correct password!")
    .matches(
      /^(?=.*[a-z])(?=.*\d).{8,}$/,
      "Please entered the Correct password!"
    ),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords do not match"),
});

function index() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="login">
      <title>Login Page</title>

      <div className="login-section">
        <Container>
          <div className="login-form">
            <h2>Register</h2>

            <div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                  confirm_password: "",
                  balance: 0,
                }}
                // validationSchema={Login}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={Login}
                onSubmit={async (values) => {
                  const sameUser = users.find(
                    (element) => element.username === values.username
                  );
                  if (sameUser) {
                    alert("This username is already have an account");
                  } else {
                    axios.post("http://localhost:3000/users", {
                      username: values.username,
                      password: values.password,
                      wishlist: [],
                      basket: [],
                      balance: values.balance,
                    });

                    navigate("/login");
                  }

                  // try {
                  //   const response = await axios.post("http://localhost:3000/users", {
                  //     username: values.username,
                  //     password: values.password,
                  //     wishlist: [],
                  //     basket: [],
                  //     balance: 0,
                  //   });

                  //   if (response.status === 200 || response.status === 201) {
                  //     navigate("/login");
                  //   } else {
                  //     throw new Error("Registration failed");
                  //   }
                  // } catch (error) {
                  //   setError("Registration failed. Please try again.");
                  //   console.error("Registration Error:", error);
                  // }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="input">
                      <label>Username *</label>
                      <div className="input-username">
                        <Field
                          className="username"
                          name="username"
                          style={
                            errors.username &&
                            touched.username && { borderColor: "red" }
                          }
                        />
                      </div>
                    </div>
                    {errors.username && touched.username && (
                      <div
                        style={
                          errors.username &&
                          touched.username && {
                            fontSize: "17px",
                            color: "red",
                            marginTop: "-20px",
                          }
                        }
                      >
                        {errors.username}
                      </div>
                    )}

                    <div className="input">
                      <label>Password *</label>
                      <div
                        className="inputpassword"
                        style={
                          errors.password &&
                          touched.password && { borderColor: "red" }
                        }
                      >
                        <Field className="password" name="password" />
                      </div>
                    </div>
                    {errors.password && touched.password && (
                      <div
                        style={
                          errors.password &&
                          touched.password && {
                            fontSize: "17px",
                            color: "red",
                            marginTop: "-20px",
                          }
                        }
                      >
                        {errors.password}
                      </div>
                    )}
                    <div className="input">
                      <label>Confirm Password *</label>
                      <Field name="confirm_password" />
                    </div>
                    {errors.confirm_password && touched.confirm_password && (
                      <div
                        style={
                          errors.confirm_password &&
                          touched.confirm_password && {
                            fontSize: "17px",
                            color: "red",
                            marginTop: "-20px",
                          }
                        }
                      >
                        {errors.confirm_password}
                      </div>
                    )}
                    <div className="input">
                      <label>Balance *</label>
                      <div className="input-username">
                        <Field className="username" name="balance" />
                      </div>
                    </div>

                    <button type="submit">Sign Up</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="switch-login">
              <Link to={"/login"}> Or Login</Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default index;
