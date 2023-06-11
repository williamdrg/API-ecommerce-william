const { 
  registerUser, 
  loginUser, 
  fetchAllUsers, 
  uploadUserAvatar, 
  updateUserServices,
  resetPassword
} = require('../services/user.service')
const uploadToCloudinary = require('../utils/uploadFieldCloudinary')
const { sendWelcomeMail } = require('../utils/sendMails');
const { createPasswordResetToken } = require('../services/user.service');

const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    sendWelcomeMail(email, {username})
    res.status(201).send();
  } catch (error) {
    next(error);
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await loginUser(email, password);
    res.json(userData);
  } catch (error) {
    next(error);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { username } = req.body 
    
    if (!username) {
      throw { status: 400, message: 'The username cannot be empty.'}
    }

    if (req.file) {
      const file = req.file;
      const uploadResult = await uploadToCloudinary(file.buffer);
      await uploadUserAvatar(userId, uploadResult.url);
    }

    await updateUserServices(userId, username);

    res.json({ message: 'User updated successfully.' })
  } catch (error) {
    next(error)
  }
};

const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await createPasswordResetToken(email);
    res.status(200).json({ message: "Password reset token generated successfully.", token });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    await resetPassword(token, newPassword);
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers, 
  updateUser,
  requestPasswordReset,
  updatePassword
}