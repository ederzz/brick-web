import React from 'react'
import './index.css'

export default class Help extends React.Component {

  render() {

    return (<div className="wrap">
      <div className="m-help">
        <strong>开始</strong>
        <p>积木UI的理念是通过<em>积木/模块</em>组合成用户界面。</p>
        <p>一、通过<em>积木/模块</em>菜单找到你需要的模块，然后复制模块名称。</p>
        <p>二、在首页<em>创造</em>选项卡粘贴模块名称并且回车，如果该模块有插槽会提示你是否启用插槽。</p>
        <p>三、启用插槽后，你可以切换插槽内容<em>模块/数组/文字</em>，按照此方法进行嵌套组合成一个完整的页面。</p>
        <p class="ps">建议：第一层模块类型是模版（包含html基础结构和css、js的引入），第二层模块类型是布局。</p>
      </div>
      <div className="m-help">
        <strong>协作</strong>
        <p>各个模块相互协作需要统一的reset.css和盒子模型，详情查看<em>规范</em>菜单。</p>
        <p>相同技术栈和响应设备的模块在一起才能更好的协作（也不是必须的）。</p>
      </div>

      <div className="m-help">
        <strong>查看源码</strong>
        <p>通过<em>积木/模块</em>菜单找到相关模块，点击源码链接可以查看模块的源码。</p>
        <p>在源码页面右上角有html、css、js代码的切换按钮。</p>
        <p>在<em>作品</em>菜单同样可以查看作品的源码。</p>
      </div>

      <div className="m-help">
        <strong>预览保存</strong>
        <p>预览自己的作品，或通过<em>作品</em>菜单查看别人的作品，也可通过右键菜单保存网页。</p>
        <p>由于作品网页是嵌套iframe的保存的源码可能是相关文件夹中的另一个htm文件，如saved_resource.html。</p>
      </div>

      <div className="m-help">
        <strong>积木开发</strong>
        <p>点击<em>创建积木/模块</em>按钮后需要填写模块名，选择模块类型、JS技术栈等信息。</p>
        <p>积木/模块创建后可以编辑html、css、js等信息，也可以修改之前填写的基础信息。</p>
        <p>积木/模块可以在html代码中提供插槽用来插入其它模块，如&lt;div&gt;||模块名称||&lt;/div&gt;</p>
        <p>模块名称建议使用简单的英文名称，如模版类型的模块一般提供一个||app||插槽。布局一般提供||head||,||aside||,||body||等。</p>
      </div>

      <div className="m-help">
        <strong>React积木/模块开发</strong>
        <p>由于React是通过js渲染等，插槽需要提供到js中并且插入的组件还需要接受参数，所以提供了不一样的插槽。</p>
        <p>把组件名改为小写开头就是插槽名称，如以下jsx包含了modal、alert两个插槽。</p>
        <pre>{
          'render () {\n'+
          '\treturn <div className="alert">\n'+
          '\t\t<modal {...{show: this.state.alertShow}}>\n'+
            '\t\t\t<alert onConfirm={this.onAlertConfirm} title={title} message={message} confirmButton={confirmButton} />\n'+
          '\t\t</modal>\n'+
          '\t</div>\n'+
          '}'
        }</pre>
      </div>

    </div>)

  }


}