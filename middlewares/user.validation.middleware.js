const { user } = require('../models/user');

const BAD_REQUEST_STATUS = 400;

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation

    //check for existing required properties 
    if (!hasRequiredFields(req.body)) {
        res.status = BAD_REQUEST_STATUS;
        throw new Error({ error: true,  message: 'Not enough data to create user'});
    }

    //check for validity of fields
    if (!emailIsValid(req.body.email)) {
        res.status = BAD_REQUEST_STATUS;
        throw new Error({ error: true,  message: 'Not valid email. Use only gmail.com'});
    }

    if (!phoneNumberIsValid(req.body.phoneNumber)) {
        res.status = BAD_REQUEST_STATUS;
        throw new Error({ error: true,  message: 'Not valid phone number. It should be in \'+380xxxxxxxxx\' format'});
    }
    
    if (!passwordIsvalid(req.body.password)) {
        res.status = BAD_REQUEST_STATUS;
        throw new Error({ error: true, message: 'Not valid password. It should contain at least 3 characters and not contain \'password\'.'});
    }
    
    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

const passwordIsValid = password => {
    const incorrectLength = password.length < 3;
    const passwordIncluded = password.toLowerCase().includes('password');     
    if (incorrectLength || passwordIncluded ) {
        return false;
    }
    return true;
};

const emailIsValid = email => {
    const re = /^[\w.+\-]+@gmail\.com$/;
    return re.test(email);
}

const phoneNumberIsValid = number => {
    const re = /^\+?3?8?(0\d{9})$/;
    return re.test(number);
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
    return hasRequiredFields;
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;