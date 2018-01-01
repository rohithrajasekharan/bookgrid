
import React from 'react'
import postsNew from './posts_new'
import { SubmissionError } from 'redux-form'

class postsForm extends React.Component {
  submit = values => {
  if(!values.title) {
    throw new SubmissionError({
      username: 'User does not exist',
      _error: 'Login failed!'
    })
  }   
  }
  render() {
    return <postsNew onSubmit={this.submit} />
  }
}
