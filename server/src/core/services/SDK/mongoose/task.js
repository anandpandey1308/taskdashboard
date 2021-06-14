const Task = require('./models/Task');

const mongoose = require('mongoose');

const create = async (userId, name)=>{
    return new Promise((resolve, reject)=>{
        
        const newTask = new Task({userId, name});

        newTask
        .save()
        .then(function(task){
            resolve(task);
        }).catch((e)=>{
            reject({status:false, message:"Unable to save new task > creating new task"});
        });
    });
}

const remove = async (id)=>{
    await Task.findByIdAndDelete(mongoose.Types.ObjectId(id));
    return { status:true }
}

const get = async (id)=>{
    return await Task.findOne({_id:mongoose.Types.ObjectId(id)});
}

const list = async (userId)=>{
    return await Task.find({userId: mongoose.Types.ObjectId(userId)});
}

const set = async (taskId, name, isCompleted)=>{

    const toUpdate = {}
    
    if(name) toUpdate.name = name;
    if(isCompleted != null || isCompleted != undefined) toUpdate.completed = isCompleted;

    return await Task.findByIdAndUpdate(mongoose.Types.ObjectId(taskId), toUpdate, {
        new: true
    });
}

module.exports = {
    create,
    remove,
    get,
    set,
    list
}