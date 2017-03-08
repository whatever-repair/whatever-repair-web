import React, {Component} from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import axios from 'axios'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding : 30
  },
  card : {
    margin : 30
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class ContactConfirm extends Component {
  constructor(props){
    super(props)
    this.state = {
      orders : [],
      ids : []
    }
  }

  componentWillMount(){
    axios.get('/api/order')
         .then(data => {
          if(data){
            data.data.sort((a, b) => a['created_time'] < b['created_time']);
          }
          this.setState({
            orders : data.data
          })
         })
         .catch(err => {
          console.log('err:::', err)
         })
  }

  handleClick(e){
    var putdata = {
      id : e.target.name,
      value : e.target.value
    }
    axios.put('/api/order', putdata)
         .then(putdata => {
          console.log('putdata', putdata)
         })

  }

  render() {

    return (
    <MuiThemeProvider muiTheme={muiTheme}>

      <div style={styles.container}>
    {this.state.orders.map((order, i) => (
      <Card key={i} style={styles.card}>
      <CardHeader 
        title={order.private.username}
        subtitle={order.private.address}
        avatar={order.img}
      />
      <CardMedia>
         <img src={'/uploads/' + order.image1 } />
      </CardMedia>
      <CardTitle title= {'수리종류: ' + order.repairType} />
      <CardText>
      수리요청 날짜 : {order.reqDate}<br/>
      수리 내용 : {order.message}<br />
      연락처 : {order.private.phone}
      </CardText>
      <CardActions>
      <RadioButtonGroup name={order._id} defaultSelected={order.status.toString()} onChange={this.handleClick.bind(this)} >
        <RadioButton 
          value="0"
          label="검토중"
          style={styles.radioButton}
          
        />
        <RadioButton
          name ={order._id}
          value="1"
          label="수리완료"
          style={styles.radioButton}
          
        />       
      </RadioButtonGroup>
      </CardActions>
    </Card>
    ))}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default ContactConfirm;
