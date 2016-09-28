 import Mock from 'mockjs'

export default ()=>Mock.mock({
    status:'@pick(["0", "1"])',
    errmsg:'@csentence(8)'
  })
