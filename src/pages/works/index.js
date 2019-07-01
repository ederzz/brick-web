import React from 'react'
import {Link} from 'react-router-dom'
import {tosts} from '@/ui'
import {addSearch,removeSearch,getParams} from '../../utils/url'
import projectCategory from '../../config/projectCategory'
import projectLayout from '../../config/projectLayout'
import defaultWallListImg from '../../assets/img/defaultWallList.png'
import './index.css'

export default class Wall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      layout: '',
      data:[],
    }
  }

  componentDidMount() {
    const category = getParams('category')
    const layout = getParams('layout')
    category && this.setState({category})
    layout && this.setState({layout})
    this.getData(category,layout)
    console.log('componentDidMount',category,layout)
  }

  select = (name, value) => {
    const {category, layout} = this.state
    let search
    if(value === category || value === layout) {
      // 如果点击的是高亮 则取消
      search = removeSearch(name)
      this.setState({[name]: ''},()=>{
        this.go(search, name, undefined)
      })
    }else {
      search = addSearch(name, value)
      this.setState({[name]: value},()=>{
        this.go(search, name, value)
      })
    }
  }

  go = (search, name, value) => {
    const {history} = this.props
    const {category, layout} = this.state
    if(name === 'category') {
      this.getData(value,layout)
    }else if(name === 'layout') {
      this.getData(category,value)
    }
    history.push(`/brick/${search}`)
  }



  getData = (category,layout) => {
    const {httpAgent} = this.props

    let url = `/wall/getMyList/?page=1`
    category && (url+=`&category=${category}`)
    layout && (url+=`&layout=${layout}`)

    httpAgent.get(url).then(res => {
      const {code, message, data} = res
      if (code === 0) {
        this.setState({data})
      } else {
        tosts.error(message)
      }
    })
  }

  getList = () => {
    const {data} = this.state
    if(Array.isArray(data) && data.length) {
      const lis = data.map(v=>{
        return <li key={v.name}>
          <a className="thumb" href={`/p?json=${v.code}`} target="_blank">
            <img src={defaultWallListImg}/>
          </a>
          <Link className="update btn btn-s btn-success" to={`/works/${v.id}`} target="_blank">修改</Link>
          <div>
            <strong>{v.name}</strong>
          </div>
        </li>
      })

      return <div className="wrap">
        <ul className="p-works-list">
          {lis}
        </ul>
      </div>
    }else{
      return null
    }
  }

  render() {
    return (
      <div className="p-works">
        {this.getList()}
        <div className="handle">
          <Link className="btn btn-primary" to="/works/0" target="_blank">创建</Link>
        </div>
      </div>
    )
  }


}