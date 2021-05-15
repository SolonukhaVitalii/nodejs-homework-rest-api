const { httpCodes } = require('../helpers/code-constans');
const { UserServices } = require('../services/users');
const { AuthServices } = require('../services/auth');

const authServices = new AuthServices();
const usersServices = new UserServices();

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usersServices.findByEmail(email);
  if (user) {
    return next({
      status: httpCodes.CONFLICT,
      data: 'Conflict',
      message: 'This email is already use',
    });
  }

  try {
    const newUser = await usersServices.create({ email, password });

    return res.status(httpCodes.CREATED).json({
      status: 'success',
      code: httpCodes.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await authServices.login({ email, password });

    if (response) {
      return res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          ...response,
        },
      });
    }

    next({
      status: httpCodes.UNAUTHORIZED,
      message: 'Email or password is wrong',
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await authServices.logout(userId);

    return res
      .status(httpCodes.NO_CONTENT)
      .json({ status: 'success', code: httpCodes.NO_CONTENT });
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const userEmail = req.user.email;

    const user = await authServices.current(userEmail);

    return res
      .status(httpCodes.OK)
      .json({ status: 'success', code: httpCodes.OK, data: user });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedUser = await usersServices.updateSubscriptionById(
      userId,
      req.body,
    );

    return res
      .status(httpCodes.OK)
      .json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
};