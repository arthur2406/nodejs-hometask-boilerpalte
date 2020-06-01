const { fighter } = require('../models/fighter');
const { valid } = require('./helpers.validation');

const hasRequiredFields = body => {
  let hasRequiredFields = true;

  for (const prop in fighter) {
    if (body.hasOwnProperty(prop) && prop !== 'id') {
      hasRequiredFields = true;
    } else {
      hasRequiredFields = false;
    }
  }

  if (body.hasOwnProperty('id')) hasRequiredFields = false;

  if (Object.entries(body).length !== (Object.entries(fighter).length - 1)) hasRequiredFields = false;

  return hasRequiredFields;
}

const powerIsValid = ({ power }) => {
  if (power > 0 && power <= 100) return true;
  return false;
}

const defenseIsValid = ({ defense }) => {
  if (defense > 0 && defense <= 10) return true;
  return false;
}

const fighterValid = (req, res, next) => {
  const validations = new Map([
    [hasRequiredFields, 'Incorrect amount of fields for fighter'],
    [powerIsValid, 'Power should be between 1 and 100'],
    [defenseIsValid, 'Defense should be between 1 and 10']
  ]);
  if (valid(validations, req, res)) next();
}




exports.fighterValid = fighterValid;