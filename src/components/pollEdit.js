import React, {Component} from 'react';
import Header from './Header.js'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';


export class pollEdit extends Component {
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
      msj:'No ha agregado registros.',
      poll:[]
    };

  }


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

  var participants= [];
  for(var i= 0; i < participantsList.length; i++) {
   participants.push({
        "name" : participantsList[i]
    });
  }

  let data= {name, type, start_date, end_date, configurationUI, participants, authorityList, questionList }
  console.log(data);


}

_handleChangeEvent = (e) => {
  this.setState({
    form:{...this.state.form, [e.target.name]:e.target.value,},
    });
      }

_onSelectedRow(config, clickEvent){
  this.setState({
    selected: config
  })
  this.setState({ configuration : clickEvent})
  console.log(clickEvent);
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
    this.setState({authorityList: arr});
  }
  console.log(this.state.authorityList);
}

_handleDeletePart = i => e => {
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

_handleDeleteQuestion = i => e => {
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


fetchFindPoll(id) {
const ENDPOINTFINDPOLL= 'http://localhost:8083/poll/find/';

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
              }
              else console.log(data.error)
      });
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
  const id_poll = this.props.match.params.id
  this.fetchFindPoll(id_poll);
  this.fetchUpcoming();
}



  render(){
    console.log(this.state)
    const nameSet = this.state.name
    return(
      <div className="color-background">
        <Header/>

        <div className="form-title"> Edit Poll</div>
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
                placeholder={this.state.name}
                onChange={this._handleChangeEvent} />
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
                          <tr key={index} onClick={this._onSelectedRow.bind(this, index, config)}
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
              <AddCircleOutlineIcon className="icon-add"  />
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

      <div className="column is-6 margin-top">

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
            <label className="label display">Participants</label>
            <AddCircleOutlineIcon className="icon-add" />
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
                          <tr key={part.id}>
                            <td>{part.name}</td>
                            <CancelIcon className="icon-close"/>
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


      </div>{/* big container */}
      </div>
    )
}
}
