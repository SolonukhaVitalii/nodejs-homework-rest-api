const Joi = require('joi');
const { httpCodes } = require('../helpers/code');

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(8).max(13).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),

  phone: Joi.string().min(8).max(13).optional(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .optional(),
}).required();

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;

    return next({
      status: httpCodes.BAD_REQUEST,
      message: `Field ${message.replace(/"/g, '')}`,
      data: 'Bad Request',
    });
  }
  next();
};

const validateCreateContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};

const validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports = {
  validateCreateContact,
  validateUpdateContact,
};