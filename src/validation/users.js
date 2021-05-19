  
const Joi = require('joi');
const { httpCodes } = require('../helpers/code-constans');

const schemaRegistrationUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),

  password: Joi.string().alphanum().min(6).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru'] },
    })
    .required(),

  password: Joi.string().alphanum().min(6).required(),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.any().valid('starter', 'pro', 'business').required(),
});

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

const validateRegistrationUser = (req, res, next) => {
  return validate(schemaRegistrationUser, req.body, next);
};

const validateLoginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};

const validateSubscriptionUpdate = (req, res, next) => {
  return validate(subscriptionUpdateSchema, req.body, next);
};

module.exports = {
  validateRegistrationUser,
  validateLoginUser,
  validateSubscriptionUpdate,
};