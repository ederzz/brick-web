import React from 'react'
import codemirror from 'codemirror'

import 'codemirror/mode/xml/xml'

import 'codemirror/addon/fold/xml-fold' // xml 闭合 匹配依赖

import 'codemirror/addon/edit/matchbrackets' // 括号匹配
import 'codemirror/addon/edit/matchtags' // 标签匹配
import 'codemirror/addon/edit/closetag' // 自动闭合xml标签

import {tosts} from '@/ui'

import setClientHeight from '../../utils/setClientHeight'

import './index.css'
//import './codemirror.css'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      codeType: 'html',
      htmlCode: '<div>1</div>',
      cssCode: '.main{color: red;}',
      jsCode: 'var x= 1;',
    }

    this.textareaRef = React.createRef()
  }


  componentDidMount () {

    setClientHeight(true)

    //setTimeout(()=>{
    this.codeMirror = codemirror.fromTextArea(this.textareaRef.current, {
      styleActiveLine: true,
      lineNumbers: true,
      lineWrapping: true
    });
    //},0)

    this.codeMirror.on('change', this.onChange);

    this.getFiles()


  }

  componentWillUnmount () {
    setClientHeight(false)
  }

  setInitValue = () => {
    this.setMode('text/html')
    this.setValue(this.state.htmlCode)
  }

  onChange = (doc, change) => {
    let code = doc.getValue()
    const {codeType} = this.state
    console.log('onChange',codeType,code)
    this.setState({[`${codeType}Code`]:code})
  }

  getFiles = () => {
    const {httpAgent, match: {params: {name}}} = this.props
    httpAgent.post('/dev/getFile', {projectName: name}).then(res => {
      const {code,data,message} = res
      if(code === 0) {
        const code = {}
        if(Array.isArray(data) && data.length) {
          for(const v of data) {
            if(v.file_type === 'html') {
              code.htmlCode = v.content
            }
            if(v.file_type === 'css') {
              code.cssCode = v.content
            }
            if(v.file_type === 'js') {
              code.jsCode = v.content
            }
          }
          console.log('code',code)
          this.setState(code,this.setInitValue)
        }
      }else{
        tosts.error(message)
      }
    })
  }

  setMode = (mode) => {
    this.codeMirror.setOption('mode',mode)
  }

  setValue = (value) => {
    this.codeMirror.setValue(value || '');
  }

  cacheCode = () => {
    const {codeType} = this.state
    const code = this.codeMirror.getValue()
    console.log('cacheCode',codeType,code)
    if(codeType === 'html') {
      this.setState({htmlCode:code})
    }else if(codeType === 'css') {
      this.setState({cssCode:code})
    }else if(codeType === 'js') {
      this.setState({jsCode:code})
    }
  }

  onHtml = () => {
    this.cacheCode() // 缓存当前的代码和代码类型

    // 设置将要展示的代码和代码类型
    this.setState({codeType:'html'},()=>{
      this.setMode('text/html')
      this.setValue(this.state.htmlCode)
    })
  }

  onCss = () => {
    this.cacheCode() // 缓存当前的代码和代码类型

    // 设置将要展示的代码和代码类型
    this.setState({codeType:'css'},()=>{
      this.setMode('css')
      this.setValue(this.state.cssCode)
    })
  }

  onJs = () => {
    this.cacheCode() // 缓存当前的代码和代码类型

    // 设置将要展示的代码和代码类型
    this.setState({codeType:'js'},()=>{
      this.setMode('javascript')
      this.setValue(this.state.jsCode)
    })
  }

  onSave = () => {
    const {httpAgent, match:{params:{name}}} = this.props
    const {htmlCode,cssCode,jsCode} = this.state
    const body = {projectName:name, html:htmlCode, css:cssCode, js:jsCode}
    httpAgent.post('/dev/updateFile',body).then(res=>{
      const {code, message} = res
      if (code === 0) {
        tosts.success(message)
      } else {
        tosts.error(message)
      }
    })
  }



  render() {
    const { codeType } = this.state
    console.log('dev',this.state,this.props)

    return(<div className="code">
      <textarea
        ref={this.textareaRef}
        autoComplete="off"
        autoFocus={true}
      />
      <div className="tool">
        <button className={codeType === 'html' ? 'active' : ''} onClick={this.onHtml}>HTML</button>
        <button className={codeType === 'css' ? 'active' : ''} onClick={this.onCss}>CSS</button>
        <button className={codeType === 'js' ? 'active' : ''} onClick={this.onJs}>JS</button>
        <button onClick={this.onSave}>保存</button>
      </div>
    </div>)

  }



}