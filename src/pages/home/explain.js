import React from 'react'
import ExplainDemo from './explainDemo'
import ExplainInfo from './explainInfo'

export default class Explain extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'demo'
    }
  }

  toggleTab = (activeTab) => {
    this.setState({activeTab})
  }

  render() {
    const {activeTab} = this.state
    const tab = [
      {
        label: 'DEMO',
        value: 'demo'
      },
      {
        label: '说明',
        value: 'explain'
      }
    ]

    return(<div className="home-explain home-tab">
      <div className="head">
        {
          tab.map(v=>{
            return <a
              key={v.value}
              className={activeTab === v.value ? 'active' : ''}
              onClick={()=>{this.toggleTab(v.value)}}
            >{v.label}</a>
          })
        }
      </div>
      <div className="body">
        {activeTab === 'demo' ? <ExplainDemo /> : <ExplainInfo /> }
      </div>
    </div>)

  }


}