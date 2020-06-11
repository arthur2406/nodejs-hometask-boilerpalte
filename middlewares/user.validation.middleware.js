const { user } = require('../models/user');
const { validate } = require('./helpers.validation');

const passwordIsValid = ({ password }) => {
  const incorrectLength = password.length < 3;
  const passwordIncluded = password.toLowerCase().includes('password');
  if (incorrectLength || passwordIncluded) {

    return false;
  }
  return true;

};

const emailIsValid = ({ email }) => {
  const re = /^[\w.+\-]+@gmail\.com$/;
  return re.test(email);
}

const phoneNumberIsValid = ({ phoneNumber }) => {
  const re = /^\+?3?8?(0\d{9})$/;
  return re.test(phoneNumber);
}

const hasRequiredFields = body => {
  let hasRequiredFields = true;
  
  for (const prop in user) {
    if (body.hasOwnProperty(prop) && prop !== 'id') {
      hasRequiredFields = true;
    } else {
      hasRequiredFields = false;
    }
  }

  if (body.hasOwnProperty('id')) hasRequiredFields = false;

  if (Object.entries(body).length !== (Object.entries(user).length - 1)) hasRequiredFields = false;
 

  return hasRequiredFields;
}

const userValid = (req, res, next) => {
  const validations = new Map([
    [hasRequiredFields, 'Incorrect amount of fields for user'],
    [emailIsValid, 'Not valid email. Use only gmail.com'],
    [phoneNumberIsValid, 'Not valid phone number. It should be in \'+380xxxxxxxxx\' format'],
    [passwordIsValid, 'Not valid password. It should contain at least 3 characters and not contain \'password\'.']
  ]);
   
  validate(validations, req, res, next);
}


exports.userValid = userValid;
