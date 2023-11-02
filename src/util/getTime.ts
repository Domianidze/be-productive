import moment from 'moment';

const getTime = (date: Date) => {
  return moment(date).format('HH:mm');
};

export default getTime;
