const { user } = require('../models/user');

const BAD_REQUEST_STATUS = 400;

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    validations.forEach((message, validation) => {
        if (!validation(req.body)) {
            valid = false;
            res.status = BAD_REQUEST_STATUS;
            res.send({ error: true, message });
        }
    });

    next();

}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

const passwordIsValid = ({ password }) => {
    const incorrectLength = password.length < 3;
    const passwordIncluded = password.toLowerCase().includes('password');     
    if (incorrectLength || passwordIncluded ) {
        
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
    return hasRequiredFields;
}


const validations = new Map([
    [hasRequiredFields, 'Not enough data to create user'],
    [emailIsValid, 'Not valid email. Use only gmail.com'],
    [phoneNumberIsValid, 'Not valid phone number. It should be in \'+380xxxxxxxxx\' format'],
    [passwordIsValid, 'Not valid password. It should contain at least 3 characters and not contain \'password\'.']
]);


exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;