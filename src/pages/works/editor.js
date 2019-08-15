import React from 'react'
import {tosts} from '@/ui'
import WorkEditor from '../../components/workEditor'
import jsonlint from '../../utils/jsonlint'
import './editor.css'

export default class WorksEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: undefined,
      editorInfo: undefined,
      saving: false
    }
  }

  componentDidMount () {
    this.getCode()
  }

  getCode = () => {

    const { httpAgent, match:{params:{id}} } = this.props

    if(id === '0') {
       // 0  新建
      return
    }

    httpAgent.get(`/works/getMyWorks?id=${id}`).then(res=>{

      const {code,data,message} =res

      if(code === 0) {
        this.setState({
          code: data.code || '',
          editorInfo: {
            thumb: data.thumb || '',
            name: data.name || '',
            tags: data.tags ? data.tags.join(';') : '',
          }
        })
      }else{
        tosts.error(message)
      }

    })

  }



  render() {

    console.log('editor',this.state)
    const { match:{params:{id}}, httpAgent, history } = this.props
    const { code, editorInfo, saving } = this.state
    let initCode = undefined

    try {
      initCode = jsonlint.parse(code)
    }
    catch (err) {
    }

    if(code === undefined && id !== '0') {
      return null
    }

    return(<div className="wrap clearfix">
      <WorkEditor httpAgent={httpAgent} history={history} initCode={initCode} id={id} editorInfo={editorInfo}  />
    </div>)

  }

}