import { createSlice } from "@reduxjs/toolkit";

const MyBasket = JSON.parse(localStorage.getItem("basket"));

const initialState = {
  basket: MyBasket || [],
};

const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    handleBasket: (state, actions) => {
      if (state.basket.some((x) => x.products.id === actions.payload.id)) {
        state.basket.forEach((elem) => {
          if (elem.products.id === actions.payload.id) {
            elem.count += 1;
          }
        });
      } else {
        state.basket.push({ count: 1, products: actions.payload });
      }

      localStorage.setItem("basket", JSON.stringify(state.basket));
    },

    handleMinus: (state, actions) => {
      console.log("Handling Minus");

      const existingItem = state.basket.find(
        (item) => item.products.id === actions.payload.products.id
      );

      if (existingItem && existingItem.count > 1) {
        existingItem.count -= 1;
      } else {
        // Remove the item from the basket if count is 1 or less
        state.basket = state.basket.filter(
          (item) => item.products.id !== actions.payload.products.id
        );
      }

      localStorage.setItem("basket", JSON.stringify(state.basket));
    },

    handlePlus: (state, actions) => {
      console.log("Handling Plus");

      const existingItem = state.basket.find(
        (item) => item.products.id === actions.payload.products.id
      );

      if (existingItem) {
        existingItem.count += 1;
      }
      console.log(state.basket);
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },

    removeFromBasket: (state,actions) => {
      console.log("buraa", actions.payload.products.id);
      // gives the id that i want
      const productIdToRemove = actions.payload.products.id;

      // Remove

      state.basket = state.basket.filter(
        (item) => item.products.id !== productIdToRemove
      );
      console.log("after remove",state.basket)
      localStorage.setItem("basket", JSON.stringify(state.basket));

    },

    // updateBasket: (state, actions) => {
    //   const MyBasket = JSON.parse(localStorage.getItem("basket"));
    //   console.log("Bassss", MyBasket);
    //   state.basket = MyBasket || [];
    // },
  },
});

export const { handleBasket, handleMinus, handlePlus, updateBasket,removeFromBasket } =
  BasketSlice.actions;

export default BasketSlice.reducer;
