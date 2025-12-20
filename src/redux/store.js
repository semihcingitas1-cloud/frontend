import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice';
import generalSlice from './generalSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import favoriteSlice from './favoriteSlice';
import orderSlice from './orderSlice';
import sliderSlice from './sliderSlice';

export default configureStore({

    reducer: {

        products: productSlice,
        general: generalSlice,
        user: userSlice,
        cart: cartSlice,
        //favorite: favoriteSlice,
        orders: orderSlice,
        slider: sliderSlice,
    },
});