import './App.css';
import React from 'react';
import { brokeNodes } from './magic';

const URL = 'https://api.genderize.io';

function NameStream(props) {
  return (
    <input type="text" 
      placeholder={ props.placeholder } 
      onInput={ event => props.onInput(event.target.value) }
      onClick={ event => event.target.value = "" }
      onKeyDown={ props.onKeyDown }
    ></input>
  )
}

function MagicButton(props) {
  return (
    <input type="submit" 
      onClick={ props.onClick } 
      value={ props.value || "Magic" }>
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

async function getFloor(name) {
  if(!name) return null;
   
  return fetch(`${URL}?name=${name}`).then(response => response.json());
}

function brokeFloor() {
  brokeNodes(document.querySelectorAll('.App > *'));
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
    let floorContent = "WHO IS THAT POKEMON!?";

    if(this.state.name?.length > 2) floorContent = this.state.floor;

    return (
      <div className="App" >

        <NameStream 
          placeholder="Name..."

          onKeyDown={ event => {
            if(event.code === 'Enter') 
              brokeFloor();
          }} 

          onInput={ async name => 
            this.setState({ 
              name: name,
              floor: (await getFloor(name))?.gender 
            })
        }/>

        <MagicButton 
          onClick={ brokeFloor }
        />

        <FloorLine content={ floorContent }/>
      </div>
    );
  }
}

export default App;