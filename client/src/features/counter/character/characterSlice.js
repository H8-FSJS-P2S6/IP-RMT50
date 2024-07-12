import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    characters: []
};

export const characterSlice = createSlice({
    name: `character`,
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },
        setCharacter: (state, { payload }) => {
            state.characters = payload
        }
    }
})

export const { setLoading, setCharacter } = characterSlice.actions;

export default characterSlice.reducer;