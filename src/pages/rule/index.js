import React from 'react'
import './index.css'

export default class Rule extends React.Component {

  render() {

    return (<div className="wrap">
      <div className="m-rule">
        <strong>reset.css</strong>
        <p>box-sizing: <em>border-box</em>; + <em>normalize.css</em></p>
        <p>一、盒子模型采用border-box</p>
        <p>二、统一浏览器默认样式normalize.css</p>
        <p class="ps">PS:以上两条是保证各个模块<em>相互兼容</em>的基础</p>
        <p>三、清除浮动</p>
        <pre>{
          '.clearfix:before,\n' +
          '.clearfix:after {\n' +
          '\tcontent: " ";\n' +
          '\tdisplay: table;\n' +
          '}\n' +

          '.clearfix:after {\n' +
          '\tclear: both;\n' +
          '}'
        }</pre>
      </div>
    </div>)

  }


}