import moment from 'moment'

const TAGS = ['资讯','案例','活动'];


var helpers = {
  dateFormat: (date, noTime)=>{
    var reg = noTime ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
    return date ? moment(date).format(reg) : '';
  },
  trancate: (str, len)=>{
    var strLen = str.replace(/[^\x00-\xff]/g,"**").length/2;
    if(!str || strLen < len) return str;
    return str.substring(0, strLen)+'...';
  },
  getNewsTag: tag =>{
    return TAGS[Number(tag)] || '';
  }
}
export default helpers
