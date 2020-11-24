import React, {Component} from "react";

export default class Questions extends Component {
  state = {
    questions: ['hello']
  }

  handleText = i => e => {
    let questions = [...this.state.questions]
    questions[i] = e.target.value
    this.setState({
      questions
    })
  }

  handleDelete = i => e => {
    e.preventDefault()
    let questions = [
      ...this.state.questions.slice(0, i),
      ...this.state.questions.slice(i + 1)
    ]
    this.setState({
      questions
    })
  }

  addQuestion = e => {
    e.preventDefault()
    let questions = this.state.questions.concat([''])
    this.setState({
      questions
    })
  }

  render() {
    return (
      <div>
        {this.state.questions.map((question, index) => (
          <span key={index}>
            <input
              type="text"
              onChange={this.handleText(index)}
              value={question}
            />
            <button onClick={this.handleDelete(index)}>X</button>
          </span>
        ))}
        <button onClick={this.addQuestion}>Add New Question</button>
      </div>
    )
  }
}
