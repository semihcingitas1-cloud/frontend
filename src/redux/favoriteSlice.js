import { createSlice } from '@reduxjs/toolkit'

{/** const fetchFromLocalStorage = () => {

    let favorite  = localStorage.getItem('cart');

    if(cart){

        return JSON.parse(localStorage.getItem('cart'));
    }else{

        return [];
    }
};

const storeInLocalStorage = (data) => {

    localStorage.setItem('cart', JSON.stringify(data));
};

const initialState = {

    favorites: fetchFromLocalStorage()
};

export const favoriteSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {
  
        addToFavorite: (state, action) => {

            const isItemCart = state.favorites.find(cart => cart.id === action.payload.id);

            if(isItemCart){

                const tempCart = state.favorites.map(item => {

                    if(item.id === action.payload.id){

                        let tempQuantity = item.quantity + action.payload.quantity;
                        return { ...item, quantity: tempQuantity }
                    }else{

                        return item;
                    }
                })

                state.favorites = tempCart;
                storeInLocalStorage(state.favorites);
            }else{

                state.favorites.push(action.payload);
                storeInLocalStorage(state.favorites);
            }
        },
        removeFromCart: (state, action) => {

            const tempCart = state.favorites.filter(item => item.id !== action.payload);
            state.favorites = tempCart;
            storeInLocalStorage(state.favorites);
        },
        clearCart: (state, action) => {

            state.favorites = [];
            storeInLocalStorage(state.favorites);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = favoriteSlice.actions;

export default favoriteSlice.reducer; */}