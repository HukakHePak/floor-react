import './App.css';
import React from 'react';

const URL = 'https://api.genderize.io';

function NameField(props) {
  return (
    <input type="text" placeholder="Name..." onInput={ event => {
      props.onInput(event.target.value);
    }}></input>
  )
}

function SubmitButton(props) {
  return (
    <input type="submit" onClick={ props.onClick }></input>
  )
}

function ResultLine(props) {
  return (
    <span className="floor__result">{ props.result }</span>
  )
}

async function getFloor(name) {
  return fetch(`${URL}?name=${name}`).then(response => response.json());
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: props.name,
      floor: props.floor
     };
  }

  render() {
    return (
      <div className="App">
          <NameField onInput={ name => this.setState({ name })}/>

          <SubmitButton onClick={ async () => { 
            const floor = (await getFloor(this.state.name))?.gender;

            this.setState({ floor });
          }}/>

        <ResultLine result={ this.state.floor || "" }/>
      </div>
    );
  }
}

export default App;

