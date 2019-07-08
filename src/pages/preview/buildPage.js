// 从左侧的最外层往里替换标签，以此往右替换

//import readFile from './readFile'
// html='',css='',js='',

let codeList=[], cssList=[], jsList=[], babelList=[], srcHistory=[]

const getPage = (bui) => {

  let html = getCodes(bui)
  let css = cssList.join('\n')
  let js = jsList.join('\n;')
  let babelJs = babelList.join('\n;')

  if(!html || html.indexOf('</head>') === -1 || html.indexOf('</body>') === -1) {
    html = '<html><head><link rel="stylesheet" media="all" href="//cdn.brickui.com/bui/reset.min.css"></head><body>'+html+'</body></html>'
  }

  html = html.replace('</head>','<style>'+css+'</style></head>')
  js && (html = html.replace('</body>','<script>'+js+'</script></body>'))
  babelJs && (html = html.replace('</body>','<script type="text/babel">'+babelJs+'</script></body>'))

  return html
}

const getCodes = (bui) => {
  // mn modelName
  console.log('getCodes',bui)
  let htmlCode = ''
  let jsCode = ''
  let cssCode = ''
  if(bui.ui && bui.brick) {

    let uiName = bui.ui

    if(/\/</.test(bui.ui)) {
      htmlCode = bui.ui.slice(bui.ui.indexOf('<'))
      uiName = uiName.slice(0,uiName.indexOf('/'))
    }else{
      htmlCode = codeList[bui.ui] && codeList[bui.ui].html ? codeList[bui.ui].html : `没有找到 ||${bui.ui}|| 模块`
    }
    jsCode = codeList[uiName] && codeList[uiName].js ? codeList[uiName].js : ''
    cssCode = codeList[uiName] && codeList[uiName].css ? codeList[uiName].css : ''
    console.log('jsCode 1',bui.ui, uiName, jsCode)
    for(const modelName in bui.brick) {
      console.log('modelName 1',modelName)
      const thisHtmlCode = getCodes(bui.brick[modelName])
      htmlCode = htmlCode.replace(`||${modelName}||`,thisHtmlCode)
      // 替换掉js代码里 ||model|| 为 <Model />
      // 1 有参数 <ModelName ||...params|| />
      // 2 无参数 使用 html 里面的 jsx
      // 3 缺省 <ModelName />
      jsCode = jsCode.replace(`||${modelName}||`,thisHtmlCode)
    }
    if(codeList[uiName] && !srcHistory.includes(uiName)) {
      console.log('jsCode 2',jsCode)
      cssList.push(cssCode)
      if(['babel','react'].includes(codeList[uiName].stack)) {
        babelList.push(jsCode)
      }else{
        jsList.push(jsCode)
      }
      srcHistory.push(bui.ui)
    }
  } else if(Array.isArray(bui)) {
    let arrCode = ''
    for(const obj of bui) {
      arrCode += getCodes(obj)
    }
    htmlCode = arrCode
    //htmlCode = htmlCode.replace(`||${mn||}`,arrCode)
  } else {
    // {ui: "crm-panel"}
    // crm-aside
    let modelName = bui.ui || bui
    console.log('字符串',modelName,bui)
    if(/\/s$/.test(modelName)) {
      htmlCode = decodeURIComponent(modelName.replace(/\/s$/,''))
    }else if(/\/</.test(modelName)) {
      htmlCode = modelName.slice(modelName.indexOf('<'))
      modelName = modelName.slice(0,modelName.indexOf('/'))
      console.log('modelName 2', modelName)
      jsCode = codeList[modelName] && codeList[modelName].js ? codeList[modelName].js : ''
      cssCode = codeList[modelName] && codeList[modelName].css ? codeList[modelName].css : ''
    }else{
      htmlCode = codeList[modelName] && codeList[modelName].html ? codeList[modelName].html : `没有找到 ||${modelName}|| 模块`
      jsCode = codeList[modelName] && codeList[modelName].js ? codeList[modelName].js : ''
      cssCode = codeList[modelName] && codeList[modelName].css ? codeList[modelName].css : ''
    }

    console.log('htmlCode',htmlCode)
    console.log('jsCode 4',modelName, jsCode)

    if(!htmlCode) {
      htmlCode = `没有找到 ||${modelName}|| 模块`
    }

    if(codeList[modelName] && !srcHistory.includes(modelName)) {
      // css  js 不要重复添加
      cssList.push(cssCode)
      if(['babel','react'].includes(codeList[modelName].stack)) {
        babelList.push(jsCode)
      }else{
        jsList.push(jsCode)
      }
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
