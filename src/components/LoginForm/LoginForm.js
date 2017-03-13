import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './LoginForm.css';
const FormItem = Form.Item;

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user
}) => (
  <Form action="/" className={styles['login-form']} onSubmit={onSubmit}>
    {errors.summary && <p className="error-message">{errors.summary}</p>}
    <FormItem>
        <Input 
          prefix={<Icon type="user" 
          style={{ fontSize: 13 }} />} 
          type="text"
          placeholder="Username" 
          name="name"
          onChange={onChange}
          value={user.name}
        />
    </FormItem>
    <FormItem>
        <Input 
          prefix={<Icon type="lock" 
          style={{ fontSize: 13 }} />} 
          type="password" 
          placeholder="Password" 
          name="password"
          onChange={onChange}
          value={user.password}
        />
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

export default LoginForm;
