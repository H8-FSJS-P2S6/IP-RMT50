require('dotenv').config();
const ChannelViews = require(`./models`).ChannelViews
const Channel = require(`./models`).Channel
const { sequelize } = require('./models');
const YoutubeService = require('./services/YoutubeService');

async function initializeData() {
    const clipperJson = require(`./db/Clippertrack.json`)
    let clippers = clipperJson
        .filter(e => e !== null && e !== undefined && e.channelName !== null && e.channelName !== undefined && e.channelId !== null && e.channelId !== undefined)
    // console.log(clippers.length)
    clippers.forEach(async (clipper) => {
        try {
            let result = await YoutubeService.getChannelInfoFromId(clipper.channelId)
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

            
            console.log(clipper["2024-07-01"])
            const addQuery = `
INSERT INTO "ChannelViews" (
    "channelName",
    "channelId",
    tag,
    "createdAt",
    "updatedAt",
    "2022-03-01",
    "2022-03-16",
    "2022-04-01",
    "2022-04-16",
    "2022-05-01",
    "2022-05-16",
    "2022-06-01",
    "2022-06-16",
    "2022-07-01",
    "2022-07-16",
    "2022-08-01",
    "2022-08-16",
    "2022-09-01",
    "2022-09-16",
    "2022-10-01",
    "2022-10-16",
    "2022-11-01",
    "2022-11-16",
    "2022-12-01",
    "2022-12-16",
    "2023-01-01",
    "2023-01-16",
    "2023-02-01",
    "2023-02-16",
    "2023-03-01",
    "2023-03-16",
    "2023-04-01",
    "2023-04-16",
    "2023-05-01",
    "2023-05-16",
    "2023-06-01",
    "2023-06-16",
    "2023-07-01",
    "2023-07-16",
    "2023-08-01",
    "2023-08-16",
    "2023-09-01",
    "2023-09-16",
    "2023-10-01",
    "2023-10-16",
    "2023-11-01",
    "2023-11-16",
    "2023-12-01",
    "2023-12-16",
    "2024-01-01",
    "2024-01-16",
    "2024-02-01",
    "2024-02-16",
    "2024-03-01",
    "2024-03-16",
    "2024-04-01",
    "2024-04-16",
    "2024-05-01",
    "2024-05-16",
    "2024-06-01",
    "2024-06-16",
    "2024-07-01"
    ) VALUES (
        '${clipper["channelName"]}',
        '${clipper["channelId"]}',
        '${clipper["tag"]}',
        '2024-07-09 20:23:52.485 +0700',
        '2024-07-09 20:23:52.485 +0700',
        ${clipper["2022-03-01"]},
        ${clipper["2022-03-16"]},
        ${clipper["2022-04-01"]},
        ${clipper["2022-04-16"]},
        ${clipper["2022-05-01"]},
        ${clipper["2022-05-16"]},
        ${clipper["2022-06-01"]},
        ${clipper["2022-06-16"]},
        ${clipper["2022-07-01"]},
        ${clipper["2022-07-16"]},
        ${clipper["2022-08-01"]},
        ${clipper["2022-08-16"]},
        ${clipper["2022-09-01"]},
    ${clipper["2022-09-16"]},
    ${clipper["2022-10-01"]},
    ${clipper["2022-10-16"]},
    ${clipper["2022-11-01"]},
    ${clipper["2022-11-16"]},
    ${clipper["2022-12-01"]},
    ${clipper["2022-12-16"]},
    ${clipper["2023-01-01"]},
    ${clipper["2023-01-16"]},
    ${clipper["2023-02-01"]},
    ${clipper["2023-02-16"]},
    ${clipper["2023-03-01"]},
    ${clipper["2023-03-16"]},
    ${clipper["2023-04-01"]},
    ${clipper["2023-04-16"]},
    ${clipper["2023-05-01"]},
    ${clipper["2023-05-16"]},
    ${clipper["2023-06-01"]},
    ${clipper["2023-06-16"]},
    ${clipper["2023-07-01"]},
    ${clipper["2023-07-16"]},
    ${clipper["2023-08-01"]},
    ${clipper["2023-08-16"]},
    ${clipper["2023-09-01"]},
    ${clipper["2023-09-16"]},
    ${clipper["2023-10-01"]},
    ${clipper["2023-10-16"]},
    ${clipper["2023-11-01"]},
    ${clipper["2023-11-16"]},
    ${clipper["2023-12-01"]},
    ${clipper["2023-12-16"]},
    ${clipper["2024-01-01"]},
    ${clipper["2024-01-16"]},
    ${clipper["2024-02-01"]},
    ${clipper["2024-02-16"]},
    ${clipper["2024-03-01"]},
    ${clipper["2024-03-16"]},
    ${clipper["2024-04-01"]},
    ${clipper["2024-04-16"]},
    ${clipper["2024-05-01"]},
    ${clipper["2024-05-16"]},
    ${clipper["2024-06-01"]},
    ${clipper["2024-06-16"]},
    ${clipper["2024-07-01"]}
)`;

            await sequelize.query(addQuery, { raw: true });

        } catch (err) {
            console.log(err)
        }
    });


}

initializeData()