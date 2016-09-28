import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'

import Actions from '../../store/actions'

const SubMenu = Menu.SubMenu

import './index.less'

@connect(
  state => ({...state.menu}),
  dispatch => bindActionCreators(Actions, dispatch)
)

class Sidebar extends React.Component {
  constructor (props) {
      super(props);
  }

  handleClick (e) {
    let key = e.key;
    if(key.indexOf('sub') > -1) return;
    this.props.updateNavPath(e.item.props.path);
  }

  render () {
    const { items, open } = this.props;
    let childItems;
    const menu = items.map((item) => {
      // 多级菜单
      if(item.child && item.child.length){

        childItems = item.child.map((node) => {
          return (
            <Menu.Item key={node.key} path={node.path}>
              <Link to={node.path} >{node.name}</Link>
            </Menu.Item>
          )
        })

        return (
          <SubMenu
            key={'sub-'+item.key}
            title={<span><Icon type={item.icon} />{item.name}</span>}
          >
            {childItems}
          </SubMenu>
        )
      }else{ //一级菜单
        return (
          <Menu.Item key={item.key} path={item.path}>
            <Link to={item.path} ><Icon type={item.icon} />{item.name}</Link>
          </Menu.Item>
        )
      }
    });

    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">
          <img src="//static.qiakr.com/logo_512x512.png?imageView2/1/w/160/h/160" width="80" />
        </div>
        <Menu
          mode="inline" theme="dark" selectedKeys={[open]}
          onClick={this.handleClick.bind(this)}
        >
          {menu}
        </Menu>
      </aside>
    )
  }
}


export default Sidebar
