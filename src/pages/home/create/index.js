import React from 'react'
import jsonlint from '../../../utils/jsonlint'
import ItemNew from './itemNew'
import './index.css'


export default class Create extends React.Component {

  updateCode = () => {
    const { setCode } = this.props
    const code = JSON.stringify(this.testData)
    //console.log('this.testData',this.testData, code)
    setCode(code)
  }

  getItems = (data,options={}) => {
    return Object.keys(data).map((key)=>{

      if(key === 'ui' && !options.isObjChild) {
        // ui
        const itemKey = options.isArrChild ? `${data.ui}${options.arrIndex}` : data.ui
        console.log('itemKey',itemKey)
        return <ItemNew key={itemKey} {...{ui:data.ui, isArrChild: options.isArrChild, parent:data, updateCode:this.updateCode, options}}/>
      } else if(key === 'brick') {

        const brick = data.brick

        return Object.keys(brick).map(brickKey=>{

          // 遍历 brick

          console.log('brickKey',brickKey)

          const brickItem = brick[brickKey]

          if(typeof brickItem === 'string' && /\/s/.test(brickItem)) {
            // 文本
            return <ItemNew {...{key: brickKey, slot: brickKey, text: brickItem, parent: brick, updateCode:this.updateCode}}/>
          } else if(typeof brickItem === 'string' || brickItem==='') {
            // 模块
            return <ItemNew {...{key: brickKey, slot: brickKey, module: brickItem, parent: brick, updateCode:this.updateCode}}/>
          } else if(typeof  brickItem === 'object' && Array.isArray(brickItem)) {
            // 数组

            const childArr = <ul className="list">
              {brickItem.map((arrItem, arrIndex)=>{
                return this.getItems(arrItem,{isArrChild: true, arrIndex, brick, slot:brickKey})
              })}
            </ul>

            return <ItemNew {...{key: brickKey, childArr, slot: brickKey, self: brickItem, parent: brick, updateCode:this.updateCode}} />

          } else if (typeof brickItem === 'object') {
            // 对象
            const childObj = <ul className="list">{this.getItems(brickItem,{isObjChild:true})}</ul> // 子对象的ui名称和插槽显示在一行即子对象本身不用显示ui名称

            return <ItemNew {...{key: brickKey, childObj, slot: brickKey, module: brickItem.ui, self: brickItem, parent: brick, updateCode:this.updateCode}}/>
          }

        })

      } else {
        return null
      }


    })
  }

  getList = () => {
    const {code} = this.props
    //console.log('code',code)
    this.testData = {}
    try {
      //pageJson = JSON.parse(x)
      this.testData = jsonlint.parse(code)
    }
    catch (err) {
      //console.log(err)
      this.setState({
        error: 'JSON格式错误',
        errorInfo: err
      })
    }

    const lis = this.getItems(this.testData)

    return <ul className="list">{lis}</ul>

  }


  render() {

    //console.log('create render',this.state)

    return <div className="project-create">
      {this.getList()}
    </div>

  }


}