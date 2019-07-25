import React from 'react'
import ModuleToggle from '../../../components/moduleToggle'

export default class Item extends React.Component {

  onChange = (e) => {
    const {parent, updateCode} = this.props

    const value = e.target.value

    parent.ui = value

    //console.log('parent',parent)

    updateCode()



  }

  addArray = () => {
    const {parent, slot, updateCode} = this.props

    parent[slot].push({"ui":""})

    //console.log('parent',parent)
    updateCode()
  }

  removeArray = () => {
    const {arrInfo, updateCode} = this.props
    //arrInfo.arr[arrInfo.index] = undefined
    const arr = arrInfo.arr.slice(0,arrInfo.index).concat(arrInfo.arr.slice(arrInfo.index+1))
    arrInfo.parent[arrInfo.slot] = arr
    updateCode()
  }

  changeModule = (active) => {
    const {parent, slot, updateCode} = this.props
    if(active === 2) {
      parent[slot] = [{"ui":""}]
    }else{
      parent[slot] = ""
    }
    updateCode()
  }


  render() {

    console.log('item render',this.props)

    const {slot, module, ul=null, obj=null, arrInfo} = this.props

    // ul 表示当前插槽插入的是数组
    // type  array表示当前插入的模块属于数组

    let value = module
    let moduleActive = 1
    if(ul) {
      moduleActive = 2
    } else if (/\/s/.test(module)) {
      moduleActive = 3
      value = module.slice(0,-2)
    }

    return(<li>
      <div className="item">
        {slot && slot !=='ui' ? [<span className="name">{slot}</span>,<ModuleToggle moduleActive={moduleActive} changeModule={this.changeModule}/>] : null}
        {ul ? <span className="add" onClick={this.addArray}>+</span> : <div className="input"><input value={value} onChange={this.onChange}/></div>}
        {arrInfo && arrInfo.index >= 0 && slot && slot === 'ui' ? <span className="remove" onClick={this.removeArray}>-</span> : null}
      </div>
      {ul}
      {obj}
    </li>)

  }


}