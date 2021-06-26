import React, {Component} from 'react';
import Header from './Header.js'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from 'react-bootstrap/Modal'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Menu from './Menu.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {IP} from './Connection.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export class PollEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name:'',
      type:"Poll",
      start:"2021-01-01",
      end:"2021-01-02",
      config:[],
      configuration: [],
      configurationUI : [],
      authority: [],
      authorityList:[],
      question:'',
      questions: [''],
      answers: [''],
      participants:[],
      participantsList: [],
      questionList2:[],
      questionListData:[],
      active: false,
      show: false,
      showPart: false,
      openSnack: false,
      showResp: false,
      selected: null, selectedAuth: null,
      msj:'No ha agregado registros.',
      poll:[]
    };
  }

_handleChangeName = (e) => {
  this.setState({name: e.target.value});}

_onSelectedRow(config, clickEvent){
  this.setState({
    selected: config
  })
  this.setState({ configuration : clickEvent})
}

_onSelectedRowAuth(auth, event){
    let arr = [];
    let id_authority= auth["id_auth"];
    let authority= {
         "id_auth" : id_authority
     };
    event.currentTarget.className= event.currentTarget.className === ""? "is-active-row" : '';
    this.state.authorityList.push(authority);
    arr = this.state.authorityList;

    if(event.currentTarget.className === "" && arr.length>0){
      for( var i = 0; i < arr.length; i++){
        var item = arr[i];
        if (item["id_auth"] === auth["id_auth"]) {
            arr.splice(i, 1);
        }
    }
    this.setState({authorityList: arr});}

  console.log(this.state.authorityList);
}

_showModalQuestion = () => {
    this.setState({ show: true });
  };

_hideModalQuestion = () => {
    this.setState({ show: false });
  };

_handleTextQuestion = i => e => {
  let answers = [...this.state.answers]
  answers[i] = e.target.value
  this.setState({
    answers
  })
}

_addAnswer = e => {
  e.preventDefault()
  let answers = this.state.answers.concat([''])
  this.setState({
    answers
  })
}

_handleDeleteAnswer = i => e => {
  console.log('entro aqui',i)
  e.preventDefault()
  let answers = [
    ...this.state.answers.slice(0, i),
    ...this.state.answers.slice(i + 1)
  ]
  this.setState({
    answers
  })
}

_handleDeleteQuestion = i => e => {

  e.preventDefault()
  let questionList2 = [
    ...this.state.questionList2.slice(0, i),
    ...this.state.questionList2.slice(i + 1)
  ]
  this.setState({
    questionList2
  })
}

_submitQuestion = (e) => {
  let question = this.state.question;
  let answers = this.state.answers;
  var answerList= [];

    for(var i= 0; i < answers.length; i++) {
     answerList.push({
          "answer" : answers[i]
      });
    }

  let jsonQuestionData = {question, answerList}
  this.state.questionListData.push(jsonQuestionData);

  let answerText="";
  for(var j= 0; j < answers.length; j++) {
   answerText= answers[j] + ", "  + answerText;
  }

  let jsonQuestion = {question, answerText}
  this.setState({ question:  e.target.value})

  this.state.questionList2.push(jsonQuestion);
  this.setState({ show: false });
}

_handleQuestions = (questionList) =>{

  for(var i= 0; i < questionList.length; i++) {
   let question; var answerList= [];
   question= questionList[i].question;
   answerList = questionList[i].answerList;
   let jsonQuestionData = {question, answerList}
   this.state.questionListData.push(jsonQuestionData);

   let answerText="";
   for(var j= 0; j < answerList.length; j++) {
    answerText= answerList[j].answer + ", "  + answerText;
   }

   let jsonQuestion = {question, answerText}
   this.state.questionList2.push(jsonQuestion);
  }

}

_addPart = e => {
  let participants = this.state.participants.concat([''])
  this.setState({
    participants
  })
}

_showModalPart = () => {
      this.setState({ showPart: true });
    };

_hideModalPart = () => {
    this.setState({ showPart: false });
  };

_handleTextPart = i => e => {
    let participants = [...this.state.participants]
    let name= e.target.value
    var part= {"name" : name};

    participants[i] = part
    this.setState({
      participants
    })
  }

_handleDeletePart = i => e => {
  e.preventDefault()
  let participants = [
    ...this.state.participants.slice(0, i),
    ...this.state.participants.slice(i + 1)
  ]
  this.setState({
    participants
  })
}

_submitPart = () =>{

  let part = this.state.participants;
  console.log(part);

  this.setState({ showPart: false });
}

_handleCloseSnack = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  this.setState({openSnack: false});
};

_handleSubmit = (e) => {
  e.preventDefault();
  let name= this.state.name;
  let type =  this.state.type;
  let start_date= this.state.start;
  let end_date = this.state.end;
  let questionList = this.state.questionListData;
  let participantsList = this.state.participants;
  let configurationUI = this.state.configuration;
  let authorityList = this.state.authorityList;
  let status = 0;

  var participants= [];
    for(var i= 0; i < participantsList.length; i++) {
     participants.push({
          "name" : participantsList[i].name
      });
  }

  const data= {name, type,status, start_date, end_date, configurationUI, participants, authorityList, questionList }

    if(name === "" || questionList.length ===  0 || authorityList.length === 0 ||
    configurationUI.length === 0 || participants.length === 0)
    {
      console.log(data)
       this.setState({openSnack: true});
    }
    else {

      console.log(JSON.stringify(data));
      const ENDPOINTUPDATEPOLL= IP+':8083/poll/update/';
      const id= this.props.match.params.id
      const options = {
        method: 'put',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
           body: JSON.stringify(data)}


      fetch(`${ENDPOINTUPDATEPOLL}${id}`,options)
      .then(res =>  res.json())
      .then(data => {
        console.log(data)
        if(data.status === 200){
          this.setState({showResp : true})
        }
       });

   }
}

fetchFindPoll(id) {
  const ENDPOINTFINDPOLL= IP+':8083/poll/find/';

  fetch(`${ENDPOINTFINDPOLL}${id}`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
   }
  })
    .then(res =>  res.json())
    .then(data => {
              if(data){
                this.setState(this.poll = data)
                this._handleQuestions(this.poll.questionList);
              }
              else console.log(data.error)
      });
}

fetchUpcoming(){
  const ENDPOINTCONFIG =IP+':8085/configurationUI/client/';
  const ENDPOINTAUTH =IP+':8081/authority/client/';
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
  const id_poll = this.props.match.params.id
  this.fetchFindPoll(id_poll);
  this.fetchUpcoming();
}


render(){
  const vertical = "top"
  const horizontal = "center";

    return(
<div className="color-background">
        <Header/>
<div className="columns">
<div className="column is-2">
    <Menu/>
</div>
  <div  className="column is-9 dashboard" style={{paddingTop:"2%"}}>
    <form className="configuration-form" onSubmit={this._handleSubmit}>
      <div className="form-title"> Edit Poll</div>
        <div className="row">

          <div className="column is-6 margin-top" style={{paddingTop:"0%"}}>

            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className="input"
                  type="text"
                  name="name"
                  placeholder={this.state.name}
                  onChange={this._handleChangeName} />
                </div>
            </div>

            <div className="field">
              <label className="label">Start Date</label>
              <div className="control">
                <input className="input"
                  type="date"
                  defaultValue="2021-01-01"
                  name="start"
                  placeholder="date"/>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <div className="table-container scroll">
                <table className="table">
                   <thead>
                     <tr>
                       <th>Icon</th>
                       <th>Background</th>
                       <th>Font</th>
                       <th>Fontsize</th>
                       <th>Fontcolor</th>
                       <th>Maincolor</th>
                       <th>Secondarycolor</th>
                     </tr>
                       </thead>

                       {
                        (this.configurationUI && this.configurationUI.length > 0) ?

                        this.configurationUI.map((config, index) => {
                          return (
                            <tbody>
                            <tr key={index} onClick={this._onSelectedRow.bind(this, index, config)}
                            style= {{background: index === this.state.selected ? '#EEF6FC' : 'white',
                              color: index === this.state.selected ? 'black' : 'black'
                            }}>
                              <td><img className="image-upload" src={config.icon} alt="" /></td>
                              <td>{config.background}</td>
                              <td>{config.font}</td>
                              <td>{config.fontSize}</td>
                              <td>{config.fontColor}</td>
                              <td>{config.mainColor}</td>
                              <td>{config.secondaryColor}</td>
                            </tr>
                            </tbody>
                          );
                        })


                        :<tfoot>{this.state.msj}</tfoot>
                       }

                 </table>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <div className="table-container scroll">
                <table className="table">
                   <thead>
                     <tr>
                        <th>Questions</th>
                        <th></th>
                        <AddCircleOutlineIcon className="icon-add" onClick={this._showModalQuestion} />
                     </tr>
                       </thead>
                      {(this.state.questionList2 && this.state.questionList2.length > 0) ?

                          this.state.questionList2.map((question, index) => {
                            return (
                            <tbody>
                              <tr key={index}>
                                <td>{question.question}</td>
                                <td>{question.answerText}</td>
                                <CancelIcon className="icon-close"
                                onClick={this._handleDeleteQuestion(index)}  />
                              </tr>
                            </tbody>
                            );
                          })

                          :<tfoot>{this.state.msj}</tfoot>
                         }

                   </table>
                  </div>
              </div>
            </div>

          </div>

          <div className="column is-6 margin-top" style={{paddingTop:"0%"}}>

            <div className="field">
              <label className="label">Type</label>
              <div className="control">
                <div className="select" style= {{width: "100%"}}>
                    <select value={this.type} style= {{width: "100%"}}>
                    <option>Poll</option>
                    <option>Vote</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">End Date</label>
              <div className="control">
                <input className="input"
                type="date"
                defaultValue="2021-01-02"
                name="end"
                value={this.end}
                placeholder="Text input"/>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <div className="table-container scroll">
                <table className="table">
                   <thead>
                     <tr>
                       <th>Authority</th>
                       <th>Email</th>
                     </tr>
                       </thead>

                       {
                        (this.authority && this.authority.length > 0) ?

                        this.authority.map((auth, index) => {
                          return (
                             <tbody>
                            <tr key={auth.id} onClick={this._onSelectedRowAuth.bind(this, auth)}>
                              <td>{auth.name}</td>
                              <td>{auth.email}</td>
                            </tr>
                            </tbody>
                          );
                        })
                        :<tfoot>{this.state.msj}</tfoot>
                       }

                 </table>
                </div>
              </div>
            </div>

            <div className="field">
                <div className="control">
                  <div className="table-container scroll">
                  <table className="table">
                     <thead>
                       <tr>
                         <th>Participants</th>
                           <AddCircleOutlineIcon className="icon-add" onClick={this._showModalPart} />
                       </tr>
                         </thead>
                         {(this.state.participants && this.state.participants.length > 0) ?

                          this.state.participants.map((part, index) => {
                            return (
                              <tbody>
                              <tr key={part.id}>
                                <td>{part.name}</td>
                                <CancelIcon className="icon-close" onClick={this._handleDeletePart(index)}/>
                              </tr>
                              </tbody>
                            );
                          })
                          :<tfoot>{this.state.msj}</tfoot>
                         }
                   </table>
                  </div>
              </div>
            </div>

          </div>

        </div>
        <div className="column is-12" style={{display:"grid", paddingTop:"0%"}}>
          <button  className="button azul-banner">
            Submit
          </button>
        </div>
      </form>
    </div>

    <Modal
           show={this.state.show}
           onHide={this._hideModalQuestion}
           backdrop="static"
           keyboard={false}
         >
           <Modal.Header closeButton>
             <Modal.Title>Add questions</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <div className="container">
             <div className="field">
                 <label className="label">Question</label>
                 <div className="control">
                   <input className="input-questions"
                     type="text"
                     onChange={(e) => this.setState({question: e.target.value})}
                     value={this.question}
                   />
                 <label className="label margin-top">Answers</label>
                 {this.state.answers.map((answer, index) => (
                 <span key={index}>
                   <input className="input-questions"
                     type="text"
                     onChange={this._handleTextQuestion(index)}
                     value={answer}
                   />
                 <CancelIcon className="icon-close" onClick={this._handleDeleteAnswer(index)}  />
                 </span>
               ))}
               <AddCircleIcon className="icon-add" onClick={this._addAnswer} />
               </div>
             </div>
           </div>
           </Modal.Body>
           <Modal.Footer>
             <button className="button is-success is-light" onClick={this._hideModalQuestion}>
               Close
             </button>
             <button className="button is-success" onClick={this._submitQuestion} >Add</button>
           </Modal.Footer>
         </Modal>

    <Modal
           show={this.state.showPart}
           onHide={this._hideModalPart}
           backdrop="static"
           keyboard={false}
         >
           <Modal.Header closeButton>
             <Modal.Title>Add participants</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <div className="container">
             <div className="field">

                 <label className="label margin-top">Name</label>
                 {this.state.participants.map((participant, index) => (
                 <span key={index}>
                   <input className="input-questions"
                     type="text"
                     onChange={this._handleTextPart(index)}
                     value={participant.name}
                   />
                 <CancelIcon className="icon-close" onClick={this._handleDeletePart(index)}  />
                 </span>
               ))}
               <AddCircleIcon className="icon-add" onClick={this._addPart} />
               </div>
             </div>
           </Modal.Body>
           <Modal.Footer>
             <button className="button is-success is-light" onClick={this._hideModalPart}>
               Close
             </button>
             <button className="button is-success" onClick={this._submitPart} >Add</button>
           </Modal.Footer>
         </Modal>

            <Snackbar className="tab" open={this.state.openSnack}  anchorOrigin={{ vertical, horizontal}} key={vertical + horizontal} autoHideDuration={16000} onClose={this.handleCloseSnack}>
                  <Alert onClose={this._handleCloseSnack} severity="error">
                    There are empty fields!
                  </Alert>
           </Snackbar>
  </div>
</div>
    )
}
}
