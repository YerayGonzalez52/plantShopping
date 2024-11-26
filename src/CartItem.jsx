import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', '')); // Quitar el "$" y convertir a número
      return total + itemCost * item.quantity; // Multiplicar el costo por la cantidad y agregar al total
    }, 0);
  };
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};



    const handleIncrement = (item) => {
        const newQuantity = item.quantity + 1;  // Cambié el nombre de 'updateQuantity' a 'newQuantity'
        dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));  // Llamo a la acción con la nueva cantidad
  };

  const handleDecrement = (item) => {
  if (item.quantity === 1) {
    dispatch(removeItem(item.name));  // Si la cantidad es 1, se elimina el artículo
  } else {
    const newQuantity = item.quantity - 1;  // Cambié el nombre de 'updateQuantity' a 'newQuantity'
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));  // Llamo a la acción con la nueva cantidad
  }
};

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Eliminar el artículo del carrito
  };

  // Calculate total cost based on quantity for an item
  // Calcular el costo total de un artículo basado en su cantidad
    const calculateTotalCost = (item) => {
        const itemCost = parseFloat(item.cost.replace('$', '')); // Quitar el "$" y convertir a número
        return itemCost * item.quantity; // Multiplicar el costo unitario por la cantidad
    };


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


