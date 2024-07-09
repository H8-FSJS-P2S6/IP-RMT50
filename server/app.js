require('dotenv').config();
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const channelController = require('./Controllers/channelController')
const UpdateService = require('./services/UpdateService')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))

app.get('/all-channels', channelController.getChannels)
app.post('channel', channelController.AddChannel)
app.get('/channel/:id', channelController.getOneChannel)
app.get('/truncate', channelController.truncateChannel)
app.get(`/updateAll`, UpdateService.updateAllChannelViews)
app.get(`/getoneChannelYoutube`, channelController.getoneChannelYoutube)



app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})