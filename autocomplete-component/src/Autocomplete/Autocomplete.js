import React, { Component} from 'react';
import  countries from './../countries.json';
import _ from "lodash";
import classNames from 'classnames/bind';

export default class Autocomplete extends Component{
  constructor(props){
    super(props);
    this.state={
      inputValue:"",
      countries:countries,
      showDatalist:false
    }
  }

  handleInputChange =(e)=>{
    e.preventDefault();
    const target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
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
    console.log("blur");
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

   handleKeyPress(e){
     if(e.keyCode == 9 || e.key=="Enter" ){
       const fullValue =this.state.countries[0].name +" ("+ this.state.countries[0].code+")";
       this.setDatalist(this.state.inputValue);
       this.setState({
         inputValue:fullValue,
       })
     }
   }

  render(){
    const  { inputValue } = this.state;
    const  { countries } = this.state;
    return (
      <div
        className={classNames({
          'autocomplete':true,
        })}
        className="autocomplete">
        <input
          className={classNames({
            'autocomplete__input':true,
            'autocomplete__input_focused':this.state.showDatalist,
          })}
          id="inputValue"
          name='inputValue'
          value={this.state.inputValue}
          onChange={this.handleInputChange.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onFocus={this.handleOnFocus.bind(this)}
          onKeyDown={this.handleKeyPress.bind(this)}
        ></input>
        <div
          className={classNames({
            'autocomplete__datalist':true,
            'autocomplete__datalist_show':this.state.showDatalist,
          })}>
          {
            countries.map((item, index)=>{ return (
              <div
                className={classNames({
                  'autocomplete__datalist__item':true,
                })}
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
