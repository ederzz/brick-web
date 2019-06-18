// 从左侧的最外层往里替换标签，以此往右替换

import readFile from './readFile'

let html='',css='',js=''

const getCode = (bui,pk) => {
  for(const k in bui) {
    if(typeof bui[k] === 'object' && Array.isArray(bui[k])) {
      // 数组
      let length = bui[k].length
      let r = ''
      if(length > 1) {
        while (length > 0) {
          r+=`{{${k}}}`
          --length
        }
      }
      html = html.replace(`{{${k}}}`,r) // 如果是数组 那么就会替换多次 提前复制备用
      for(const o of bui[k]) {
        getCode(o,k)
      }
    }else if(typeof bui[k] === 'object') {
      // 对象
      const o = bui[k]
      getCode(o,k)
    }else if(/[a-zA-Z0-9\-]+/.test(bui[k])) {
      const htmlItem = readFile(bui[k], 'html') // html 替换
      css+=readFile(bui[k], 'css') // css 累加
      js+=readFile(bui[k], 'js')+';' // js 累加 后面加分号
      if (html === '') {
        // 初始值
        html = htmlItem
      } else {
        if(k === 'ui') {
          // ui 库 替换的是 父属性的名称
          html = html.replace(`{{${pk}}}`,htmlItem)
        }else{
          // 普通组件 直接替换
          html = html.replace(`{{${k}}}`,htmlItem)
        }
      }
    }
  }
}

const getPage = () => {
  html = html.replace('</head>','<style>'+css+'</style></head>')
  html = html.replace('</body>','<script>'+js+'</script></body>')
}

const main = (bui) => {
  getCode(bui)
  getPage()
  return html
}

export default main
