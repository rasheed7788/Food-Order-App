import React from 'react'
import CardContext from './cart-context'
import { useReducer } from 'react/cjs/react.production.min';


const defaultCartState = {
    items : [],
    totalAmount : 0
} ;

const cartReducer = (state,action) => {

    if(action.type === 'ADD'){
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.price.amount;
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount
        };
    }
    return defaultCartState
};


const CartProvider= (props) => {


const [cartState, dispatchCartAction ] = useReducer(cartReducer, defaultCartState);

const addItemCartHandler = (item) => {
    dispatchCartAction({ type : 'ADD' ,  item : item })
};

const removeItemCartHandler = (id) => {
    dispatchCartAction({type : 'REMOVE' , id : id})
};


 const cartContext  = {
    items : cartState.items,
    totalAmount : cartState.totalAmount,
    addItem : addItemCartHandler,
    removeItem : removeItemCartHandler,
 }
  return (
    <CardContext.Provider value={cartContext} >
        {props.children}
    </CardContext.Provider>
  )
}

export default CartProvider