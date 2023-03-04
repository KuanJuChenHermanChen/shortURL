const express = require('express')
const exphbs = require('express-handlebars')
const { generateUniqueShortUrl } = require('./controller/shorturl')
require('./config/mongoose')
const Url = require('./models/url')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static("public"))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', async (req, res) => {
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

app.get('/:shortURL', async (req, res) => {
  try {
    const shortUrl = req.params.shortURL
    let data = await Url.findOne({ shortUrl })
    if (!data) return res.status(404).send('短網址不存在')
    res.redirect(data.originalUrl)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})