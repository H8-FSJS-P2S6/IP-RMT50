require('dotenv').config();
const express = require('express')  
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')
const channelController = require('./Controllers/channelController')
const app = express()
const port = 3000


const cron = require('node-cron');
const authentication = require('./middlewares/authentication');
const updateAllChannelViews = require('./services/UpdateService');



cron.schedule('0 0 0 * * *', () => {
  updateAllChannelViews()
    .then(() => console.log('Update completed'))
    .catch(error => console.error('Update failed:', error));
});



app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.post('/login', channelController.login)
app.post('/login/google', channelController.googleLogin)


app.get('/allChannels', channelController.getAllChannels)
app.get('/channel/:channelId', channelController.getOneChannel)

app.use(authentication)
app.post('/channel', channelController.AddChannel)
app.put('/channel/:channelId', channelController.EditChannel)
app.delete('/channel/:channelId', channelController.DeleteChannel)


app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})