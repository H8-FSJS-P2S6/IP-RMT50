const YouTubeService = require('./YoutubeService');
const moment = require('moment');
const ChannelViews = require('../models').ChannelViews;
const { sequelize } = require('../models');
const queryInterface = sequelize.queryInterface;
const { Sequelize, DataTypes } = require('sequelize');



class UpdateService {
    static async updateAllChannelViews(req, res) {
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

            let updatedCount = 0;
            let skippedCount = 0;

            for (const channel of channels) {
                const views = await YouTubeService.getChannelViews(channel.channelId);
                console.log(`ChannelId: ${channel.channelId}, views: ${views}`);

                if (views !== null) {
                    const updateQuery = `
                    UPDATE "ChannelViews"
                    SET "${today}" = ${views}
                    WHERE "channelId" = '${channel.channelId}'
                    RETURNING *;
                  `;

                  await sequelize.query(updateQuery, {raw:true})
                } else {
                    console.log(`Skipped channelId: ${channel.channelId} due to null views`);
                    skippedCount++;
                }
            }

            res.status(200).json({
                message: 'Channel views update process completed'});
        } catch (error) {
            console.error('Error updating channel views:', error);
            res.status(500).json({ error: 'Error updating channel views', details: error.message });
        }
    }
}

module.exports = UpdateService;