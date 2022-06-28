class Patient{
    id = '0001'
    name = ''
    sex = '男'
    age = '18'
    info = '无不良反应'
    caseList = []
}

class Case{
    time = dateToString(new Date())
    hospital = '广中医'
    result = '健康'
}

function pad(number) {
    if ( number < 10 ) {
      return '0' + number;
    }
    return number;
  }

function dateToString(date) {
    return date.getUTCFullYear() +
      '-' + pad( date.getUTCMonth() + 1 ) +
      '-' + pad( date.getUTCDate() ) +
      ' ' + pad( date.getUTCHours() ) +
      ':' + pad( date.getUTCMinutes() ) +
      ':' + pad( date.getUTCSeconds() )
  };

export {Patient, Case}