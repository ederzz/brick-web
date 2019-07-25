import React from 'react'
import ModuleToggle from '../../../components/moduleToggle'

export default class Item extends React.Component {

  onChange = (e) => {
    const {parent, self, updateCode, ui, text, module, slot, childObj} = this.props

    const value = e.target.value

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
    let {childArr, parent, slot, updateCode} = this.props

    if(childArr) {
      parent[slot] = ""
    }else{
      if(active === 2) {
        parent[slot] = [{"ui":""}]
      }else{
        parent[slot] = ""
      }
    }
    updateCode()
  }


  render() {

    const {childObj=null,childArr=null, ui, text, module, slot, isArrChild} = this.props

    let value = ui || text || module
    value = !value && (ui==='' || text==='' || module ==='') ? '' : value // 防止把 '' 赋值为 undefined
    let moduleActive = 1
    if(childArr) {
      moduleActive = 2
    } else if (text && /\/s/.test(text)) {
      moduleActive = 3
      value = text.slice(0,-2)
    }


    return(<li>
      <div className="item" >
        {(text || text === '' || module || module === '' || childArr) ?
          [<span key="name" className="name">{slot}</span>,<ModuleToggle key="moduleToggle" moduleActive={moduleActive} changeModule={this.changeModule}/>]
          : null
        }
        {childArr ? <span key="add" className="add" onClick={this.addArray}>+</span> : null}
        {value || value === '' ? <div key="inputWrap" className="input"><input value={value} onChange={this.onChange}/></div> : null}
        {isArrChild ? <span key="remove" className="remove" onClick={this.removeArray}>-</span> : null}
      </div>
      {childObj}
      {childArr}
    </li>)

  }


}