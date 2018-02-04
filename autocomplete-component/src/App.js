import React, { Component } from 'react';
import './App.css';
import Autocomplete from './Autocomplete/Autocomplete.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Autocomplete></Autocomplete>
      </div>
    );
  }
}

export default App;
