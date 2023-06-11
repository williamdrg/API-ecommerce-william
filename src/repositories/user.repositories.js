const { User, PasswordReset } = require('../models')

const createUser = async (username, email, hashedPassword) => {
  return await User.create({ username, email, password: hashedPassword })
}

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } })
}

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } })
}

const getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: 'password' } })
}

const findUserById = async (id) => {
  return await User.findByPk(id)
}

const findAllUsers = async (ids) => {
  return await User.findAll({ where: { id: ids } })
}

const updateUserAvatar = async (user, avatarUrl) => {
  user.avatar = avatarUrl
  return await user.save()
}

const updateUser = async (user) => {
  await user.save()
};

const createPasswordReset = async (passwordReset) => {
  const newResetToken = await PasswordReset.create(passwordReset);
  return newResetToken;
};

const updateUserPassword = async (id, password) => {
  return await User.update({ password }, { where: { id } });
};


module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  getAllUsers,
  findUserById,
  updateUserAvatar,
  findAllUsers,
  updateUser,
  createPasswordReset,
  updateUserPassword
}