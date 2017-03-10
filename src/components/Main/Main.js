import React from 'react';
import styles from './Main.css';

export default class Main extends React.Component {

  render() {
    return (
     <div className={styles.main}>
       <p className={styles.maintext}><b>뭐든지수리</b>에서 쉽고 빠르게 <br/>수리견적을 문의해보세요</p>
     </div>
    )
  }
}
