import React, { Component} from 'react';
import  countries from './../countries.json';
import _ from "lodash";

export default class Autocomplete extends Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
      inputValueCode:"",
      countries:countries,
    }
  }

  handleInputChange =(e)=>{
    e.preventDefault();
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
    const name = target.name;
    const inputValueCode = _.find(countries, el=> el.name===name? el.code:null);
    console.log("inputValueCode",e.target);
    this.setState({
       [name]: value,
       inputValueCode:inputValueCode
      //  countries: filteredOptions,
     });

     if(value){
       this.setDatalist(value);
     }
     console.log(this.state.inputValue);
  } //end of handleInputChange

  setDatalist(value){
    let filteredOptions = [];
    for (let i = 0;i<countries.length;i++) { // this is the idea of creating div//
        const item = countries[i];
        const valueIgnoreCase = value.toLowerCase();
        const nameIgnoreCase = item.name.toLowerCase();
        const codeIgnoreCase = item.code.toLowerCase();
        if (nameIgnoreCase.indexOf(valueIgnoreCase) == 0) {
            filteredOptions.push({
                name: item.name,
                code: item.code
            });
        } else if (codeIgnoreCase.indexOf(valueIgnoreCase) == 0) {
            filteredOptions.push({
                name: item.name,
                code: item.code
            });
        }
    }
    this.setState({
       countries: filteredOptions,
     });
  }

  handleOnFocus(){
    this.setState({
       countries: countries,
     });
  }
  handleOnBlur(){
    console.log(this.state.inputValue);
    const leaveValue = _.find(countries, el=> el.name===this.state.inputValue);
    console.log(leaveValue);
    if(leaveValue){
      this.setState({
         countries: countries,
       });
     }else{
       this.setState({
          countries: countries,
          inputValue:''
        });
     }

   }

  render(){

    return (
      <div>
        <input
          id="inputValue"
          list="countries"
          name='inputValue'
          value={this.state.inputValue}
          onChange={this.handleInputChange.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
        ></input>
        <datalist id='countries'>
          {
            this.state.countries.map((item, index)=>{
              return <option value={item.name} key={index}>({item.code})</option>
            })
          }
        </datalist>
      </div>
    )
  }
}
