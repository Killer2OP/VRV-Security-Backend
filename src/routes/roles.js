const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const auth = require('../middleware/auth');
const { checkPermission } = require('../middleware/rbac');

router.post('/',
  auth,
  checkPermission({ resource: 'roles', action: 'create' }),
  roleController.createRole
);

router.post('/assign',
  auth,
  checkPermission({ resource: 'roles', action: 'update' }),
  roleController.assignRole
);

module.exports = router;
