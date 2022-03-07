import './App.css';
import React from 'react';
import { brokeNodes } from './magic';

const URL = 'https://api.genderize.io';

async function getFloor(name) {
  if(!name) return null;
   
  return fetch(`${URL}?name=${name}`).then(response => response.json());
}

function NameStream(props) {
  return (
    <input type="text" 
      placeholder={ props.placeholder } 
      onInput={ props.onInput }
      onClick={ event => event.target.value = "" }
    ></input>
  )
}

function MagicButton(props) {
  return (
    <input type="submit" 
      onClick={ props.onClick } 
      value={ props.value ?? "Magic" }>
    </input>
  )
}

function FloorLine(props) {
  const smaller = props.content?.length < 10 ? '' : ' small';

  return (
    <span className={ 'floor__line ' + smaller }>
      { props.content }
    </span>
  )
}

class FloorForm extends React.Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.defautFloor = props.defautFloor || '';

    this.state = { floor: this.defautFloor };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleInput(event) {
    const name =  event.target.value;

    getFloor(name).then( response => 
      this.setState({ 
        name,
        floor: response?.gender || this.defautFloor
      })) 
    .catch(console.error);
  }

  handleSubmit(event) {
    brokeNodes(document.querySelectorAll(`[name="${ this.name }"] > *`));
    event.preventDefault();
  }

  render() {
    return (
      <form name={ this.name } onSubmit={ this.handleSubmit }>
        <NameStream placeholder="Name..."onInput={ this.handleInput } />
        <MagicButton />
        <FloorLine content={ this.state.floor } />
      </form>
    );
  }
}

function App() {
    return (
      <div className="App" >
        <FloorForm name="floor" defautFloor="WHO IS THAT POKEMON!?" />
      </div>
    );
}

export default App;