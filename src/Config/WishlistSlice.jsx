import { createSlice } from "@reduxjs/toolkit";

const MyWishlist = JSON.parse(localStorage.getItem("wishlist"));
console.log("WIshhhh",MyWishlist);

const initialState = {
  wishlist: MyWishlist || [],
};

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    handleWishlist: (state, action) => {
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        // state.wishlist.splice(existingItemIndex, 1);
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.wishlist.push(action.payload);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { handleWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;
