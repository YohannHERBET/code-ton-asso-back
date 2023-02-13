const express = require('express');
const router = express.Router();

const user_routes = require('../routes/users');
const project_routes = require('../routes/projects');
const developer_routes = require('../routes/developers');
const association_routes = require('../routes/associations');
const type_routes = require('../routes/types');
const skill_routes = require('../routes/skills');
const feature_routes = require('../routes/features');
const category_routes = require('../routes/categories');

router.use('/api/users',user_routes);
router.use('/api/projects',project_routes);
router.use('/api/developers',developer_routes);
router.use('/api/associations',association_routes);
router.use('/api/types',type_routes);
router.use('/api/skills',skill_routes);
router.use('/api/features',feature_routes);
router.use('/api/categories',category_routes);

module.exports = router;