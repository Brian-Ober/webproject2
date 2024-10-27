const validator = require('../helpers/validate');

const saveCharacter = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    age: 'required|string',
    nickname: 'string',
    birthday: 'required|string',
    rank: 'required|string',
    hometown: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCharacter
};