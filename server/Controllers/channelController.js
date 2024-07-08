const ChannelViews = require(`../models`).ChannelViews

class channelController{
    static async getChannels(req,res,next){
        try {
            let result = await ChannelViews.findAll()
            res.status(200).json(result)
        } catch (error) {
            next()
        }
    }

    static async getOneChannel(req,res,next){
        try {
            let{id} = req.params.id
            let result = await ChannelViews.findByPk(id)
            console.log(result)
            if(!result){
                res.error("Channel not found")
            }
            res.status(200).send(result)
        } catch (error) {
            next()
        }
    }

}
module.exports = channelController