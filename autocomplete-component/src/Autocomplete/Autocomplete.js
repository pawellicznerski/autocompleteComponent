import React, { Component } from 'react';
import * as countries from './../countries.json';

export default class Autocomplete extends Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
    const randomId = Math.random().toString(16).substring(2);
    console.log(countries);
    return (
      <div>
        <input
          list={randomId}
          defaultValue={"dupa"}
        ></input>
        <datalist
          id={randomId}
        >{

        }
        </datalist>
      </div>
    )
  }
}
