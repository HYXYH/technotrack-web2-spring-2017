import React from 'react'
import { cent } from 'react-cent'

// Make Centrifuge client accessible through `this.props.cent`
@cent
export default class PostPopUp extends React.Component {
    constructor (props) {
      super(props)

      // Subscribe on `site-metrics` channel.
      this.props.cent.subscribe('posts', message => {
        this.handleMessage(message)
      }).history().then(history => {
        this.handleHistory(history)
      })
    }

    render() {
        return (<div></div>)
    }

    handleMessage(message) {
      console.log('message', message.data)
    }

    handleHistory(history) {
      console.log('history' , history.data)
    }
}