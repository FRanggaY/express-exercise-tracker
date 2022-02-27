const User = require('../models/user');
const asyncWrapper = require('../middleware/async');
require('dotenv').config()

const getUsers = asyncWrapper( async (req, res) => {
    User.find({},{log:0},(err, data)=>{
        if(err){
            return console.error(err);
        }else{
            res.status(201).json(data);
        }
    });
})

const createUser = asyncWrapper( async (req, res) => {
    const newUsername = req.body.username;
    const users = new User({
      username: newUsername
    })
    users.save((err,data)=>{
      if(err) return console.error(err);
      const newData = {
        'username': data.username,
        '_id':data._id
      }
      res.status(201).json(newData);
    })
})

const createExercise = asyncWrapper( async (req, res) => {
    const id_ = req.params._id || req.body._id;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;
    const defaultDate= ()=>{
        return new Date().toDateString()
    };
    const dateString = ()=>{
        return new Date(date).toDateString();
    };
    const date_ = (date == undefined) ? defaultDate(): dateString(); 
    const updateData = {
        "description": description,
        "duration": Number(duration),
        "date": date_
    };

    User.findByIdAndUpdate(
        {"_id": id_},
        {$push: {log: updateData}},
        {new: true},
        (error, updatedUsers) => {
            if(error){
                return console.error(error)
            }else{
                const returnObj= {
                    "username": updatedUsers.username,
                    "description": updateData.description,
                    "duration": updateData.duration,
                    "date":updateData.date,
                    "_id": updatedUsers._id
                };
                res.status(201).json(returnObj);
            }
    });
})

const getLogs = asyncWrapper( async (req, res) => {
    const id = req.params._id;
    const fromDate = req.query.from;
    const toDate = req.query.to;
    const limit= req.query.limit;

    User.findById(
        {'_id':id},(err, userLog)=>{
        if(err) return console.error(err);
        let logData = userLog.log;
        
        if(fromDate){
            const fromDate_ = new Date(fromDate)
            logData = logData.filter(log => new Date(log.date) > fromDate_);
        }
        if(toDate){
            const toDate_ = new Date(toDate)
            logData= logData.filter(log => new Date(log.date)< toDate_);

        }
        if(limit){
            logData = logData.slice(0,limit);
        }

        let returnObj = {
            "username": userLog.username,
            "count": userLog.log.length,
            "_id":userLog._id,
            'log':logData
        };
        res.json(returnObj);
        }
    )
})


module.exports = {
    getUsers,
    createUser,
    createExercise,
    getLogs
}