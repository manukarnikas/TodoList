const dao = require('./dao');

/*
 *  Add Task
 */
let addTask = async function(req,res){
       try{
        let result = await dao.addTask(req.body);
        res.status(200).json({
            status:'Success',
            result:result
        });
    }
    catch(err){
        res.status(400).json({
            status:'Failure'
        });
    }
}


/*
 *  Get Tasks
 */
let getTasks = async function (req, res) {
    try {
        let result = await dao.getTasks();
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

};


/*
* Update Task
*/
let updateTask = async function (req, res) {
    var QueryAndUpdate = {
        query: {
            id: req.params.id
        },
        update: req.body
    }
    try {
        let result = await dao.updateTask(QueryAndUpdate)
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

};




/*
 *  delete Task
 */
let deleteTask = async function (req, res) {
    var data = {
        id: req.params.id
    }
    try {
        let result = await dao.deleteTask(data)
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }

};


module.exports = {
    addTask : addTask,
    getTasks: getTasks,
    updateTask:updateTask,
    deleteTask: deleteTask
};