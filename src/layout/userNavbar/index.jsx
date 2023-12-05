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

function UserNavbar() {
  const MyBasket = useSelector((state) => state.basket.basket);
  console.log(MyBasket);

  // const MyBasket = JSON.parse(localStorage.getItem("basket"));
  // console.log(MyBasket);

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
                      padding: "0",
                    }}
                  >
                    <span>
                      <MdFavorite
                        style={{
                          color: "#2C541D",
                          width: "25px",
                          height: "25px",
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
                    padding: "0px",
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
                      // style={{
                      //   backgroundColor: "blue",
                      // }}
                    >
                      <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        Shopping Cart
                      </h5>
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
                      <button
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: " #74a84a",
                        }}
                      >
                        <Link to="/basket"
                        style={{
                          color: "white",
                        }}
                        >VIEW CHART</Link>
                      </button>
                      <br />
                      <button
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: " #74a84a",
                          color: "white",
                        }}
                      >
                        <Link to="/checkout">CHECKOUT</Link>
                      </button>
                    </div>
                  </div>

                  <span>
                    <FaShoppingBag
                      style={{ color: "#2C541D", fontSize: "25px" }}
                    />
                  </span>
                </button>
                <sup className="up">
                  <span>{basketQuantity}</span>
                </sup>
              </li>
              <li>
                <Link to="/login">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: "#2C541D", fontSize: "20px" }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNavbar;
