import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';

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
      selected: null, selectedAuth: null,
      msj:'No ha agregado registros.'
    };
  }

  state = { config: [] , error: null , redirect: false }

  changeName = (e) =>{
       this.setState({name: e.target.value});
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
    console.log('entro aqui',i)
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
    this.setState({
      participants
    })
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

    let data= {name, type, start_date, end_date, configurationUI, participants, authorityList, questionList }
    console.log(data);


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


    let answerText="";
    for(var i= 0; i < answers.length; i++) {
     answerText= answers[i] + " "  + answerText;
    }

    let jsonQuestion = {question, answerText}
    this.setState({ question:  e.target.value})

    this.state.questionList.push(jsonQuestion);
    console.log(this.state.questionListData);
    this.setState({ show: false });
  }

  submitPart = () =>{
    let part = this.state.participants;
    console.log(part);

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
          }
      }
      this.setState({authorityList: arr});
    }
    console.log(this.state.authorityList);
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
//console.log(this.configurationUI);
//console.log(this.authority);
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

             {
              (this.configurationUI && this.configurationUI.length > 0) ?

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


              :<tfoot>{this.state.msj}</tfoot>
             }

       </table>
      </div>
    </div>
  </div>



<div className="field">
    <label className="label display">Questions</label>
    <AddCircleOutlineIcon className="icon-add" onClick={this.showModal} />
    <div className="control">
      <div className="table-container scroll">
      <table className="table">
         <thead>
           <tr>
             <th>Question</th>
             <th>Answers</th>
           </tr>
             </thead>

             {
              (this.state.questionList && this.state.questionList.length > 0) ?

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

              :<tfoot>{this.state.msj}</tfoot>
             }

       </table>
      </div>
  </div>
</div>

</div>

<div className="column is-6 margin-top">

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
                :<tfoot>{this.state.msj}</tfoot>
               }

         </table>
        </div>
      </div>
    </div>

    <div className="field">
        <label className="label display">Participants</label>
        <AddCircleOutlineIcon className="icon-add" onClick={this.showModalPart} />
        <div className="control">
          <div className="table-container scroll">
          <table className="table">
             <thead>
               <tr>
                 <th>Participants</th>
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
                  :<tfoot>{this.state.msj}</tfoot>
                 }

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
                  <CancelIcon className="icon-close" onClick={this.handleDelete(index)}  />
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

</div>{/* big container */}
</div>
);
}
}
