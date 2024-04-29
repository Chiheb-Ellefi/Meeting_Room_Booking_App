const moment = require("moment");

const formatTime = ({ time, date }) => {
  return {
    time: moment(time, "hh:mm").format("HH:mm"),
    date: moment(date).format("YYYY-MM-DD"),
  };
};
module.exports = formatTime;
