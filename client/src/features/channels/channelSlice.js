import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    channels: []
}

export const channelSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {
        setLoading: (state, {payload}) =>{
            state.loading = payload
        },

        setChannels: (state, {payload}) => {
            state.channels = payload
        }
    }
})

export const {setLoading, setChannels} = channelSlice.actions

export default channelSlice.reducer

export const fetchChannels = () =>{
    return async function (dispatch) {
        let url = `http://localhost:3000/allChannels`
        const response = await axios.get(url);
        dispatch(setChannels(response.data.result))
    }
}