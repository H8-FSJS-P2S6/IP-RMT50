import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import channelReducer from './features/channels/channelSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer
  }
})