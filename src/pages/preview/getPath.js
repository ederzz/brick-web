const paths = [] // UI地址
const getPath = (bui) => {

  for(const k in bui) {
    // json
    //console.log('k',k,bui[k], typeof bui[k], Array.isArray(bui[k]))
    if(typeof bui[k] === 'object' && Array.isArray(bui[k])) {
      // 数组
      for(const o of bui[k]) {
        getPath(o)
      }
    }else if(typeof bui[k] === 'object') {
      // 对象
      const o = bui[k]
      getPath(o)
    }else if(/[a-zA-Z0-9\-]+/.test(bui[k])) {
      // /[a-zA-Z0-9_.]+\/[a-zA-Z0-9_.]+/
      // 地址
      //console.log('1',k,bui,bui[k])
      let path = bui[k]
      if(/\/</.test(path)) {
        paths.push(path.slice(0,path.indexOf('/')))
      }else{
        paths.push(path)
      }
    }

  }

}

const main = (bui) => {
  getPath(bui)
  return paths
}

export default main
