import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice';
import blogSlice from './blogSlice';
import generalSlice from './generalSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import favoriteSlice from './favoriteSlice';
import orderSlice from './orderSlice';
import sliderSlice from './sliderSlice';

export default configureStore({

    reducer: {

        products: productSlice,
        blogs: blogSlice,
        general: generalSlice,
        user: userSlice,
        cart: cartSlice,
        favorite: favoriteSlice,
        orders: orderSlice,
        slider: sliderSlice,
    },
});