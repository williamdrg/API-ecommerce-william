const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { 
  createUser, 
  findUserByEmail, 
  findUserByUsername, 
  getAllUsers, 
  findUserById, 
  updateUserAvatar,
  updateUser,
  createPasswordReset, 
  updateUserPassword
} = require('../repositories/user.repositories');
const { sendPasswordResetMail } = require("../utils/sendMails");

const registerUser = async (username, email, password) => {
  const exitingEmail = await findUserByEmail(email)
  const existingUsername = await findUserByUsername(username)
  if (exitingEmail || existingUsername) {
    throw {
      status: 400,
      message: "Email or username already in use"  
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser(username, email, hashedPassword);
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw { status: 400, message: "Invalid email or password" };
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw { status: 400, message: "Invalid email or password" };
  }
  const { id, username, firstname, lastname } = user;
  const userData = { id, username, firstname, lastname, email };
  const token = jwt.sign(userData, process.env.JWT_LOGIN, { algorithm: 'HS512', expiresIn: "1h" });
  return { ...userData, token };
};

const fetchAllUsers = async () => {
  return await getAllUsers();
};

const uploadUserAvatar = async (userId, avatarUrl) => {
  const user = await findUserById(userId);
  
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  return await updateUserAvatar(user, avatarUrl);
};

const updateUserServices = async (userId, username) => {
  const user = await findUserById(userId);

  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  user.username = username;
  await updateUser(user)
};

const createPasswordResetToken = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw { status: 404, message: "User not found" };
  }
  
  const resetToken = jwt.sign({ id: user.id }, process.env.JWT_RESET_PASSWORD, 
    {  algorithm: 'HS512', expiresIn: '1h' });
  
  const passwordReset = {
    userId: user.id,
    resetToken
  };

  const resetPasswordToken = await createPasswordReset(passwordReset);

  // no se envía el resertToken por el email aun ya que no esta configurada un forumario de reestablecimiento de contrseña 
  // usar postman XD
  if (resetPasswordToken) {
    await sendPasswordResetMail(email, {username: user.username});
  }

  return resetToken;
};

const resetPassword = async (token, newPassword) => {
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD);
  } catch (err) {
    throw { status: 400, message: "Invalid or expired password reset token." };
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(decoded.id, hashedPassword);
};

module.exports = {
  registerUser,
  loginUser,
  fetchAllUsers,
  uploadUserAvatar,
  updateUserServices,
  createPasswordResetToken,
  resetPassword
};