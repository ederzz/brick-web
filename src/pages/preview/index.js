import React from 'react'
import jsonlint from '../../utils/jsonlint'
import setClientHeight from '../../utils/setClientHeight'
import initFs from './initFS'
import getPath from './getPath'
//import downFile from './downFile'
//import buildFile from './buildFile'
import buildPage from './buildPage'
import {getParams} from '../../utils/url'
import './index.css'


/*

fs.appendFile('./123.txt', 'data to append', function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});



fs.readdir('/', function(e, contents) {
  // etc.
  console.log(contents.toString());
});
*/


export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidMount() {

    console.log('componentDidMount', this.props)
    const {httpAgent} = this.props

    setClientHeight(true)
    /*
    const pageJson = {
      ui: 'normal/layout', // 最外侧布局UI
      // 布局需要填充的块
      brick: {
        top: 'top/qq.com', // 布局的头部填充块
        left: 'left/163.com', // 布局的左侧填充块
        // 布局主体填充块
        main: {
          ui: 'main/sina.com', // 布局主体采用的UI
          // 主体填充块
          brick: {
            head: 'head/antd.io', // 主体头部块
            list: 'list/baidu.com', // 主体列表块
            page: 'page/google.com' // 主体列表分页块
          }
        },
        footer: [
          {
            ui: 'a1/b1',
            brick: {
              head: 'a11/b11'
            }
          },
          {
            ui: 'a2/b2',
            brick: {
              head: 'a21/b21'
            }
          }
        ]
      }
    }
    */

    let x = getParams('json')

    //x = JSON.stringify(x)

    //console.log('000000', x)

    //x = decodeURI(x)


    //console.log('1111111', JSON.parse(x))

    //console.log(jsonlint.parse(x))

    let pageJson = {}

    try {
      //pageJson = JSON.parse(x)
      pageJson = jsonlint.parse(x)
    }
    catch (err) {
      console.log(err)
      this.setState({
        error: 'JSON格式错误',
        errorInfo: err
      })
    }

    // console.log('xxx',x,pageJson)

    /*

    const pageJson = {
      ui:'top-left-layout',
      brick: {
        top: 'xj-top',
        left: 'xj-left',
        main: 'xj-main',
      }
    }*/


// 获取配置文件中的地址
    const paths = getPath(pageJson)
    console.log('paths', paths)

// 设置FS
    initFs(paths)

// 根据地址下载文件 并且缓存
    httpAgent.post('/preview/getFiles', {names: paths}).then(res => {
      if (res.code === 0) {
        //downFile(res.data) // 缓存数据

        // 使用缓存的文件 生成网页
        //const page = buildFile(pageJson)

        const page = buildPage(pageJson,res.data)

        document.querySelector('#iframe').setAttribute('srcdoc', page)

      }
    })

  }

  componentWillUnmount() {
    setClientHeight(false)
  }


  render() {

    if (this.state.error) {
      return (
        <div className="err clearfix">
          <h2 className="err-title">
            {this.state.error && this.state.error.toString()}
          </h2>
          <p className="err-info">请查看地址栏传入的JSON格式</p>
          <pre className="err-fail">{this.state.errorInfo.toString()}</pre>
        </div>
      );
    }

    return (<div style={{overflow: 'hidden', width: '100%', height: '100%'}}>
      <iframe id="iframe" frameBorder="0" width="100%" height="100%"></iframe>
    </div>)

  }


}