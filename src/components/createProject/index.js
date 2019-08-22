import React from 'react'
import {tosts, Modal} from '@/ui'
import './index.css'
import Select from '../../components/select'
import projectCategory from '../../config/projectCategory'
import projectLayout from '../../config/projectLayout'
import projectStack from '../../config/projectStack'
import UploadImg from '../uploadImg'

export default class Login extends React.Component {
  constructor(props) {
    super(props)

    let category = {}, layout = {}, stack = {}, name = '', slots = '', description = '', thumb;

    if (props.editorInfo) {

      name = props.editorInfo.name

      description = props.editorInfo.description

      slots = props.editorInfo.slots

      thumb = props.editorInfo.thumb

      for (const o of projectCategory) {
        if (props.editorInfo.category && o.value === props.editorInfo.category) {
          category = o
          break
        }
      }

      for (const o of projectLayout) {
        if (props.editorInfo.layout && o.value === props.editorInfo.layout) {
          layout = o
          break
        }
      }

      for (const o of projectStack) {
        if (props.editorInfo.stack && o.value === props.editorInfo.stack) {
          stack = o
          break
        }
      }


    }

    this.state = {
      category,
      layout,
      stack,
      name,
      slots,
      tags: '',
      description,
      thumb,
      nameErr: '',
    }
  }

  componentDidMount() {
    const {httpAgent, editorInfo} = this.props
    if (editorInfo) {
      const ids = editorInfo.tags_id.split(',')
      httpAgent.post('/dev/getTags', {ids}).then(res => {
        const {code, data} = res
        if (code === 0 && Array.isArray(data) && data.length) {
          this.setState({tags: data.join(',')})
        }
      })
    }
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  onSelectChange = (name, option) => {
    this.setState({[name]: option})
  }

  onNameBlur = (e) => {
    const {httpAgent} = this.props
    const value = e.target.value
    httpAgent.post('/dev/checkName', {name: value}).then(res => {
      const {code, message} = res
      if (code === 0) {
        this.setState({nameErr: ''})
      } else {
        this.setState({nameErr: message})
      }
    })
  }

  onCheck = () => {
    const {category, layout, stack, name, slots, tags, description} = this.state
    let error
    if (!name) {
      error = '请填写项目名称'
    } else if (!category || !category.value) {
      error = '请选择模块'
    } else if (!layout || !layout.value) {
      error = '请填选择布局'
    } else if (!stack || !stack.value) {
      error = '请填选择技术栈'
    }

    return error
  }

  onCreate = () => {
    const {httpAgent, modalClose, getData, editorInfo} = this.props
    const {category, layout, stack, name, slots, tags, description, thumb} = this.state

    const check = this.onCheck()
    if (check) {
      tosts.error(check)
      return
    }

    const body = {
      name,
      category: category && category.value,
      layout: layout && layout.value,
      stack: stack && stack.value,
      slots,
      tags: tags.split(/;|；/),
      description,
      thumb
    }

    const url = editorInfo ? '/dev/update' : '/dev/create'

    if (editorInfo) {
      body.id = editorInfo.id
    }

    httpAgent.post(url, body).then(res => {
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
    const {modalClose, editorInfo, httpAgent} = this.props
    const {category, layout, stack, name, slots, tags, description, thumb, nameErr} = this.state
    console.log('create project render', this.state)
    return (<Modal
      show={true}
    >
      <div className="create-modal clearfix">
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
            <Select value={category} options={projectCategory} onChange={(option) => {
              this.onSelectChange('category', option)
            }}/>
          </div>
        </div>
        <div className="formitem">
          <label className="lab">响应：</label>
          <div className="mix">
            <Select value={layout} options={projectLayout} onChange={(option) => {
              this.onSelectChange('layout', option)
            }}/>
          </div>
        </div>
        <div className="formitem">
          <label className="lab">JS栈：</label>
          <div className="mix">
            <Select value={stack} options={projectStack} onChange={(option) => {
              this.onSelectChange('stack', option)
            }}/>
          </div>
        </div>
        <div className="formitem">
          <label className="lab">插槽：</label>
          <div className="mix">
            <input value={slots} name="slots" type="text" className="ipt" placeholder="多个插槽用分号(;)分隔"
                   onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem">
          <label className="lab">标签：</label>
          <div className="mix">
            <input value={tags} name="tags" type="text" className="ipt" placeholder="多个标签用分号(;)分隔"
                   onChange={this.onChange}/>
          </div>
        </div>
        <div className="formitem" style={{width: '100%'}}>
          <label className="lab">图片：</label>
          <div className="mix">
            <UploadImg
              httpAgent={httpAgent}
              value={thumb}
              onChange={(url) => {
                this.onChange({target: {name: 'thumb', value: url}})
              }}
            />
          </div>
        </div>
        <div className="formitem" style={{width: '100%'}}>
          <label className="lab">描述：</label>
          <div className="mix">
            <textarea value={description} rows="5" name="description" className="textarea"
                      onChange={this.onChange}></textarea>
          </div>
        </div>
        <div className="formitem" style={{width: '100%'}}>
          <div className="mix">
            <button className="btn btn-primary" onClick={this.onCreate}>{editorInfo ? '修改' : '创建'}</button>
          </div>
        </div>
        <i className="close" onClick={modalClose} />
      </div>
    </Modal>)

  }


}