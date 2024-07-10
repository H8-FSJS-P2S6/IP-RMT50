import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    channels: [],
    channel: {},
    showAddModal: false,
    showEditModal: false
}

export const channelSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload
        },

        setChannels: (state, { payload }) => {
            state.channels = payload
        },
        setChannel: (state, { payload }) => {
            state.channel = payload
        },
        setAddModal: (state, { payload }) => {
            state.showAddModal = payload
        },
        setEditModal: (state, { payload }) => {
            state.showEditModal = payload
        }
    }
})

export const { setLoading, setChannels, setChannel, setAddModal, setEditModal } = channelSlice.actions

export default channelSlice.reducer

export const fetchChannels = (search) => {
    return async function (dispatch) {
        dispatch(setLoading(true))
        let url = `http://localhost:3000/allChannels/?`
        if (search) url += `title=${search}&`
        const response = await axios.get(url);
        dispatch(setChannels(response.data.result))
        dispatch(setLoading(false))
    }
}

export const fetchOneChannel = (channelId) => {
    return async function (dispatch) {
        dispatch(setLoading(true))
        let url = `http://localhost:3000/channel/${channelId}`
        const response = await axios.get(url);
        dispatch(setChannel(response.data))
        console.log(response.data)
        dispatch(setLoading(false))
    }
}

export const handleAddModal2 = (value) => {
    return async function (dispatch) {
        console.log(value,"<==slicee")
        dispatch(setAddModal(value))
    }
}

export const handleEditModal2 = (value) => {
    return async function (dispatch) {
        console.log(value,"<==slicee")
        dispatch(setEditModal(value))
    }
}