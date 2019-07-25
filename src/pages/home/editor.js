import React from 'react'
import {Scroll} from '@/ui'
import Create from './create'
import Code from './code'
import Explain from './explain'
import './editor.css'

export default class Editor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      active: 'create'
    }
  }

  render() {
    const {code, setCode} = this.props
    const {active} = this.state
    let activeObj = undefined

    const tabs = [
      {
        type: 'create',
        title: '创作',
        body: <Create code={code} setCode={setCode}/>
      },
      {
        type: 'code',
        title: '源码',
        body: <Code/>
      },
      {
        type: 'explain',
        title: '说明',
        body: <Explain/>
      },
    ]

    for(const i in tabs) {
      if(tabs[i].type === active) {
        activeObj = tabs[i]
        break
      }
    }



    return(<div className="home-tabs home-editor clearfix">
      <div className="head">
        {tabs.map(v=>{
          return <span key={v.type} className={v.type === active ? 'active' : ''}>{v.title}</span>
        })}
      </div>
      <div className="body">
        <Scroll>
          {activeObj.body}
        </Scroll>
      </div>
    </div>)

  }


}