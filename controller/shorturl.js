const Url = require('../models/url')

const generateShortUrl = function (shortenURL) {
  const BASE_62_CHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const MAX = 61
  const MIN = 0
  let result = ''
  for (let i = 0; i < shortenURL; i++) {
    const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1) + MIN)
    const chooseChar = BASE_62_CHAR[randomIndex]
    result += chooseChar
  }
  return result
}

exports.generateUniqueShortUrl = async function () {
  let shortUrl = generateShortUrl(5);
  let duplicate = await Url.findOne({ shortUrl });
  while (duplicate) {
    shortUrl = generateShortUrl(5);
    duplicate = await Url.findOne({ shortUrl });
  }
  return shortUrl;
}