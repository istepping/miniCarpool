const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function toData(timestamp, format) {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  　　let returnArr = [];
  　　let date = new Date(timestamp);
  　　let year = date.getFullYear()
  　　let month = date.getMonth() + 1
  　　let day = date.getDate()
  　　let hour = date.getHours()
  　　let minute = date.getMinutes()
  　　let second = date.getSeconds()
  　　returnArr.push(year, month, day, hour, minute, second);
  　　returnArr = returnArr.map(formatNumber);
  　　for (var i in returnArr) {
    　　format = format.replace(formateArr[i], returnArr[i]);
  }
  　　return format;
}
module.exports = {
  formatTime: formatTime,
  toData: toData
}
