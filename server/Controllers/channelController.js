const YoutubeService = require("../services/YoutubeService")
const { Op } = require("sequelize");
const moment = require('moment');
const ChannelViews = require(`../models`).ChannelViews
const Channel = require(`../models`).Channel
const User = require(`../models`).User
const { sequelize } = require('../models');
const summarizeJSON = require("../services/GeminiService");
const { signToken } = require("../helpers/jwt");
const { checkPassword } = require("../helpers/bcryptjs");
const { Sequelize } = require('sequelize');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();


class channelController {
    static async getAllChannels(req, res, next) {
        try {
            let { title, tag, orderByCreatedAt, page = 1, orderByGrowth, orderByViewCount } = req.query

            let options = {
                include: {
                    model: ChannelViews,
                    attributes: {
                        include: [
                            [Sequelize.literal('(SELECT row_to_json(cv) FROM (SELECT * FROM "ChannelViews" WHERE "ChannelViews"."channelId" = "Channel"."channelId") cv)'), 'all_columns']
                        ]
                    }
                }
            }
    
            if (title) {
                options.where = { title: { [Op.iLike]: `%${title}%` } };
            }
            if (tag) {
                options.include.where = { tag: { [Op.iLike]: `%${title}%` } }
            }
            if (orderByCreatedAt) {
                options.order = [['createdAt', `${orderByCreatedAt}`]]
            }
            if (orderByViewCount) {
                options.order = [['viewCount', `DESC`]]
            }
    
            let allResults = await Channel.findAll(options)
            console.log(allResults[0])
    
            const dateColumns = await sequelize.query(
                `SELECT column_name 
                 FROM information_schema.columns 
                 WHERE table_name = 'ChannelViews' 
                 AND column_name ~ '^\\d{4}-\\d{2}-\\d{2}$' 
                 ORDER BY column_name DESC`,
                { 
                    raw: true,
                }
            );
            const columnNames = dateColumns[0].map(col => col.column_name);
            const previousDate = columnNames[1];
    
            for (let channel of allResults) {
                const previousDateViews = await sequelize.query(
                    `SELECT "${previousDate}"
                    FROM "ChannelViews"
                    WHERE "channelId" = '${channel.channelId}'`,
                    {raw: true}
                )
                if(previousDateViews[0][0] == null || !previousDateViews[0][0][previousDate]){
                    channel.dataValues.growth = 0
                    continue
                }
                channel.dataValues.growth = channel.viewCount - previousDateViews[0][0][previousDate];
            }
            console.log(allResults[0].dataValues.growth, "<================")
            
            if (orderByGrowth) {
                allResults.sort((a, b) => 
                    orderByGrowth.toUpperCase() === 'DESC' ? b.dataValues.growth - a.dataValues.growth : a.dataValues.growth - b.dataValues.growth
                );
            }
    
            // pagination
            const totalCount = allResults.length;
            const paginatedResults = allResults.slice((page - 1) * 25, page * 25);
    
            res.status(200).json({
                result: paginatedResults,
                page: page,
                maxPage: Math.ceil(totalCount / 25),
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Service Error" })
        } 
    }

    static async getOneChannel(req, res, next) {
        try {
            const { channelId } = req.params
            let result = await Channel.findOne({where:{channelId}})
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

    static async AddChannel(req, res) {
        try {
            let user = await User.findByPk(req.user.id)

            if (!user.id || user.role != "admin") {
                res.status(403).json({message:"You must be an admin to do that"})
                return
            }

            const today = moment().format('YYYY-MM-DD');
            let { link, tag } = req.body
            let result = await YoutubeService.getChannelIdFromLink(link)
            if(result == null){
                res.status(404).json({message:"Sorry, we can't find that channel!"})
                return
            }

            let addToChannel = await Channel.create({
                channelId: result.id,
                title: result.snippet.title,
                description: result.snippet.description.substring(0,255),
                customUrl: result.snippet.customUrl,
                publishedAt: result.snippet.publishedAt,
                thumbnails: result.snippet.thumbnails.high.url,
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
                res.status(400).json({ message: "Channel already exists" })
                return
            }
            console.log(error.name)
            res.status(500).json({ message: error })
        }
    }
    static async EditChannel(req, res) {
        try {
            let user = await User.findByPk(req.user.id)

            if (!user.id || user.role != "admin") {
                res.status(403).json({message:"You must be an admin to do that"})
                return
            }
            let { channelId } = req.params
            let { tag } = req.body
            let channel = await ChannelViews.findOne({where:{channelId}})
            if(!channel){
                res.status(404).json({message:"Cannot find channel"})
                return
            }
            console.log(channel.channelName)
            let updated = await channel.update({tag})

            res.status(200).json({ message: "Edit Success!", result:updated})
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Service Error" })
        }
    }

    static async DeleteChannel(req, res) {
        try {
            let user = await User.findByPk(req.user.id)

            if (!user.id || user.role != "admin") {
                res.status(403).json({message:"You must be an admin to do that"})
                return
            }

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