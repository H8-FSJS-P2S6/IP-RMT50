const express = require('express')
const errorHandler = require('../middlewares/errorHandler')
const channelController = require('./Controllers/channelController')
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))

app.get('/all-channels', channelController.getChannels)
app.get('/channel/:id', channelController.getOneChannel)
app.get('/', channelController.getOneChannel)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})