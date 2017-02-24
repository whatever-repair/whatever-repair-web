import React from 'react';
import Header from '../components/Header/Header'
import styles from './App.css';


export default class App extends React.Component {
  render() {
    return (
      <div>
      <Header></Header>
      {this.props.children}
      <div className={styles.container}>
        <h1>뭐든지 수리</h1>
      </div>
      </div>
    );
  };
}
