import React from 'react'
import WorkEditor from '../../components/workEditor'

export default class Home extends React.Component {

  render() {
    const {httpAgent, history} = this.props

    return (
      <div className="wrap clearfix">
        <WorkEditor httpAgent={httpAgent} history={history} id="0"/>
      </div>
    )
  }


}