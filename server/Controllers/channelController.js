const YoutubeService = require("../services/YoutubeService")
const moment = require('moment');
const ChannelViews = require(`../models`).ChannelViews
const Channel = require(`../models`).Channel
const { sequelize } = require('../models');
const summarizeJSON = require("../services/GeminiService");


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

}
module.exports = channelController