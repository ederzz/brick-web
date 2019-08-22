import React from 'react'
import './index.css'

export default class ExplainInfo extends React.Component {
  render() {
    return(<div className="explain-info">
      <p>BrickUI以对象的方式进行模块的嵌套</p>
      <pre>{
        '{\n'+
          '\t"ui":"模块名称",//最外层一般是模版\n'+
          '\t"brick":{\n'+
            '\t\t"插槽名":"模块名称",//不再进行嵌套\n'+
            '\t\t"插槽名":{\n'+
              '\t\t\t"ui":"模块名称",//继续进行嵌套\n'+
              '\t\t\t"brick":...\n'+
            '\t\t},\n'+
            '\t\t"插槽名":[\n'+
                '\t\t\t{\n'+
                  '\t\t\t\t"ui":""\n'+
                '\t\t\t},\n'+
                '\t\t\t{\n'+
                  '\t\t\t\t"ui":""\n'+
                '\t\t\t}\n'+
              '\t\t],\n'+
            '\t\t"插槽名":"文字/s"//斜杠s结尾的表示这个插槽不进行模块插入，只是单纯显示文字\n'+
          '\t}\n'+
        '}'
      }</pre>
      <p>你可以通过"创造"选项卡进行可视化创造作品，也可以通过"源码"选项卡直接进行作品创造。</p>
      <p>通过"设置"选项卡设置完成基本信息后，可以保存您的作品，也可以直接点击查看按钮，你创造的作品代码会解析到浏览器地址栏里，您可以保存地址随时查看。</p>
    </div>)

  }


}