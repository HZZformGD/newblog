const musicApi = require('music-api')

var getId = (string) => {
  return new Promise(resolve => {
    musicApi.searchSong('netease', {
      key: string,
      limit: 10,
      page: 1
    }).then(async (data) => {
      var arr = [];
      for ( let i in data.songList){
        let item =data.songList[i]
        let src = await getSrc(item.id)
        if (src.success) {
          let obj = {
            name:data.songList[i].name,
            author:item.artists[0].name,
            img:item.album.cover,
            src:src.url
          }
          arr.push(obj)
        }
      }
      resolve(arr)
    }).catch((err) => {
      console.log(err)
    })
  })
}

var getSrc = (id) => {
  return new Promise(resolve => {
    musicApi.getSong('netease', {
      id: JSON.stringify(id),
      raw: false,
      br: 999000
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      console.log(err)
    })
  })
}


module.exports = {
  getId
}