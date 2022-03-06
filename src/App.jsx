import './App.css';
import React from 'react';
import { brokeNodes } from './magic';

const URL = 'https://api.genderize.io';

function NameField(props) {
  return (
    <input type="text" placeholder="Name..." onInput={ event => {
        props.onInput(event.target.value);
      }}
      onClick={ event => {
        event.target.value = "";
      }}
    ></input>
  )
}

function SubmitButton(props) {
  return (
    <input type="submit" onClick={ props.onClick } value="Magic"></input>
  )
}

function ResultLine(props) {
  const smallClass = props.result ? '' : ' small';

  return (
    <span className={ 'floor__result ' + smallClass }>{ props.result  || "WHAT IS THAT POKEMON??" }</span>
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
          <NameField onInput={ async name => 
              this.setState({ 
                floor: (await getFloor(name))?.gender 
              }) 
          }/>

          <SubmitButton onClick={ () => { 
            brokeNodes(document.querySelectorAll('.App > *'));
          }}/>

          <ResultLine result={ this.state.floor }/>
      </div>
    );
  }
}

export default App;

