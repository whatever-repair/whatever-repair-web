import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import injectTapEventPlugin from 'react-tap-event-plugin'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import axios from 'axios'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
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
    var count = 0;

    axios.get('/api/order')
         .then(data => {
          console.log('data:::', data )
          this.setState({
            orders : data.data
          })
         })
         .catch(err => {
          console.log('err:::', err)
         })
  }
  render() {

    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
    {this.state.orders.map((order, i) => (
      <Card key={i}>
      <CardHeader 
        title={order.private.username}
        subtitle={order.private.address}
        avatar={order.img}
      />
      <CardMedia>
        <img src={order.message} />
      </CardMedia>
      <CardTitle title= {'수리종류: ' + order.repairType} />
      <CardText>
      수리요청 날짜 : {order.reqDate}<br/>
      수리 내용 : {order.message}
      </CardText>
      <CardActions>
        <RadioButtonGroup name="confirm" defaultSelected="light">
      <RadioButton
        value="light"
        label="검토중"
        style={styles.radioButton}
        
      />
      <RadioButton
        value="not_light"
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
