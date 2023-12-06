import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/style/userNavbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { width } from "@mui/system";
import NavDropdown from "react-bootstrap/NavDropdown";

function UserNavbar() {
  let myUser = JSON.parse(localStorage.getItem("user"));
  const handleLogOut = () => {
    window.localStorage.removeItem("user");
    sessionStorage.setItem("userlogin", JSON.stringify(false));
    window.location.reload();
  };

  let subtotal = 0;

  const MyBasket = useSelector((state) => state.basket.basket);
  console.log(MyBasket);

  MyBasket.map((x) => {
    subtotal += x.products.price * x.count;
  });

  // Calculate the quantity Basket
  const basketQuantity = MyBasket ? MyBasket.length : 0;
  console.log(basketQuantity);

  const MyWishlist = useSelector((state) => state.wishlist.wishlist);
  console.log(MyWishlist);

  // Calculate the quantity WishList
  const wishlistQuantity = MyWishlist ? MyWishlist.length : 0;
  console.log(wishlistQuantity);

  return (
    <>
      <div className="bigContainer">
        <div className="userNavbar">
          <h1>
            <Link to="/">EARTH STORE</Link>
          </h1>
          <div>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
              <li>
                <Link to="/shop">SHOP</Link>
              </li>
              <li className="wish">
                <Link to="/wishlist">
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "0 20px",
                    }}
                  >
                    <span>
                      <MdFavorite
                        style={{
                          color: "#2C541D",
                          width: "29px",
                          height: "29px",
                        }}
                      />
                    </span>

                    <sup className="up">
                      <span>{wishlistQuantity}</span>
                    </sup>
                  </button>
                </Link>
              </li>
              <li className="bag">
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "0 20px",
                  }}
                >
                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                    // style={{
                    //   backgroundColor: "red",
                    // }}
                  >
                    <div
                      class="offcanvas-header"
                      style={{
                        color: "#74a84a",
                        padding: "30px",
                      }}
                    >
                      <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        Shopping Cart
                      </h5>
                      <hr />
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div
                      class="offcanvas-body"
                      style={{
                        // backgroundColor: "yellow",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "30px",
                      }}
                    >
                      <hr />
                      <div
                        className="subTotal"
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "20px",
                        }}
                      >
                        <span
                          style={{
                            // padding-right: .5em;
                            // text-align: left;
                            // font-weight: 500;
                            fontWeight: "500",
                            fontSize: "30px",
                            color: "#74a84a",
                          }}
                        >
                          Subtotal:
                        </span>
                        <span> ${subtotal.toFixed(2)}</span>
                      </div>

                      <hr />
                      <button
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: " #74a84a",
                        }}
                      >
                        <Link
                          to="/basket"
                          style={{
                            color: "white",
                          }}
                        >
                          VIEW CHART
                        </Link>
                      </button>
                      <br />
                      <button
                          className="Checkout"

                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: " #74a84a",
                          color: "white",
                        }}
                      >
                        <Link to="/checkout"
                       
                        >CHECKOUT</Link>
                      </button>
                    </div>
                  </div>

                  <span>
                    <FaShoppingBag
                      style={{
                        color: "#2C541D",
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </span>
                  <sup className="up">
                    <span>{basketQuantity}</span>
                  </sup>
                </button>
              </li>
              <li>
                {myUser ? (
                  <NavDropdown title={myUser.username} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleLogOut}>
                      Log out
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
    </>
  );
}

export default UserNavbar;
