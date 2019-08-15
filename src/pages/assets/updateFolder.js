import React from 'react'
import { tosts } from '@/ui'
import './updateFolder.css'

export default class UpdateFolder extends React.Component {

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  update = () => {

    const {httpAgent, closeModal, getList} = this.props
    const { name } = this.state

    if(!name) {

      tosts.error('请填写文件夹名称')

      return

    }

    const body = {
      name,
    }

    httpAgent.post('/folder/create',body).then(res=>{

      const {code, message, data} = res
      if (code === 0) {
        getList()
        closeModal()
      } else {
        tosts.error(message)
      }

    })

  }


  render () {

    return(<div className="update-folder">
      <div className="formitem "><label className="lab">名称：</label>
        <div className="mix">
          <input type="text" className="ipt" name="name" onChange={this.onChange}/>
        </div>
      </div>
      <div className="formitem">
        <button className="btn btn-info" onClick={this.update}>确定</button>
      </div>
    </div>)

  }


}