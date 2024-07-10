
const { google } = require('googleapis');
const axios = require(`axios`)


class YouTubeService {
    constructor() {
        this.youtube = google.youtube({
            version: 'v3',
            auth: process.env.YOUTUBE_API_KEY
        });
    }

    async getChannelViews(channelId) {
        try {
            const response = await this.youtube.channels.list({
                part: 'statistics',
                id: channelId
            });
            // return response

            if (response.data.items) {
                return response.data.items[0].statistics.viewCount
            }
            else {
                // console.log(`Channel not found: ${channelId}`);
                return null;
            }

        } catch (error) {
            console.error('Error fetching channel views:', error);
            return null;
        }
    }


    async getChannelIdFromLink(url) {
        const urlParts = url.split("/");
        const username = urlParts[urlParts.length - 1]

        try {
            const response = await this.youtube.channels.list({
                "part": [
                    "snippet,contentDetails,statistics"
                  ],
                  "forHandle": `${username}`
            });
            return response.data.items[0]
        } catch (error) {
            console.error("Error fetching channel ID:", error);
            return null;
        }
    }

    async getChannelInfoFromId(id) {
        try {
            const response = await this.youtube.channels.list({
                "part": [
                    "snippet,contentDetails,statistics"
                  ],
                  "id": `${id}`
            });
            return response.data.items[0]
        } catch (error) {
            console.error("Error fetching channel ID:", error);
            return null;
        }
    }

}

module.exports = new YouTubeService();

