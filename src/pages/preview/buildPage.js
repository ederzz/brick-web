// 从左侧的最外层往里替换标签，以此往右替换

//import readFile from './readFile'
// html='',css='',js='',

let codeList=[], cssList=[], jsList=[], srcHistory=[]

/*

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
      console.log('r',r,bui,pk)
      html = html.replace(`{{${k}}}`,r) // 如果是数组 那么就会替换多次 提前复制备用
      for(const o of bui[k]) {
        getCode(o,k)
      }
    }else if(typeof bui[k] === 'object') {
      // 对象
      console.log('对象',bui,pk,k)
      const o = bui[k]
      getCode(o,k)
    }else if(/[a-zA-Z0-9\-]+/.test(bui[k])) {
      console.log('bui[k]',bui[k],codeList)
      const htmlItem = codeList[bui[k]] && codeList[bui[k]].html ? codeList[bui[k]].html : `没有找到${bui[k]}模块`// html 替换
      css += codeList[bui[k]] && codeList[bui[k]].css ? codeList[bui[k]].css : '' // css 累加
      js += codeList[bui[k]] && codeList[bui[k]].js ? codeList[bui[k]].js+';' : '' // js 累加 后面加分号
      if (html === '') {
        // 初始值
        html = htmlItem
      } else {
        if(k === 'ui') {
          // ui 库 替换的是 父属性的名称
          console.log('pk',pk)
          html = html.replace(`{{${pk}}}`,htmlItem)
        }else{
          // 普通组件 直接替换
          html = html.replace(`{{${k}}}`,htmlItem)
        }
      }
    }
  }
}

const getPageOld = () => {

  console.log(html,html.indexOf('</head>'),html.indexOf('</body>'))

  if(!html || html.indexOf('</head>') === -1 || html.indexOf('</body>') === -1) {
    html = '<html><head><link rel="stylesheet" media="all" href="//cdn.brickui.com/bui/reset.min.css"></head><body>'+html+'</body></html>'
  }

  html = html.replace('</head>','<style>'+css+'</style></head>')
  html = html.replace('</body>','<script>'+js+'</script></body>')
}
*/

const getPage = (bui) => {

  let html = getCodes(bui)
  let css = cssList.join('\n')
  let js = jsList.join('\n;')

  if(!html || html.indexOf('</head>') === -1 || html.indexOf('</body>') === -1) {
    html = '<html><head><link rel="stylesheet" media="all" href="//cdn.brickui.com/bui/reset.min.css"></head><body>'+html+'</body></html>'
  }

  html = html.replace('</head>','<style>'+css+'</style></head>')
  html = html.replace('</body>','<script>'+js+'</script></body>')

  return html
}

const getCodes = (bui) => {
  // mn modelName
  console.log('getCodes',bui)
  let htmlCode = ''
  if(bui.ui && bui.brick) {
    htmlCode = codeList[bui.ui] && codeList[bui.ui].html ? codeList[bui.ui].html : `没有找到 {{${bui.ui}}} 模块`
    if(codeList[bui.ui] && !srcHistory.includes(bui.ui)) {
      cssList.push(codeList[bui.ui].css || '')
      jsList.push(codeList[bui.ui].js || '')
      srcHistory.push(bui.ui)
    }
    for(const modelName in bui.brick) {
      htmlCode = htmlCode.replace(`{{${modelName}}}`,getCodes(bui.brick[modelName]))
    }
  } else if(Array.isArray(bui)) {
    let arrCode = ''
    for(const obj of bui) {
      arrCode += getCodes(obj)
    }
    htmlCode = arrCode
    //htmlCode = htmlCode.replace(`{{${mn}}}`,arrCode)
  } else {
    // {ui: "crm-panel"}
    // crm-aside
    const modelName = bui.ui || bui
    //console.log('字符串',modelName,bui)
    if(/\/s$/.test(modelName)) {
      htmlCode = decodeURIComponent(modelName.replace(/\/s$/,''))
    }else{
      htmlCode = codeList[modelName] && codeList[modelName].html ? codeList[modelName].html : `没有找到 {{${modelName}}} 模块`
    }

    console.log('htmlCode',htmlCode)

    if(!htmlCode) {
      htmlCode = `没有找到 {{${modelName}}} 模块`
    }

    if(codeList[modelName] && !srcHistory.includes(modelName)) {
      // css  js 不要重复添加
      cssList.push(codeList[modelName].css || '')
      jsList.push(codeList[modelName].js || '')
      srcHistory.push(modelName)
    }
  }

  return htmlCode
}

const main = (bui,data) => {
  console.log('build page',bui,data)
  codeList = data
  //getCode(bui)
  //getPage()

  //console.log('get codes',getCodes(bui),cssList, jsList)

  return getPage(bui)
}

export default main
