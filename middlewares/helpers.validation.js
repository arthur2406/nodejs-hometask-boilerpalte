const BAD_REQUEST_STATUS = 400;


const valid = (validations, req, res) => {
  let valid = true;
  validations.forEach((message, validation) => {
    if (!validation(req.body) && valid) {
      valid = false;
      res.status = BAD_REQUEST_STATUS;
      res.send({ error: true, message });
    }
  });
  return valid;
};


module.exports = {
  valid,
}