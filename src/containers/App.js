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
        <div>
          <a href="/dbtest.html" target="_blank">db 테스트 페이지입니다. 다음 머지 때 지우고 작업하세요.</a><br /><br />
          나중에 작업 하실 때 /public/dbtest.html 파일 보시고 name값 참고하셔서 db에 폼 데이터 보내시면 됩니다.
        </div>
      </div>
      </div>
    );
  };
}
