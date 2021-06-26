import React, {Component} from "react";
import Header from './Header.js'
import Modal from 'react-bootstrap/Modal'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Menu from './Menu.js'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class NewPoll extends Component {
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
      questionList:[],
      questionListData:[],
      active: false,
      show: false,
      showPart: false,
      showResp: false,
      showError: false,
      openSnack: false,
      selected: null, selectedAuth: null,
      msj:'No ha agregado registros.',
      error:""
    };
  }

  state = { config: [] , error: null , redirect: false }

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({openSnack: false});
  };

  changeName = (e) =>{
    var pattern = new RegExp("^[a-zA-Z ]+$");
    if(!pattern.test(e.target.value))
    this.setState({error:"There are errors on Name input"});
    else {
      this.setState({name: e.target.value});
    }
  }

  changeStart  = (e) =>{
   let date= e.target.value;
       this.setState({start: date});
       console.log(this.state.start);
     }

  changeEnd  = (e) =>{
     let date= e.target.value;
      this.setState({end: date});
      }

  changeType  = (e) =>{
    this.setState({type: e.target.value});
    }

  showModal = () => {
      this.setState({ show: true });
    };

  hideModal = () => {
      this.setState({ show: false });
    };

  showModalPart = () => {
        this.setState({ showPart: true });
      };

  hideModalPart = () => {
      this.setState({ showPart: false });
    };

  showModalResp = () => {
      this.setState({ showResp: true });
    };

  hideModalResp = () => {
      this.setState({ showResp: false });
    };

  showModalError = () => {
      this.setState({ showError: true });
    };

  hideModalError = () => {
      this.setState({ showError: false });
    };

  handleText = i => e => {
    let answers = [...this.state.answers]
    answers[i] = e.target.value
    this.setState({
      answers
    })
  }

  handleTextPart = i => e => {
    let participants = [...this.state.participants]
    let name= e.target.value
    participants[i] = name
    this.setState({
      participants
    })
  }

  handleDelete = i => e => {
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

  handleDeleteQuestion = i => e => {
    console.log('entro aqui',i)
    e.preventDefault()
    let questionList = [
      ...this.state.questionList.slice(0, i),
      ...this.state.questionList.slice(i + 1)
    ]
    this.setState({
      questionList
    })
  }

  handleDeletePart = i => e => {
    console.log('entro aqui en handleDeletePart',i)
    e.preventDefault()
    let participants = [
      ...this.state.participants.slice(0, i),
      ...this.state.participants.slice(i + 1)
    ]
    this.setState({
      participants
    })
  }

  addAnswer = e => {
    e.preventDefault()
    let answers = this.state.answers.concat([''])
    this.setState({
      answers
    })
  }

  addPart = e => {

    let participants = this.state.participants.concat([''])
    console.log("addPart",participants);
    this.setState({
      participants
    })
  }

  submitQuestion = (e) => {
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
      console.log(jsonQuestionData);

      let answerText="";
      for(var j= 0; j < answers.length; j++) {
       answerText= answers[j] + ", "  + answerText;
      }

      let jsonQuestion = {question, answerText}
      this.setState({ question:  e.target.value})

      this.state.questionList.push(jsonQuestion);
      console.log(this.state.questionListData);
      this.setState({ show: false });
  }

  submitPart = () =>{
      let part = this.state.participants;
      console.log("submitPart",part);

      this.setState({ showPart: false });
  }

    onSelectedRow (config, clickEvent){
      this.setState({
        selected: config
      })
      this.setState({ configuration : clickEvent})
      console.log(clickEvent);
    }

    onSelectedRowAuth(auth, event){
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
              i--;
          }
      }
      this.setState({authorityList: arr});
    }
    console.log(this.state.authorityList);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let name= this.state.name;
    let type =  this.state.type;
    let start_date= this.state.start;
    let end_date = this.state.end;
    let questionList = this.state.questionListData;
    let participantsList = this.state.participants;
    let configurationUI = this.state.configuration;
    let authorityList = this.state.authorityList;

    var participants= [];
      for(var i= 0; i < participantsList.length; i++) {
       participants.push({
            "name" : participantsList[i]
        });
    }

    let data= {name, type, start_date, end_date, configurationUI, participants,
      authorityList, questionList }
      console.log(data);

    if(name === "" ){
      this.setState({error:"There are errors on Name input"});
       this.setState({openSnack: true});
    }
    else if( questionList.length ===  0 || authorityList.length === 0 ||
    configurationUI.length === 0 || participants.length === 0){

      this.setState({error:"There are empty fields."});
       this.setState({openSnack: true});
    }
    else {
      fetch('http://155.138.233.164:8083/poll', {
                 method: "POST",
                 body: JSON.stringify(data),
                 headers: {
                   Accept: "application/json",
                   "Content-Type": "application/json"
                 }
                })
                .then(data => {
                    if(data.status === 201){
                      this.setState({showResp : true})
                    }
                }).catch(err => console.log(err));
  }
}

  fetchUpcoming(){

    const ENDPOINTCONFIG ='http://155.138.233.164:8085/configurationUI/client/';
    const ENDPOINTAUTH ='http://155.138.233.164:8081/authority/client/';
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
                else {
                  fetch('http://155.138.233.164:8083/poll', {
                             method: 'POST',
                             body: JSON.stringify(data),
                             headers: {
                               Accept: "application/json",
                               "Content-Type": "application/json"
                             }
                            })
                            .then(data => {
                              if(data.status === 201)
                                this.setState({showResp : true})
                              }).catch(err => console.log(err));
                }
        });
    }

    componentDidMount(){
    this.fetchUpcoming();
    }

render() {
  const url_dash="/";
  const vertical = 'top';
  const horizontal= 'center';

  return(
<div className="color-background">
<Header/>

<div className="columns">
  <div className="column is-2">
      <Menu/>
  </div>
  <div  className="column is-9 dashboard" style={{paddingTop:"3%"}}>
  <form className="configuration-form" onSubmit={this.handleSubmit}>
      <div className="form-title"> New Poll</div>
      <div className="row">

        <div className="column is-6 margin-top" style={{paddingTop:"0%"}}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.changeName}
                placeholder="Text input"/>
              </div>
            </div>

            <div className="field">
              <label className="label">Start Date</label>
              <div className="control">
                <input className="input"
                  type="date"
                  defaultValue="2021-01-01"
                  name="start"
                  onChange={this.changeStart}
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

                       {(this.configurationUI && this.configurationUI.length > 0) ?

                        this.configurationUI.map((config, index) => {
                          return (
                            <tbody>
                            <tr key={index} onClick={this.onSelectedRow.bind(this, index, config)}
                            style= {{background: index === this.state.selected ? '#EEF6FC' : 'white',
                              color: index === this.state.selected ? 'black' : 'black'
                            }}>
                              <td>{config.icon}</td>
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
                        :<tbody>
                          <tr><td>{this.state.msj}</td></tr>
                        </tbody>
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
                        <AddCircleOutlineIcon className="icon-add" onClick={this.showModal} />
                     </tr>
                       </thead>

                       {(this.state.questionList && this.state.questionList.length > 0) ?

                        this.state.questionList.map((question, index) => {
                          return (
                          <tbody>
                            <tr key={index}>
                              <td>{question.question}</td>
                                <td>{question.answerText}</td>
                              <CancelIcon className="icon-close" onClick={this.handleDeleteQuestion(index)}  />
                            </tr>
                          </tbody>
                          );
                        })

                        :<tbody>
                          <tr><td>{this.state.msj}</td></tr>
                        </tbody>
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
                  <select value={this.type} onChange={this.changeType} style= {{width: "100%"}}>
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
              onChange={this.changeEnd}
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
                          <tr key={auth.id} onClick={this.onSelectedRowAuth.bind(this, auth)}>
                            <td>{auth.name}</td>
                            <td>{auth.email}</td>
                          </tr>
                          </tbody>
                        );
                      })
                      :<tbody>
                        <tr><td>{this.state.msj}</td></tr>
                      </tbody>
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
                         <AddCircleOutlineIcon className="icon-add" onClick={this.showModalPart} />
                     </tr>
                       </thead>

                       {(this.state.participants && this.state.participants.length > 0) ?

                        this.state.participants.map((part, index) => {
                          return (
                            <tbody>
                            <tr key={index}>
                              <td>{part}</td>
                              <CancelIcon className="icon-close" onClick={this.handleDeletePart(index)}/>
                            </tr>
                            </tbody>
                          );
                        })
                        :<tbody>
                          <tr><td>{this.state.msj}</td></tr>
                        </tbody>
                       }

                 </table>
                </div>
            </div>
          </div>
          </div>

      </div> {/* columns */}
 {/* columns */}
 <div className="column is-12" style={{display:"grid", paddingTop:"0%"}}>
   <button  className="button azul-banner">
   Submit
   </button>
 </div>
</form>
</div>
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
         <button className="button is-success" onClick={this.submitQuestion} >Add</button>
       </Modal.Footer>
     </Modal>

     <Modal
            show={this.state.showPart}
            onHide={this.hideModalPart}
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
                      onChange={this.handleTextPart(index)}
                      value={participant}
                    />
                  <CancelIcon className="icon-close" onClick={this.handleDeletePart(index)}  />
                  </span>
                ))}
                <AddCircleIcon className="icon-add" onClick={this.addPart} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="button is-success is-light" onClick={this.hideModalPart}>
                Close
              </button>
              <button className="button is-success" onClick={this.submitPart} >Add</button>
            </Modal.Footer>
          </Modal>

          <Modal
             show={this.state.showResp}
             onHide={this.hideModalResp}
             backdrop="static"
             keyboard={false}
           >
           <Modal.Header closeButton>
           </Modal.Header>
             <Modal.Body>
               <div className="container">
                <p>Your {this.state.type} was created successfully. </p>
             </div>
             </Modal.Body>
             <Modal.Footer>
                 <a href={url_dash} className="button is-success">ok</a>
             </Modal.Footer>
           </Modal>

           <Snackbar className="tab" open={this.state.openSnack}  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} autoHideDuration={16000} onClose={this.handleCloseSnack}>
                 <Alert onClose={this.handleCloseSnack} severity="error">
                   {this.state.error}
                 </Alert>
          </Snackbar>



</div>{/* big container */}
</div>
);
}
}
