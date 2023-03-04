const express = require('express')
const exphbs = require('express-handlebars')
const { generateShortUrl } = require('./controller/shorturl')
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
    //如果輸入值為空，則返回首頁
    if (!req.body.url) return res.render('/')
    //檢查資料庫是否有相同的網址
    let data = await Url.findOne({ originalUrl: req.body.url })
    //如果沒有相同的網址，則產生短網址
    if (!data) {
      const shortUrl = generateShortUrl(5)
      data = await Url.create({ originalUrl: req.body.url, shortUrl })
    }
    res.render('index', { shortURL: data.shortUrl })
  } catch (err) {
    console.log(err)
  }
})

app.get('/:shortURL', async (req, res) => {
  try {
    const shortUrl = req.params.shortURL
    let data = await Url.findOne({ shortUrl })
    if (!data) {
      return res.render('error', {
        errorMsg: '短網址不存在',
        errorUrl: req.headers.host + "/" + shortUrl,
      })
    }

    res.redirect(data.originalUrl)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})