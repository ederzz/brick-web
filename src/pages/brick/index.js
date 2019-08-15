import React from 'react'
import {tosts} from '@/ui'
import {addSearch,removeSearch,getParams} from '../../utils/url'
import projectCategory from '../../config/projectCategory'
import projectLayout from '../../config/projectLayout'
import projectStack from '../../config/projectStack'
import defaultWallListImg from '../../assets/img/defaultWallList.png'
import './index.css'

export default class Wall extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      layout: '',
      stack: '',
      data:[],
    }
  }

  componentDidMount() {
    const category = getParams('category')
    const layout = getParams('layout')
    const stack = getParams('stack')
    category && this.setState({category})
    layout && this.setState({layout})
    stack && this.setState({stack})
    this.getData(category,layout,stack)
    console.log('componentDidMount',category,layout,stack)
  }

  select = (name, value) => {
    const {category, layout, stack} = this.state
    let search
    if(value === category || value === layout || value === stack) {
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
    const {category, layout,stack} = this.state
    if(name === 'category') {
      this.getData(value,layout,stack)
    }else if(name === 'layout') {
      this.getData(category,value,stack)
    }else if(name === 'stack') {
      this.getData(category,layout,value)
    }
    history.push(`/brick/${search}`)
  }



  getData = (category,layout,stack) => {
    const {httpAgent} = this.props

    let url = `/brick/getList/?page=1`
    category && (url+=`&category=${category}`)
    layout && (url+=`&layout=${layout}`)
    stack && (url+=`&stack=${stack}`)

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
          <a href={this.getLink(v)} target="_blank">
            <img src={v.thumb ? `//assets.brickui.com/${v.thumb}` : defaultWallListImg}/>
          </a>
          <div>
            <strong>{v.name}</strong>
            <p>{v.description}</p>
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

  getLink = (v) => {
    if(v.category === 'template') {
      // 模版可以直接渲染
      return `/p?json={"ui":"${v.name}"}`
    }else if(v.stack === 'native') {
      // 其它模块 需要使用相关模版进行渲染
      return `/p?json={"ui":"native-template","brick":{"app":"${v.name}"}}`
    }else if(v.stack === 'babel') {
      return `/p?json={"ui":"babel-template","brick":{"app":"${v.name}"}}`
    }else if(v.stack === 'jquery') {
      return `/p?json={"ui":"jquery-template","brick":{"app":"${v.name}"}}`
    }else if(v.stack === 'react') {
      return `/p?json={"ui":"react-template","brick":{"app":"${v.name}"}}`
    }else if(v.stack === 'vue') {
      return `/p?json={"ui":"vue-template","brick":{"app":"${v.name}"}}`
    }else{
      return `/p?json={"ui":"${v.name}"}`
    }
  }

  render() {
    const {category, layout, stack} = this.state
    return (
      <div className="brick">
        <div className="brick-nav wrap">
          <ul>
            <li>模块分类</li>
            {
              projectCategory.map(v => {
                return <li
                  key={v.value}
                  onClick={() => {
                    this.select('category', v.value)
                  }}
                  className={category === v.value ? 'active' : ''}
                >{v.name}</li>
              })
            }
          </ul>
          <ul>
            <li>响应设备</li>
            {
              projectLayout.map(v => {
                return <li
                  key={v.value}
                  onClick={() => {
                    this.select('layout', v.value)
                  }}
                  className={layout === v.value ? 'active' : ''}
                >{v.name}</li>
              })
            }
          </ul>
          <ul>
            <li>技术栈</li>
            {
              projectStack.map(v => {
                return <li
                  key={v.value}
                  onClick={() => {
                    this.select('stack', v.value)
                  }}
                  className={stack === v.value ? 'active' : ''}
                >{v.name}</li>
              })
            }
          </ul>
        </div>
        {this.getList()}
      </div>
    )
  }


}