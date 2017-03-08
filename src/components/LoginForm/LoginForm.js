import React from 'React';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './LoginForm.css'
const FormItem = Form.Item;

export default class LoginForm extends React.Component {

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
        <FormItem>
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
        </FormItem>
        <FormItem>
            <Checkbox>Remember me</Checkbox>
          <a className={styles['login-form-forgot']}>Forgot password</a>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
