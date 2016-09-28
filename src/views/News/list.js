import { Table, Row, Col, Alert, Button,Icon, Pagination, Radio } from 'antd';
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import helpers from '../../utils/helpers'

import Action from '../../store/actions'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const tags = [
  {
    tag:'全部',
    id:''
  },
  {
    tag:'资讯',
    id:'0'
  },
  {
    tag:'案例',
    id:'1'
  },
  {
    tag:'活动',
    id:'2'
  }
];

@connect(
  state => ({...state.news}),
  dispatch => bindActionCreators(Action, dispatch)
)

class NewsList extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      currentPage:1,
      pageSize:20,
      tag:'',
    }
  }

  componentWillMount(){
    this.loadData(0, this.state.pageSize, '')
  }

  loadData(index=0, tag){
    tag = typeof tag === 'undefined' ? this.state.tag : tag;
    this.props.getNewsByTag(index, this.state.pageSize, tag);
  }

  radioGroupChangeEv(e){
    this.setState({tag: e.target.value+''});
    this.loadData(0, e.target.value);
  }
  paginationChangeEv(page){
    this.setState({currentPage: page})
    this.loadData((page-1)*this.state.pageSize);
  }

  render(){
    const rowSelection = {
      onChange(selectedRowKeys, selectedRows) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };
    const {delNewsById, updateNewsStatus} = this.props;

    const columns = [{
        title: '主图',
        dataIndex: 'gmtUpdate',
        key:'gmtUpdate',
        width:120,
        render: (text, record) => (
          <div>
            <div><img src={record.thumb} width="180"/></div>
            <div>{ helpers.dateFormat(text, true) }</div>
          </div>
        )
      },{
        title: '标题与摘要',
        dataIndex: 'title',
        width:200,
        key:'title',
        render:(text, record)=>(
          <div>
            <h4><a href="#" title={text}>{helpers.trancate(text, 18)}</a></h4>
            <div>{ helpers.trancate(record.summary, 50) }</div>
          </div>
        )
      },{
        title: '浏览量',
        dataIndex: 'pv',
        key: 'pv',
        width:50,
        render: text => <span>{text}</span>
      },{
        title: '类型',
        dataIndex: 'tag',
        key: 'tag',
        width:150,
        render: text => <span>{helpers.getNewsTag(text)}</span>
      },{
        title: '操作',
        key: 'operation',
        style: 'textAlign:right',
        width:200,
        render: (text, record) => (
          <span>
            <a href="javascript:;">预览</a>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={updateNewsStatus.bind(this, record.id, 1)}>发布</a>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={delNewsById.bind(this, record.id)}>删除</a>
          </span>
        )
      }];

    let btnGroup = tags.map((item, index)=>{
      return <RadioButton value={item.id} key={index}>{item.tag}</RadioButton>
    })

    return (
      <div>
        <Alert
          message="帮助说明"
          description="编辑保存之后需要点击“发布”才会在首页展示，点击“隐藏”在首页不展示，删除后不可恢复，请谨慎操作"
          type="info"
          showIcon
        />

        <Row type="flex" style={{ marginBottom: 16, marginTop:16 }}>
          <Col span='8'>
            <RadioGroup defaultValue={this.state.tag} onChange={this.radioGroupChangeEv.bind(this)}>
              {btnGroup}
            </RadioGroup>
          </Col>
          <Col span='8' offset='8' style={{ textAlign: 'right' }}>
            <Button type="primary" >新建新闻动态</Button>
          </Col>
        </Row>

        <Row type="flex" justify="space-between">
          <Col span='24'>
            <Table columns={columns}
              dataSource={this.props.list}
              loading={this.props.loading}
              rowKey={record => record.id}
              pagination={false}
              rowSelection={rowSelection}
            />
          </Col>
        </Row>

        <Row type="flex" justify="end" style={{marginTop:20}}>
          <Col span='24'>
            <Pagination
              total={this.props.count}
              showTotal={total => `共 ${total} 条`}
              pageSize={this.state.pageSize}
              current={this.state.currentPage}
              onChange={this.paginationChangeEv.bind(this)}
            />
          </Col>
        </Row>

      </div>
    );
  }
}

export default NewsList
