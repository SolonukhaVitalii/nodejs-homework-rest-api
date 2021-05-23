const guard = require('./guard');
const passport = require('passport');
require('../config/passport');

describe('Unit test guard.js', () => {
  beforeEach(() => {
    mockResponse = () => {
      const response = {};
      response.status = jest.fn().mockReturnValue(response);
      response.json = jest.fn().mockReturnValue(response);
      response.sendStatus = jest.fn().mockReturnValue(response);
      response.clearCookie = jest.fn().mockReturnValue(response);
      response.cookie = jest.fn().mockReturnValue(response);
      return response;
    };
    req = {};
    res = mockResponse();
    next = jest.fn();
  });
  it('run function', async done => {
    passport.authenticate = jest.fn((authType, options, callback) => () => {
      callback('This is an error', null);
    });
    await guard(req, res, next);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    done();
  });
});