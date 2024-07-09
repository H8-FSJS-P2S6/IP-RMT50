const YoutubeService = require("../services/YoutubeService")

const ChannelViews = require(`../models`).ChannelViews

class channelController{
    static async getChannels(req,res,next){
        try {
            let result = await ChannelViews.findAll({limit:10})
            res.status(200).json(result)
        } catch (error) {
            res.send(error)
        }
    }

    static async getOneChannel(req,res,next){
        try {
            const { id } = req.params
            console.log(id, "<=================")
            let result = await ChannelViews.findByPk(id)
            console.log(result)
            if(!result){
                res.send("Channel not found")
            }
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
        }
    }

    static async AddChannel(req,res,next){
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

    static async truncateChannel(req,res,next){
        try {
            let result = await ChannelViews.truncate()
            res.status(200).json(result)
        } catch (error) {
            res.send(result)
        }
    }

    static async getoneChannelYoutube(req,res){
        try {
            let result = await YoutubeService.getChannelViews("UCEVKaZpv7xw1jOVN6422z5A")
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    }

}
module.exports = channelController