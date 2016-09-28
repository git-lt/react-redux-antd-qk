import React, { PropTypes } from 'react'
import { Form, Input, Button, Row, Col, notification } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../../store/actions'
import './index.less'

const FormItem = Form.Item

@connect(
  state => ({...state.user}),
  dispatch => ({
    login: bindActionCreators(login, dispatch)
  })
)

class Login extends React.Component {

  constructor (props) {
    super(props)
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  static propTypes = {
    user: PropTypes.string,
    loading: PropTypes.bool,
    errmsg: PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
      const error = nextProps.errmsg;
      const isLoggingIn = nextProps.loading;
      const user = nextProps.user
      if (error != this.props.errmsg && error) {
          notification.error({
              message: 'Login Fail',
              description: error
          });
      }

      if (!isLoggingIn && !error && user)  {
          notification.success({
              message: 'Login Success',
              description: 'Welcome ' + user
          });
      }

      if (user) {
          this.context.router.replace('/news');
      }
  }

  handleSubmit (e) {
    e.preventDefault()
    const data = this.props.form.getFieldsValue()
    this.props.login(data.user, data.password);
  }

  render () {
    const { getFieldProps } = this.props.form
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
            <Input placeholder='admin' {...getFieldProps('user')} />
            </FormItem>
            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
            >
            <Input type='password' placeholder='123456' {...getFieldProps('password')} />
            </FormItem>
            <Row>
              <Col span='16' offset='6'>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

Login = Form.create()(Login);

export default Login
