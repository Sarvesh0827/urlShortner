const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "Missing URL" });
    }
    const shortID = shortid.generate(); // Correctly invoke shortid to generate a short ID
    try {
        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
        });
        res.status(200).json({ message:`${shortID}` });
    } catch (error) {
        console.error("Error creating short URL:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId; // Corrected parameter name
   const result  = await URL.findOne({shortId});

   return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory,
   })


}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};



// const shortid = require('shortid');
// const URL = require('../models/url');

// async function handleGenerateNewShortURL(req, res) {
//     const body = req.body;
//     if (!body.url) {
//         return res.status(400).json({ error: "Missing URL" });
//     }
//     const shortID = shortid(); // Invoke shortid as a function to generate a short ID
//     await URL.create({
//         shortId: shortID,
//         redirectUrl: body.url,
//         visitHistory: [],
//     });
// }

// module.exports = {
//     handleGenerateNewShortURL,
// };
