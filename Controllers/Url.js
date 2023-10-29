const URL = require('../Models/Url');
const shortid = require('shortid');

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;

    // Check if the 'body' object and 'url' property are defined
    if (!body || !body.url) {
      return res.status(400).json({ error: 'url is required in the request body' });
    }

    const shortId = shortid.generate();

    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: []
    });

    return res.json({ id: shortId });
  } catch (error) {
    console.error('Error generating short URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};
