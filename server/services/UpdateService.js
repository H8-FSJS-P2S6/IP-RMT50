require('dotenv').config();
const YouTubeService = require('./YoutubeService');
const moment = require('moment');
const ChannelViews = require('../models').ChannelViews;
const Channel = require('../models').Channel;
const { sequelize } = require('../models');
const queryInterface = sequelize.queryInterface;
const { Sequelize, DataTypes } = require('sequelize');




     async function updateAllChannelViews(req, res) {
        const today = moment().format('YYYY-MM-DD');

        try {
            const tableInfo = await queryInterface.describeTable('ChannelViews');

            if (!tableInfo[today]) {
                await sequelize.query(`
                    ALTER TABLE "ChannelViews"
                    ADD COLUMN IF NOT EXISTS "${today}" INTEGER
                `, { raw: true });
            }

            // Fetch all channel IDs
            const channels = await ChannelViews.findAll({
                attributes: ['channelId']
            });


            let skippedCount = 0;

            for (const channel of channels) {
                const views = await YouTubeService.getChannelViews(channel.channelId);
                console.log(`UPDATE DATA RUNNING`);



                if (views !== null) {
                    let channelData = await Channel.findOne({ where: { channelId: channel.channelId } })
                    let updated = await channelData.update({ viewCount: views })



                    const updateQuery = `
                    UPDATE "ChannelViews"
                    SET "${today}" = ${views}
                    WHERE "channelId" = '${channel.channelId}'
                    RETURNING *;
                  `;

                    await sequelize.query(updateQuery, { raw: true })
                } else {
                    console.log(`Skipped channelId: ${channel.channelId} due to null views`);
                    skippedCount++;
                }
            }


        } catch (error) {
            console.error('Error updating channel views:', error);

        }
    }

module.exports = updateAllChannelViews