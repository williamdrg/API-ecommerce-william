const { Router } = require('express');
const { 
  createUser,
  login, 
  getAllUsers, 
  updateUser, 
  requestPasswordReset,
  updatePassword,
} = require('../controllers/user.controllers');
const { 
  createUserValidator,
  loginValidator,
  emailVerificationValidator,
  resetPasswordValidator
} = require('../validators/user.validator')
const authenticate = require('../middlewares/authenticate.middlewares')

const upload = require('../utils/uploadFiles')

const router = Router();

router.post('/users', createUserValidator, createUser)

router.post('/login', loginValidator, login)

router.get('/users', getAllUsers)

router.put('/update/users', authenticate, upload.single('avatar'), updateUser)

router.post('/request_password', emailVerificationValidator, requestPasswordReset);

router.post('/update_password', resetPasswordValidator, updatePassword);

module.exports = router;