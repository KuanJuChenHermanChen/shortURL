const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const { generateUniqueShortUrl } = require('../../controller/shorturl')

router.get('/:shortURL', async (req, res) => {
  try {
    const shortUrl = req.params.shortURL
    let data = await Url.findOne({ shortUrl })
    if (!data) return res.status(404).send('短網址不存在')
    res.redirect(data.originalUrl)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const originalUrl = req.body.url
    let data = await Url.findOne({ originalUrl });
    if (!data) {
      const shortUrl = await generateUniqueShortUrl();
      data = await Url.create({ originalUrl, shortUrl });
    }
    res.render('index', { shortURL: data.shortUrl });
  } catch (err) {
    console.log(err)
  }
})

module.exports = router