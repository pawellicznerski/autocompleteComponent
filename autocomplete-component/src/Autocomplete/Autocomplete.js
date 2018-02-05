import React, { Component} from 'react';
import  countries from './../countries.json';
import _ from "lodash";
import classNames from 'classnames/bind';

export default class Autocomplete extends Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
      inputValueCode:"",
      countries:countries,
      showDatalist:false
    }
  }

  handleInputChange =(e)=>{
    e.preventDefault();
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log("inputValueCode",e.target);
    this.setState({
       [name]: value,
     });
     if(value){
       this.setDatalist(value);
     }else{
       this.setState({countries: countries});
      }
    //  console.log(this.state.inputValue);
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
       showDatalist:true
     });
  }
  handleOnBlur(){
    const res = this.state.inputValue.slice(0,-5);
    console.log("country",res);
    const leaveValue = _.find(countries, el=> el.name===res)?true:_.find(countries, el=> el.name===this.state.inputValue.replace(/\s+$/, ''));
    console.log("leaveValue:",leaveValue);
    if(leaveValue){
      this.setState({
         countries: countries,
         showDatalist:false
       });
     }else{
       this.setState({
          countries: countries,
          inputValue:'',
          showDatalist:false
        });
     }

   }

   handleClick(name){
     this.setState({
       inputValue:name,
     })

   }

  render(){
    const  { inputValue } = this.state;
    const  { countries } = this.state;
    return (
      <div>
        <input
          id="inputValue"
          name='inputValue'
          value={this.state.inputValue}
          onChange={this.handleInputChange.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
        ></input>
        <div>
          {
            countries.map((item, index)=>{ return (
              <div
                key={index}
                onMouseDown={()=>this.handleClick(item.name+' '+'('+`${item.code}`+')')}>
                {item.name+' '+'('+`${item.code}`+')'}
              </div>)
            })
          }
        </div>
      </div>
    )
  }
}
