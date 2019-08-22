import React from 'react'
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

    let url = `/works/getList/?page=1`
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

  getTags = (tags) => {
    console.log('tags',tags)
    if(Array.isArray(tags) && tags.length) {
      const lis = tags.map((v,i)=>{
        console.log('v',v)
        return <span key={i}>{v}</span>
      })

      return lis
    }else{
      return null
    }
  }

  getList = () => {
    const {data} = this.state
    if(Array.isArray(data) && data.length) {
      const lis = data.map((v,i)=>{
        return <li key={i}>
          <a href={`/p?json=${v.code}`} target="_blank">
            <img src={v.thumb ? `//assets.brickui.com/${v.thumb}` : defaultWallListImg}/>
          </a>
          <div>
            <strong>{v.name}</strong>
            <p className="tags">标签：{this.getTags(v.tags)}</p>
            <p>作者：{v.user}<a className="src" href={`/web/${v.id}`} target="_blank">源码</a></p>
          </div>
        </li>
      })

      return <div className="wrap">
        <ul className="brick-list">
          {lis}
        </ul>
      </div>
    }else{
      return null
    }
  }

  render() {
    const {category, layout} = this.state
    return (
      <div className="brick">
        {this.getList()}
      </div>
    )
  }


}