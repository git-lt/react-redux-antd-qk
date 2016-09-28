import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col} from 'antd';

import NavPath from '../../components/NavPath'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Actions from '../../store/actions'

import 'antd/dist/antd.less'
import './index.less'

@connect(
  state => ({...state}),
  dispatch =>  bindActionCreators( Actions, dispatch )
)

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    user: PropTypes.object,
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.getAllMenu(this.props.routing.locationBeforeTransitions.pathname);
  }

  render() {
    const user = this.props.user;

    return (
      <div className="ant-layout-aside">
        <Sidebar />
        <div className="ant-layout-main">
          <Header user={user} />
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}


export default App;
