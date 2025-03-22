import moment from 'moment';

moment.locale('vi');

export function formatDate(date, type = 'short') {
  const momentDate = moment(date);
  switch (type) {
    case 'short':
      return momentDate.format('DD/MM/YYYY');
    case 'long':
      return momentDate.format('DD/MM/YYYY HH:mm:ss');
    default:
      throw Error(`Type of format Date with \"${type}\" not found`);
  }
}
