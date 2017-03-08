import React from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
import axios from 'axios'

export default class ConfirmCheckBox extends React.Component {
  state = {
    value: this.props.status
  }

  onChange = (e) => {
    var putdata = {
      id : this.props.name,
      value : e.target.value
    }
    console.log('putdata::::',putdata)
    
    axios.put('/api/order', putdata)
         .then(putdata => {
          console.log('putdata', putdata)
         })
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value
    })

  }
  render() {
    return (
      <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value={0}>검토중</Radio>
        <Radio value={1}>수리완료</Radio>
      </RadioGroup>
    );
  }
}
