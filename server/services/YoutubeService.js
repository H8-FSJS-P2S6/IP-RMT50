
const { google } = require('googleapis');   


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
            else{
                // console.log(`Channel not found: ${channelId}`);
                return null;
            }

        } catch (error) {
            console.error('Error fetching channel views:', error);
            return null;
        }
    }
}

module.exports = new YouTubeService();