import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    itemCount: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        
        // Verificar si el producto ya está en el carrito
        const existingItem = state.items.find(item => item.name === name);
        
        if (existingItem) {
          // Si ya existe, aumentar la cantidad
          existingItem.quantity++;
          state.itemCount += 1;

        } else {
          // Si no existe, agregarlo al carrito con cantidad 1
          state.items.push({ name, image, cost, quantity: 1 });
          state.itemCount += 1;
        }
      },
      
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
        state.itemCount = 0;

    },
    updateQuantity: (state, action) => {

        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
