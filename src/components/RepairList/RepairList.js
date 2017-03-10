import React from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [{
  title: '이름',
  dataIndex: 'username',
  sorter: true,
  render: 'name',
  }, 
  {
  title: '연락처',
  dataIndex: 'email', }, 
  {
  title: '요청내용',
  dataIndex: 'email',},
  {
  title: '주소',
  dataIndex: 'email',},
  {
  title: '수리상태',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  },
  {
  title: 'Email',
  dataIndex: 'email',
}];

export default class RepairList extends React.Component {
  constructor(props){
  super(props)
    this.state = {
      orders : [],
      pagination: {},
      loading: false,
    }
  }

  componentWillMount(){
    axios.get('/api/order')
         .then(data => {
          if(data){
            data.data.sort((a, b) => a['created_time'] < b['created_time']);
          }
          this.setState({
            orders : data.data,
          })
         })
         .catch(err => {
          console.log('err:::', err)
         })
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.registered}
        dataSource={this.state.orders}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}
