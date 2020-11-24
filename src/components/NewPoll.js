import React, {Component} from "react";

export default class PanelPoll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      start:'',
      end:'',
      configurationUI : [],
      authority: [],
      questions: [''],
      active: false
    }
  }
  state = { config: [] , error: null , redirect: false }

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

  handleSubmit = () => {
    this.setState({ redirect:  true})
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
        <div className="control">
      {this.state.questions.map((question, index) => (
        <span key={index}>
          <input className="input-questions"
            type="text"
            onChange={this.handleText(index)}
            value={question}
          />
        <button className="button is-danger is-light" onClick={this.handleDelete(index)}>X</button>
        </span>
      ))}
      <button className="button is-link is-light" onClick={this.addQuestion}>Add</button>
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

</div>{/* big container */}
</div>
);
}
}
