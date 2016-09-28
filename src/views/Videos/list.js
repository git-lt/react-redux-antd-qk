import { Table, Row, Col, Alert, Button,Icon, Pagination, Radio } from 'antd';
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import helpers from '../../utils/helpers'

import { getVideosByType } from '../../store/actions'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const columns = [{
    title: '封面',
    dataIndex: 'gmtUpdate',
    key:'gmtUpdate',
    width:120,
    render: (text, record) => (
      <div>
        <div><img src={record.videoPic} width="180"/></div>
        <div>{ helpers.dateFormat(text, true) }</div>
      </div>
    )
  },{
    title: '标题',
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
    title: '讲师',
    dataIndex: 'teacher',
    key: 'teacher',
    width:50,
    render: text => <span>{text}</span>
  },{
    title: '时长(分钟)',
    dataIndex: 'duringTime',
    key: 'duringTime',
    width:100,
  },{
    title: '适合商家层级',
    dataIndex: 'supplierLevel',
    key: 'supplierLevel',
    width:150,
  },{
    title: '课程费用(元)',
    dataIndex: 'courseFee',
    key: 'courseFee',
    width:150,
    render: text => <span>{text||'免费'}</span>
  },{
    title: '操作',
    key: 'operation',
    style: 'textAlign:right',
    width:200,
    render: (text, record) => (
      <span>
        <a href="#">预览</a>
        <span className="ant-divider"></span>
        <a href="#">发布</a>
        <span className="ant-divider"></span>
        <a href="#">删除</a>
      </span>
    )
  }];

const types = [
  {
    name:'全部',
    id:''
  },
  {
    name:'新手商家-认知',
    id:'0'
  },
  {
    name:'新手商家-操作',
    id:'1'
  },
  {
    name:'进阶商家',
    id:'2'
  },
  {
    name:'关于导购',
    id:'3'
  }
];

@connect(
  state => ({...state.videos}),
  dispatch => ({
    getVideosByType: bindActionCreators(getVideosByType, dispatch)
  })
)

class VideosList extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      currentPage:1,
      pageSize:20,
      type:'',
    }
  }

  componentWillMount(){
    this.loadData(0, this.state.pageSize, '')
  }

  loadData(index=0, type){
    type = typeof type === 'undefined' ? this.state.type : type;
    this.props.getVideosByType(index, this.state.pageSize, type);
  }

  radioGroupChangeEv(e){
    this.setState({type: e.target.value+''});
    this.loadData(0, e.target.value);
  }

  paginationChangeEv(page){
    this.setState({currentPage: page})
    this.loadData((page-1)*this.state.pageSize);
  }

  render(){

    let btnGroup = types.map((item, index)=>{
      return <RadioButton value={item.id} key={index}>{item.name}</RadioButton>
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
          <Col span='12'>
            <RadioGroup value={this.state.type} onChange={this.radioGroupChangeEv.bind(this)}>
              {btnGroup}
            </RadioGroup>
          </Col>
          <Col span='12' style={{ textAlign: 'right' }}>
            <Button type="primary" >新建视频教程</Button>
          </Col>
        </Row>

        <Row type="flex" justify="space-between">
          <Col span='24'>
            <Table columns={columns}
              dataSource={this.props.list}
              loading={this.props.loading}
              rowKey={record => record.id}
              pagination={false}
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

export default VideosList
