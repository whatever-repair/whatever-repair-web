import React from 'react';

export default class ContactConfirm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirm : true
    }
  }

  render(){
    return (
      <div>
      <form>
        <label>검토중<input name="confirm" value="Confirm" type="radio" checked/></label>
        <label>진행중<input name="progress" value="Progress" type="radio" /></label>
        <label>완료<input name="complete" value="complete" type="radio" /></label>
        <input type ="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
