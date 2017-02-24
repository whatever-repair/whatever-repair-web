import React from 'react';
import ContactConfirm from '../components/ContactConfirm/ContactConfirm'
import ContactInfo from '../components/ContactInfo/ContactInfo'

export default class Admin extends React.Component {
  render() {
    return (
      <div>
        <ContactInfo></ContactInfo>
        <ContactConfirm></ContactConfirm>
      </div>
    );
  };
}
