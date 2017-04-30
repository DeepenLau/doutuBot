const cheerio = require('cheerio')
const axios = require('axios')

axios.defaults.baseURL = 'https://www.doutula.com/search';

async function getImageList(keyword) {
  let list = []
  await axios.get('/', { params: { keyword: keyword }}).then((res) => {
    const $ = cheerio.load(res.data)
    const data = $('#pic-detail img')
    $('#pic-detail img').each((i, item) => {
      var isGif = $(item).hasClass('gif')
      if (!isGif) {
        var itemUrl = $(item).data('original')
        list.push('https:' + itemUrl)
      }
    })
  })
  return list
}

module.exports = getImageList
