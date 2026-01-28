import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    keyword: "",
    openModal: false,
    openUpdateModal: false,
    openOrderModal: false,
};

export const generalSlice = createSlice({

    name: 'general',
    initialState,
    reducers: {
  
        getKeyword: (state, action) => {

            state.keyword = action.payload
        },
        openModalFunc: (state, action) => {

            state.openModal = !state.openModal
        },
        openUpdateModalFunc: (state, action) => {

            state.openUpdateModal = !state.openUpdateModal
        },
        openOrderModalFunc: (state, action) => {

            state.openOrderModal = !state.openOrderModal
        },
    },
});

export const { getKeyword, openModalFunc, openUpdateModalFunc, openOrderModalFunc } = generalSlice.actions;

export default generalSlice.reducer;