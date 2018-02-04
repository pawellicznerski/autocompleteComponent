import React, { Component} from 'react';
import  countries from './../countries.json';

export default class Autocomplete extends Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
      countries:countries,
    }
  }
  handleInputChange =(e)=>{
    e.preventDefault();
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
    const name = target.name;
    // e.pattern = `[\\w\\s+#]{${value.length}}`;

    let filteredOptions = [];

    for (let i = 0;i<countries.length;i++) { // this is the idea of creating div//
        const item = countries[i];
        console.log(item.name,value, item.name.indexOf(value));
        if (item.name.indexOf(value) == 0) {
            filteredOptions.push({
                name: item.name,
                code: item.code
            });
        } else if (item.code.indexOf(value) == 0) {
            filteredOptions.push({
                name: item.name,
                code: item.code
            });
        }
    }

    this.setState({
       [name]: value,
       countries: filteredOptions,
     });
  } //end of handleInputChange

  handleOnFocus(){
    this.setState({
       countries: countries,
     });
  }
  handleOnBlur(){
    this.setState({
       countries: countries,
       inputValue:''
     });
   }
 //  document.querySelector("#inputValue")
 // .oninput = function() {
 //   this.pattern = `[//w//s+#]{${this.value.length}}`;
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
        <p>{this.state.inputValue}</p>
      </div>
    )
  }
}
