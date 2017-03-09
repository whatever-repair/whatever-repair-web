import React from 'react';
import { Steps, Button, message, Icon} from 'antd';
const Step = Steps.Step;

const steps = [{
  title: '수리종류',
  content: 'First-content',
  }, 
  {
  title: '수리날짜',
  content: 'Second-content'
  }, 
  {
  title: '주소입력',
  content: 'Last-content',
  },
  {
  title: '사진첨부',
  content: 'Last-content',
  },
  {
  title: '개인정보',
  content: 'Last-content',
}];

export default class Repair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}
