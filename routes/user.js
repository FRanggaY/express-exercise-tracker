const express = require('express')
const router = express.Router();

const {
    getUsers,
    createUser, 
    createExercise,
    getLogs
} = require('../controllers/user')

router.route('/users').get(getUsers).post(createUser)
router.route('/users/:_id/exercises').post(createExercise)
router.route('/users/:_id/logs').get(getLogs)

module.exports = router