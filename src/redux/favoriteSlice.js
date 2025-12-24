import { createSlice } from '@reduxjs/toolkit';

const fetchFromLocalStorage = () => {

    let favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
};

const storeInLocalStorage = (data) => {

    localStorage.setItem('favorites', JSON.stringify(data));
};

const initialState = {

    favorites: fetchFromLocalStorage()
};

export const favoriteSlice = createSlice({

    name: 'favorites',
    initialState,
    reducers: {

        toggleFavorite: (state, action) => {

            const productId = action.payload._id; 
            const isItemFavorite = state.favorites.find(item => item._id === productId);

            if (isItemFavorite) {

                state.favorites = state.favorites.filter(item => item._id !== productId);
            } else {

                state.favorites.push(action.payload);
            }

            storeInLocalStorage(state.favorites);
        },
        removeFromFavorites: (state, action) => {

            state.favorites = state.favorites.filter(item => (item._id !== action.payload) && (item.id !== action.payload)
        );

        localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {

        state.favorites = [];
        storeInLocalStorage(state.favorites);
    }
},

});

export const { toggleFavorite, removeFromFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;