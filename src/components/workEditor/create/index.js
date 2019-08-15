import React from 'react'
import {tosts} from '@/ui'
import jsonlint from '../../../utils/jsonlint'
import Item from './item'
import './index.css'


export default class Create extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: undefined, // 当前编辑到模块名
      slots: undefined, // 当前编辑到模块包含到插槽
    }
  }

  updateCode = () => {
    const { setCode } = this.props
    //const code = JSON.stringify(this.code)
    console.log('this.code',this.code)
    setCode(this.code)
  }

  getItems = (data,options={}) => {
    return Object.keys(data).map((key)=>{

      if(key === 'ui' && !options.isObjChild) {
        // ui
        const itemKey = options.isArrChild ? `${options.arrIndex}` : 'ui'
        // console.log('itemKey',itemKey)
        return <Item key={itemKey} {...{ui:data.ui, isArrChild: options.isArrChild, parent:data, updateCode:this.updateCode, options, getModuleInfo:this.getModuleInfo}}/>
      } else if(key === 'brick') {

        const brick = data.brick

        return Object.keys(brick).map(brickKey=>{

          // 遍历 brick

          // console.log('brickKey',brickKey)

          const brickItem = brick[brickKey]

          if(typeof brickItem === 'string' && /\/s/.test(brickItem)) {
            // 文本
            return <Item {...{key: brickKey, slot: brickKey, text: brickItem, parent: brick, updateCode:this.updateCode}}/>
          } else if(typeof brickItem === 'string' || brickItem==='') {
            // 模块
            return <Item {...{key: brickKey, slot: brickKey, module: brickItem, parent: brick, updateCode:this.updateCode, getModuleInfo:this.getModuleInfo}}/>
          } else if(typeof  brickItem === 'object' && Array.isArray(brickItem)) {
            // 数组

            const childArr = <ul className="list">
              {brickItem.map((arrItem, arrIndex)=>{
                return this.getItems(arrItem,{isArrChild: true, arrIndex, brick, slot:brickKey})
              })}
            </ul>

            return <Item {...{key: brickKey, childArr, slot: brickKey, self: brickItem, parent: brick, updateCode:this.updateCode}} />

          } else if (typeof brickItem === 'object') {
            // 对象
            const childObj = <ul className="list">{this.getItems(brickItem,{isObjChild:true})}</ul> // 子对象的ui名称和插槽显示在一行即子对象本身不用显示ui名称

            return <Item {...{key: brickKey, childObj, slot: brickKey, module: brickItem.ui, self: brickItem, parent: brick, updateCode:this.updateCode, getModuleInfo:this.getModuleInfo}}/>
          }

        })

      } else {
        return null
      }


    })
  }

  getList = () => {
    const {code} = this.props
    this.code = code

    const lis = this.getItems(this.code)

    return <ul className="list">{lis}</ul>

  }

  getModuleInfo = (projectName,cb) => {
    const {httpAgent, setEditorTool} = this.props
    httpAgent.post('/project/getInfo',{projectName}).then(res=>{
      const {code,data,message} =res
      if(code === 0 && data && data.slots) {
        setEditorTool(<div>
          模块{projectName}包含{data.slots}插槽，是否启用
          <span className="btn btn-s btn-success" onClick={()=>{cb(data.slots);setEditorTool(null)}}>是</span>
        </div>)
      }else{
        setEditorTool(null)
      }
    })
  }


  render() {

    console.log('create render',this.props)

    return <div className="project-create">
      {this.getList()}
    </div>

  }


}