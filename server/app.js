require('dotenv').config();
const express = require('express')
const errorHandler = require('./middlewares/errorHandler')
const channelController = require('./Controllers/channelController')
const UpdateService = require('./services/UpdateService')
const app = express()
const port = 3000


const cron = require('node-cron');
const { exec } = require('child_process');

// Schedule the task to run at midnight every day
cron.schedule('0 0 * * *', () => {
  exec('node services/UpdateService.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
});




app.use(express.urlencoded({extended:true}))

app.get('/all-channels', channelController.getChannels)
app.get('/channel/:id', channelController.getOneChannel)

app.post('/channel', channelController.AddChannel)
app.put('/channel/:channelId', channelController.EditChannel)
app.delete('/channel/:channelId', channelController.DeleteChannel)

app.get('/truncate', channelController.truncateChannel)
app.get(`/updateAll`, UpdateService.updateAllChannelViews)
app.get(`/getoneChannelYoutube/:channelId`, channelController.getoneChannelYoutube)



app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})