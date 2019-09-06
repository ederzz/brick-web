import React from 'react'
import ModuleToggle from '../../moduleToggle/index'

export default class Item extends React.Component {

  onChange = (e) => {
    const {parent, self, updateCode, ui, text, module, slot, childObj} = this.props

    let value = e.target.value
    value = value.replace(/^\s*|\s*$/g, '')

    console.log('onChange')
    this.blurFlag = true

    if(childObj) {
      self.ui = value
    }else if(module || module==='') {
      parent[slot] = value
    } else if(text) {
      parent[slot] = `${value}/s`
    } else if(ui || ui === '') {
      parent.ui = value
    }

    updateCode()

  }

  addArray = () => {
    const {self, updateCode} = this.props

    self.push({"ui":""})

    updateCode()
  }

  removeArray = () => {
    const {options, parent, updateCode} = this.props

    let arr = options.brick[options.slot]
    const newArr = []
    for(const i in arr) {
      if(arr[i] !== parent) {
        newArr.push(arr[i])
      }
    }

    options.brick[options.slot] = newArr

    updateCode()
  }

  changeModule = (active) => {
    let {parent, slot, updateCode} = this.props

    if(active === 1) {
      parent[slot] = ""
    }else if(active === 2) {
      parent[slot] = [{"ui":""}]
    }else{
      parent[slot] = "/s"
    }

    updateCode()
  }

  onBlur = () => {
    const {ui, module, parent, self, childObj, slot, getModuleInfo, updateCode} = this.props

    let value = ui || module // 只有 UI 和 模块 on blur 才触发
    value = !value && (ui==='' || module ==='') ? '' : value // 防止把 '' 赋值为 undefined

    console.log('onBlur',value,this.props)

    if(value) {
      getModuleInfo(value,(slots)=>{
        console.log('getModuleInfo',this.props,slots)

        const slotsArr = slots.split(/;|；/)
        const ui = value
        const brick = {}
        for(const i in slotsArr) {
          brick[slotsArr[i]] = ''
        }

        if(childObj) {
          self.ui = ui
          self.brick = brick
        } else if(module || module==='') {
          const obj = {
            ui: ui,
            brick: brick
          }
          parent[slot] = obj
        } else if(ui || ui === '') {
          parent.ui = ui
          parent.brick = brick
        }

        console.log('getModuleInfo 2',parent,self)
        updateCode()
      })
    }

  }

  onKeyUp = (e) => {
    console.log(e)
    if(e.keyCode === 13) {
      e.target.blur()
    }
  }


  render() {

    const {childObj=null,childArr=null, ui, text, module, slot, isArrChild} = this.props

    let value = ui || text || module
    value = !value && (ui==='' || text==='' || module ==='') ? '' : value // 防止把 '' 赋值为 undefined
    let moduleActive = 1 // 模块
    if(childArr) {
      moduleActive = 2 // 数组
    } else if (text && /\/s/.test(text)) {
      moduleActive = 3 // 文字
      value = text.slice(0,-2)
    }

    const placeholder = moduleActive === 3 ? '请输入文字' : '请输入模块名称并回车'


    return(<li>
      <div className="item" >
        {(text || text === '' || module || module === '' || childArr) ?
          [<span key="name" className="name">{slot}</span>,<ModuleToggle key="moduleToggle" moduleActive={moduleActive} changeModule={this.changeModule}/>]
          : null
        }
        {childArr ? <span key="add" className="add" onClick={this.addArray}>+</span> : null}
        {value || value === '' ?
          <div key="inputWrap" className="input">
            <input value={value} onChange={this.onChange} placeholder={placeholder} onBlur={this.onBlur} onKeyUp={this.onKeyUp}/>
          </div>
          : null
        }
        {isArrChild ? <span key="remove" className="remove" onClick={this.removeArray}>-</span> : null}
      </div>
      {childObj}
      {childArr}
    </li>)

  }


}