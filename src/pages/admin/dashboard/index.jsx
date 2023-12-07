import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../../assets/style/Dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { width } from "@mui/system";
import { TiDeleteOutline } from "react-icons/ti";
import NavDropdown from "react-bootstrap/NavDropdown";

function Dashboard() {
  const dispatch = useDispatch();
  let myUser = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = () => {
    window.localStorage.removeItem("user");
    sessionStorage.setItem("userlogin", JSON.stringify(false));
    window.location.reload();
  };
  const MyBasket = useSelector((state) => state.basket.basket);

  let subtotal = 0;
  let count = 0;

  MyBasket.map((x) => {
    subtotal += x.products.price * x.count;
    count += x.count;
  });

  const MyWishlist = useSelector((state) => state.wishlist.wishlist);

  // Calculate the quantity WishList
  const wishlistQuantity = MyWishlist ? MyWishlist.length : 0;

  return (
    <>
      <div className="bigContainer">
        <div className="userNavbar">
          <h1>
            <Link to="/admin">Dashboard</Link>
          </h1>
          <div>
            <ul>
              {/* <li>
                <Link to="/admin">Dashboard</Link>
              </li> */}
              <li>
                <Link to="/admin/addProducts">Add Products</Link>
              </li>
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
              <li>
                <Link to="/admin/users">Users</Link>
              </li>

              <li>
                {myUser ? (
                  <NavDropdown title={myUser.username} id="basic-nav-dropdown">
                    <NavDropdown.Item
                      onClick={handleLogOut}
                      style={{
                        lineHeight: "0",
                        margin: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Log out
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      style={{
                        lineHeight: "0",
                        margin: "10px",
                      }}
                    >
                      <Link to="/profile">User Profile</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Link to="/login">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{ color: "#2C541D", fontSize: "20px" }}
                    />
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Dashboard;
