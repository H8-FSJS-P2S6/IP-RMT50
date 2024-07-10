import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    channels: [],
    channel: {},
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
        },
        setChannel: (state, {payload}) =>{
            state.channel = payload
        },
    }
})

export const {setLoading, setChannels, setChannel} = channelSlice.actions

export default channelSlice.reducer

export const fetchChannels = (search) =>{
    return async function (dispatch) {
        dispatch(setLoading(true))
        let url = `http://localhost:3000/allChannels/?`
        if (search) url += `title=${search}&`
        const response = await axios.get(url);
        dispatch(setChannels(response.data.result))
        dispatch(setLoading(false))
    }
}

export const fetchOneChannel = (channelId) =>{
    return async function (dispatch) {
        dispatch(setLoading(true))
        let url = `http://localhost:3000/channel/${channelId}`
        const response = await axios.get(url);
        dispatch(setChannel(response.data))
        dispatch(setLoading(false))
    }
}
