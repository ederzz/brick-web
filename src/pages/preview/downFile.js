//import testFiles from './testFiels'
import writeFile from './writeFile'

const main = (data) => {
  /*

  for(const v of paths) {

    if(testFiles[v]) {
      writeFile('html',v,testFiles[v].html)
      writeFile('css',v,testFiles[v].css)
      writeFile('js',v,testFiles[v].js)
    }

  }*/



  for(const v in data) {
    const name = v.replace('-','_')
    //console.log('cache file',name,v, data[v])

    writeFile('html',name,data[v].html)
    writeFile('css',name,data[v].css)
    writeFile('js',name,data[v].js)
  }

}

export default main