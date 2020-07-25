
const todo = require('./dto');


/*
 * Add Task
 */
let addTask = async function(queryparam){
    return new Promise(async function(resolve,reject){
        try {
            var result = await todo.find({});
            if(result.length>0){
               var currentId =  result[result.length-1].id+ 1;
            }
            else{
                var currentId= 1;
            }
            var query = {
                id: currentId,
                task: queryparam.task,
                completed: false
            };
            resolve(await todo.findOneAndUpdate({
                id: query.id
            }, query, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }));
         } catch (err) {
             console.log(err);
            reject(err);
        }
   });
}


/*
 *  get Task
 */
let getTasks = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            resolve(await todo.find({}))
        } catch (err) {
            reject(err)
        }
    })
}


/**
 *  Update Task
 */
let updateTask = async function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            resolve(await todo.findOneAndUpdate({
                id: data.query.id
            }, data.update, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }))
        } catch (err) {
            reject(err);
        }

    });
};


/*
 *  delete Task
 */
let deleteTask = async function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            resolve(await todo.deleteOne(data,function(err, obj) {
            if (err) throw err;
            }));
        } catch (err) {
            reject(err);
        }

    });
};


module.exports = {
    addTask:addTask,
    getTasks: getTasks,
    updateTask: updateTask,
    deleteTask: deleteTask
};