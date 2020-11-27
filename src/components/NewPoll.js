import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

export default class NewPoll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      start:'',
      end:'',
      configurationUI : [],
      authority: [],
      question:'',
      questions: [''],
      answers: [''],
      questionList:[''],
      active: false,
      show: false
    }
  }

  state = { config: [] , error: null , redirect: false }

  showModal = () => {
      this.setState({ show: true });
    };

    hideModal = () => {
      this.setState({ show: false });
    };

  handleText = i => e => {
    let answers = [...this.state.answers]
    answers[i] = e.target.value
    this.setState({
      answers
    })
  }

  handleDelete = i => e => {
    e.preventDefault()
    let answers = [
      ...this.state.answers.slice(0, i),
      ...this.state.answers.slice(i + 1)
    ]
    this.setState({
      answers
    })
  }

  addAnswer = e => {
    e.preventDefault()
    let answers = this.state.answers.concat([''])
    this.setState({
      answers
    })
  }

  handleSubmit = () => {
    this.setState({ redirect:  true})
  }

  createQuestion = (e) => {
    e.preventDefault()
    let question = this.state.question;
    let answerList = this.state.answers;
    let jsonQuestion = {question, answerList}
    this.setState({questionList: jsonQuestion});
    this.setState({ question:  e.target.value})
    console.log(this.state.questionList);
  }

  onSelectedRow(config, clickEvent){
      //your user object and the click event
      this.setState({ active: true});
      clickEvent.currentTarget.className = "is-active-row";
     console.log(config);
    }

  fetchUpcoming(){
    const ENDPOINTCONFIG ='http://localhost:8085/configurationUI/client/';
    const ENDPOINTAUTH ='http://localhost:8081/authority/client/';
    const id = sessionStorage.getItem("id");

    fetch(`${ENDPOINTCONFIG}${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
     }
    })
    .then(response => response.json())
    .then(data => {
              if(data){
                this.setState(this.configurationUI = data)
              }
              else console.log(data.error)
      });

      fetch(`${ENDPOINTAUTH}${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
       }
      })
      .then(response => response.json())
      .then(data => {
                if(data){
                  this.setState(this.authority = data)
                }
                else console.log(data.error)
        });
    }

    componentDidMount(){
      this.fetchUpcoming();
    }

render() {
  console.log(this.show)
console.log(this.configurationUI);
console.log(this.authority);
  return(
<div className="color-background">
  <nav className="navbar is-white">
    <div className="container">
        <div className="navbar-brand"></div>
    </div>
  </nav>

  <div className="login-title"> New Poll</div>
<div className="container">
  <form className="configuration-form" onSubmit={this.handleSubmit}>
  <div className="columns margin-top">

  <div className="column is-6 margin-top">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input"
          type="text"
          name="name"
          value={this.name}
          onChange={(e) => this.setState(this.name = e.target.value)}
          placeholder="Text input"/>
        </div>
      </div>

      <div className="field">
        <label className="label">Type</label>
        <div className="control">
          <input className="input"
          type="text"
          name="type"
          value={this.type}
          onChange={(e) => this.setState(this.type =e.target.value)}
          placeholder="Text input"/>
        </div>
    </div>

    <div className="field">
      <label className="label">Start Date</label>
      <div className="control">
        <input className="input"
        type="text"
        name="start"
        value={this.start}
        onChange={(e) => this.setState(this.start = e.target.value)}
        placeholder="Text input"/>
      </div>
  </div>

  <div className="field">
    <label className="label">End Date</label>
    <div className="control">
      <input className="input"
      type="text"
      name="end"
      value={this.end}
      onChange={(e) => this.setState(this.end = e.target.value)}
      placeholder="Text input"/>
    </div>
</div>

<div className="field">
    <label className="label">Questions</label>
    <AddCircleOutlineIcon className="icon-add" onClick={this.showModal} />
    <div className="control">

  </div>
</div>

</div>

<div className="column is-6 margin-top">

<div className="field">
  <label className="label">Configuration UI</label>
  <div className="control">
    <div className="table-container scroll">
    <table className="table">
       <thead>
         <tr>
           <th>Icon</th>
           <th>Background</th>
           <th>Font</th>
           <th>Fontsize</th>
           <th>Font Color</th>
           <th>Main Color</th>
           <th>Secondary Color</th>
         </tr>
           </thead>
           <tbody>
           {
            (this.configurationUI && this.configurationUI.length > 0) ?

            this.configurationUI.map((config, index) => {
              return (
                <tr key={config.id} onClick={this.onSelectedRow.bind(this, config)}>
                  <td>{config.icon}</td>
                  <td>{config.background}</td>
                  <td>{config.font}</td>
                  <td>{config.fontSize}</td>
                  <td>{config.fontColor}</td>
                  <td>{config.mainColor}</td>
                  <td>{config.secondaryColor}</td>
                </tr>
              );
            })


            :<small>Ha ocurrido un error</small>
           }
          </tbody>
     </table>
    </div>

  </div>
</div>
    <div className="field">
      <label className="label">Authority</label>
      <div className="control">
        <div className="table-container scroll">
        <table className="table">
           <thead>
             <tr>
               <th>Name</th>
               <th>Email</th>
             </tr>
               </thead>
               <tbody>
               {
                (this.authority && this.authority.length > 0) ?

                this.authority.map((auth, index) => {
                  return (
                    <tr key={auth.id}>
                      <td>{auth.name}</td>
                      <td>{auth.email}</td>
                    </tr>
                  );
                })


                :<small>Ha ocurrido un error</small>
               }
              </tbody>
         </table>
        </div>
      </div>
    </div>
    </div>



  </div> {/* columns */}



<div className="container">
  <div className="columns"></div>
    <div  className="column is-4"></div>
    <div className="column is-6">
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success"  value="Submit">Submit</button>
        </div>
        <div className="control">
          <button className="button is-success is-light">Cancel</button>
        </div>
    </div> {/* colum 6 */}
  </div> {/* columns */}
</div> {/* container */}

</form>

<Modal
       show={this.state.show}
       onHide={this.hideModal}
       backdrop="static"
       keyboard={false}
     >
       <Modal.Header closeButton>
         <Modal.Title>Add questions</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <div className="container">
         <div className="field">
             <label className="label">Questions</label>
             <div className="control">
               <input className="input-questions"
                 type="text"
                 onChange={(e) => this.setState({question: e.target.value})}
                 value={this.question}
               />
             <label className="label">Answers</label>
             {this.state.answers.map((answer, index) => (
             <span key={index}>
               <input className="input-questions"
                 type="text"
                 onChange={this.handleText(index)}
                 value={answer}
               />
             <CancelIcon className="icon-close" onClick={this.handleDelete(index)}  />
             </span>
           ))}
           <AddCircleIcon className="icon-add" onClick={this.addAnswer} />
           </div>
         </div>
       </div>
       </Modal.Body>
       <Modal.Footer>
         <button className="button is-success is-light" onClick={this.hideModal}>
           Close
         </button>
         <button className="button is-success" onClick={this.createQuestion} >Add</button>
       </Modal.Footer>
     </Modal>

</div>{/* big container */}
</div>
);
}
}
