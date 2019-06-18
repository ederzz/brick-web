import React from 'react'

export default class ExplainInfo extends React.Component {
  render() {
    return(<div className="explain-info">
      <p>BrickUI只有两种模块1.布局模块2.子模块</p>
      <p>布局模块包含ui和brick</p>
      <p>ui:要引用的布局模块名称</p>
      <p>brick:布局模块指定的子模块插槽</p>
      <p>子模块插槽支持3种模块插入方式</p>
      <div className="explain-info-list">
        <p>1. 插槽名:子模块名称</p>
        <p>2. 插槽名:布局模块名</p>
        <p>3. 插槽名:子模块数组</p>
      </div>
    </div>)

  }


}