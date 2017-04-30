const cheerio = require('cheerio')
const axios = require('axios')

axios.defaults.baseURL = 'https://www.doutula.com/search';

async function getImageList(keyword) {
  let list = []
  await axios.get('/', { params: { keyword: keyword } }).then((res) => {
    const $ = cheerio.load(res.data)
    const data = $('#pic-detail img')
    $('#pic-detail img').each((i, item) => {
      const isGifIcon = $(item).hasClass('gif')
      if (!isGifIcon) {
        const imageUrl = $(item).data('original')
        let dataItem = {
          id: i.toString(),
          imageUrl: imageUrl
        }
        list.push(dataItem)
      }
    })
  })
  return list
}

module.exports = { getImageList }
