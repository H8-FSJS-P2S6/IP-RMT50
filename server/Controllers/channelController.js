const YoutubeService = require("../services/YoutubeService")
const moment = require('moment');
const ChannelViews = require(`../models`).ChannelViews
const Channel = require(`../models`).Channel
const User = require(`../models`).User
const { sequelize } = require('../models');
const summarizeJSON = require("../services/GeminiService");
const { signToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcryptjs");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();


class channelController {
    static async getChannels(req, res, next) {
        try {
            let result = await ChannelViews.findAll({ limit: 10 })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Service Error" })
        }
    }

    static async getOneChannel(req, res, next) {
        try {
            const { id } = req.params
            let result = await Channel.findByPk(id)
            console.log(result)
            if (!result) {
                res.send("Channel not found")
            }
            let geminiText = await summarizeJSON(result)            

            res.status(200).send({found: result, AIText: geminiText})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Service Error" })
        }
    }

    static async truncateChannel(req, res, next) {
        try {
            let result = await ChannelViews.truncate()
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Service Error" })
        }
    }

    static async getoneChannelYoutube(req, res) {
        try {
            let result = await YoutubeService.getChannelViews("UCEVKaZpv7xw1jOVN6422z5A")
            res.send(result)
        } catch (error) {
            res.send(error)
        }
    }

    static async AddChannel(req, res) {
        try {
            const today = moment().format('YYYY-MM-DD');
            let { link, tag } = req.body
            let result = await YoutubeService.getChannelIdFromLink(link)
            console.log(today)

            let addToChannel = await Channel.create({
                channelId: result.id,
                title: result.snippet.title,
                description: result.snippet.description,
                customUrl: result.snippet.customUrl,
                publishedAt: result.snippet.publishedAt,
                thumbnails: result.snippet.thumbnails.default.url,
                country: result.snippet.country,
                viewCount: result.statistics.viewCount,
                subscriberCount: result.statistics.subscriberCount,
                videoCount: result.statistics.videoCount
            })



            let addToChannelViews = await ChannelViews.create({
                channelName: result.snippet.title,
                channelId: result.id,
                tag
            })

            let updateQuery =
                `UPDATE "ChannelViews" 
                SET "${today}" = ${result.statistics.viewCount}
                 WHERE "channelId" = '${result.id}'
                RETURNING *;
                `

            await sequelize.query(updateQuery, { raw: true })

            res.status(201).json({ message: `${result.snippet.title} added!`})
        } catch (error) {
            console.log(error)
            if (error.name == 'SequelizeUniqueConstraintError') {
                res.json({ message: "Channel already exists" })
                return
            }
            res.status(500).json({ message: "Internal Service Error" })
        }
    }
    static async EditChannel(req, res) {
        try {
            let { channelId } = req.params
            let { tag } = req.body
            await ChannelViews.update({
                tag
            }, {
                where: { channelId },
            });
            res.status(200).json({ message: "Edit Success!" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Service Error" })
        }
    }

    static async DeleteChannel(req, res) {
        try {
            let { channelId } = req.params

            await ChannelViews.destroy({
                where: { channelId },
            });
            await Channel.destroy({
                where: { channelId },
            });
            res.status(200).json({ message: "Delete Success!" })
        } catch (error) {
            console.log(error)

            res.status(500).json({ message: "Internal Service Error" })
        }
    }

    static async login(req, res) {
        try {
            let {username,password} = req.body
            console.log("username: ", username)
            console.log("password: ", password)
            if(!username){
                res.status(400).json({message:"Username is required"})
                return
            }
            if(!password){
                res.status(400).json({message:"Password is required"})
                return
            }
            let user = await User.findOne({where: {username:username}})
            if(!user){
                res.status(401).json({message:"Invalid Username/Password"})
                return
            }
            if(!checkPassword(password, user.password)){
                res.status(401).json({message:"Invalid Username/Password"})
                return
            }
            let token = signToken({id:user.id})
            res.status(200).json({access_token: token})

        } catch (err) {
            if (err.name == "SequelizeValidationError") {
                let message = err.errors.map(e => e.message)
                res.status(400).send(message)
                return
            }
            console.log(err)
            res.status(500).json({message: "Internal server error"})
        }
    }

    static async googleLogin(req,res){
        try {

            const { googleToken } = req.body
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            const [user, created] = await User.findOrCreate({
                where: { username: payload.email },
                hooks: false,
                defaults: {
                  username: payload.email,
                  password: Math.random().toString(),
                  role: "user",
                },});
                let token = signToken({id:user.id})
                res.status(created ? 201 : 200).json({access_token: token})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error"})
        }
    }

}
module.exports = channelController