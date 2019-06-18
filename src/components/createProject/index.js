import React from 'react'
import {tosts, Modal} from '@/ui'
import './index.css'
import Select from '../../components/select'
import projectCategory from '../../config/projectCategory'
import projectLayout from '../../config/projectLayout'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category:{},
      layout:{},
      name:'',
      tags:'',
      description:'',
      nameErr: '',
    }
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  onSelectChange = (name,option) => {
    this.setState({[name]: option})
  }

  onNameBlur = (e) => {
    const {httpAgent} = this.props
    const value = e.target.value
    httpAgent.post('/dev/checkName', {name:value}).then(res => {
      const {code, message} = res
      if (code === 0) {
        this.setState({nameErr:''})
      }else{
        this.setState({nameErr:message})
      }
    })
  }

  onCheck = () => {
    const {category, layout, name, tags, description} = this.state
    let error
    if(!name) {
      error = '请填写项目名称'
    }else if(!category || !category.value) {
      error = '请选择模块'
    }else if(!layout || !layout.value) {
      error = '请填选择布局'
    }else if(!tags) {
      error = '请填写标签'
    }else if(!description) {
      error = '请填写描述'
    }

    return error
  }

  onCreate = () => {
    const {httpAgent, modalClose, getData} = this.props
    const {category, layout, name, tags, description} = this.state

    const check = this.onCheck()
    if(check) {
      tosts.error(check)
      return
    }

    const body = {
      name,
      category:category && category.value,
      layout: layout && layout.value,
      tags,
      description
    }
    httpAgent.post('/dev/create', body).then(res => {
      const {code, message} = res
      if (code === 0) {
        tosts.success(message)
        modalClose()
        getData()
      } else {
        tosts.error(message)
      }
    })
  }


  render() {
    const {modalClose} = this.props
    const {category, layout, name, tags, description, nameErr } = this.state
    return (<Modal
      show={true}
      onMask={modalClose}
    >
      <div className="create-modal">
        <div className={`formitem ${nameErr ? 'error' : ''}`}>
          <label className="lab">名称：</label>
          <div className="mix">
            <input
              value={name}
              name="name"
              type="text"
              className="ipt"
              placeholder="字母(a-z)和连字符(-)"
              onChange={this.onChange}
              onBlur={this.onNameBlur}
            />
            {nameErr ? <span className="tip">{nameErr}</span> : null}
          </div>
        </div>
        <div className="formitem">
          <label className="lab">模块：</label>
          <div className="mix">
            <Select value={category} options={projectCategory} onChange={(option)=>{this.onSelectChange('category',option)}} />
          </div>
        </div>
        <div className="formitem">
          <label className="lab">响应：</label>
          <div className="mix">
            <Select value={layout} options={projectLayout} onChange={(option)=>{this.onSelectChange('layout',option)}} />
          </div>
        </div>
        <div className="formitem">
          <label className="lab">标签：</label>
          <div className="mix">
            <input value={tags} name="tags" type="text" className="ipt" placeholder="多个标签用分号(;)分隔" onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem">
          <label className="lab">描述：</label>
          <div className="mix">
            <textarea value={description} rows="4" name="description" className="textarea" onChange={this.onChange}></textarea>
          </div>
        </div>
        <div className="formitem">
          <div className="mix">
            <button className="btn btn-primary" onClick={this.onCreate}>创建</button>
          </div>
        </div>
      </div>
    </Modal>)

  }


}