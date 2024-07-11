import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    channels: [],
    channel: {},
    showAddModal: false,
    showEditModal: false,
    maxPage: 0,
    page: 1,
    orderBy: ""
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
        },
        setMaxPage: (state, { payload }) => {
            state.maxPage = payload
        },
        setPage: (state, { payload }) => {
            state.page = payload
        },
        setOrderBy: (state, { payload }) => {
            state.orderBy = payload
        },
        setNextPage: (state) => {
            if (state.page < state.maxPage){
                state.page += 1
            }

        },
        setPreviousPage: (state) => {
            if (state.page > 1){
                state.page -= 1
            }

        },
    }
})

export const { setLoading, setChannels, setChannel, setAddModal, setEditModal, setMaxPage, setPage, setOrderBy, setNextPage, setPreviousPage } = channelSlice.actions

export default channelSlice.reducer

export const fetchChannels = (search, orderBy, page) => {
    return async function (dispatch) {
        // dispatch(setLoading(true))
        let url = `http://localhost:3000/allChannels/?`
        if (search) url += `title=${search}&`
        if (page) url += `page=${page}&`
        url+=`${orderBy}=DESC`
        const response = await axios.get(url);
        console.log(response.data.maxPage)
        dispatch(setMaxPage(response.data.maxPage))
        dispatch(setChannels(response.data.result))
        // dispatch(setLoading(false))
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

export const handleOrderBy2 = (value) => {
    return async function (dispatch) {
        console.log(value,"<==slicee")
        dispatch(setOrderBy(value))
    }
}

export const handleNextPage2 = () => {
    return async function (dispatch) {
        dispatch(setNextPage())
    }
}

export const handlePreviousPage2 = () => {
    return async function (dispatch) {
        dispatch(setPreviousPage())
    }
}

